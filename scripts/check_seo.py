import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.canonicals = []
        self.links = []
        self.ids = set()
        self.duplicate_ids = set()
        self.titles = []
        self.headings = []
        self.schemas = []
        self.language = None
        self.capture = None
        self.text = []
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        identifier = attrs.get('id')
        if identifier:
            if identifier in self.ids:
                self.duplicate_ids.add(identifier)
            self.ids.add(identifier)
        if tag == 'html':
            self.language = attrs.get('lang')
        elif tag == 'meta':
            key = attrs.get('name', attrs.get('property', attrs.get('http-equiv')))
            if key:
                self.meta.setdefault(key, []).append(attrs.get('content', ''))
        elif tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        elif tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag in ('title', 'h1') or (
            tag == 'script' and attrs.get('type') == 'application/ld+json'
        ):
            self.capture = tag
            self.text = []

    def handle_data(self, data):
        if self.capture:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag != self.capture:
            return
        text = ''.join(self.text).strip()
        if tag == 'title':
            self.titles.append(text)
        elif tag == 'h1':
            self.headings.append(text)
        elif tag == 'script':
            self.schemas.append(json.loads(text))
        self.capture = None


def check_site(output):
    origin = 'https://ecnivs.com/'
    errors = []

    def check(condition, message):
        if not condition:
            errors.append(message)

    sitemap = ElementTree.parse(output / 'sitemap.xml')
    urls = [node.text for node in sitemap.findall('.//{*}loc')]
    check(len(urls) == len(set(urls)), 'Sitemap contains duplicate URLs')
    check(origin in urls, 'Sitemap must include the homepage')
    check(f'{origin}sites/' in urls, 'Sitemap must include website services at /sites/')
    redirects = {'/websites/': '/sites/', '/website/': '/sites/'}
    for route, target in redirects.items():
        url = urljoin(origin, route)
        check(url not in urls, f'Redirect must not appear in sitemap: {url}')
        path = output / route.lstrip('/') / 'index.html'
        check(path.is_file(), f'Missing redirect page: {route}')
        if not path.is_file():
            continue
        page = Page(path.read_text())
        check(page.canonicals == [urljoin(origin, target)],
              f'{route}: redirect needs the destination canonical')
        check(page.meta.get('robots') == ['noindex'], f'{route}: redirect must be noindex')
        check(page.meta.get('refresh') == [f'0; url={target}'],
              f'{route}: missing immediate redirect without JavaScript')
        check(target in page.links, f'{route}: missing visible destination link')
    pages = {}
    for url in urls:
        check(url.startswith(origin), f'Unexpected sitemap origin: {url}')
        route = urlsplit(url).path
        check(route.endswith('/'), f'Canonical route needs a trailing slash: {url}')
        path = output / route.lstrip('/') / 'index.html'
        check(path.is_file(), f'Missing built page: {url}')
        if not path.is_file():
            continue
        pages[url] = Page(path.read_text())

    titles = set()
    descriptions = set()
    for url, page in pages.items():
        check(page.language == 'en', f'{url}: missing English document language')
        check(len(page.titles) == 1 and bool(page.titles[0]), f'{url}: needs one title')
        check(len(page.headings) == 1 and bool(page.headings[0]), f'{url}: needs one rendered h1')
        check(not page.duplicate_ids, f'{url}: duplicate IDs {page.duplicate_ids}')
        check(page.canonicals == [url], f'{url}: canonical differs from sitemap')
        for key in ('description', 'og:title', 'og:description', 'og:url', 'og:image',
                    'og:image:alt', 'twitter:title', 'twitter:description',
                    'twitter:card', 'twitter:image', 'twitter:image:alt', 'viewport'):
            values = page.meta.get(key, [])
            check(len(values) == 1 and bool(values[0]), f'{url}: needs one {key}')
        check(page.meta.get('og:url') == [url], f'{url}: social URL differs from canonical')
        check('noindex' not in ','.join(page.meta.get('robots', [])), f'{url}: page is noindex')
        if page.titles:
            title = page.titles[0]
            check(title not in titles, f'{url}: duplicate title')
            titles.add(title)
            check(page.meta.get('og:title') == [title], f'{url}: social title differs')
            check(page.meta.get('twitter:title') == [title], f'{url}: Twitter title differs')
        description = page.meta.get('description', [''])[0]
        check(description not in descriptions, f'{url}: duplicate description')
        descriptions.add(description)
        check(bool(page.schemas), f'{url}: missing structured data')
        graph = [node for schema in page.schemas for node in schema.get('@graph', [])]
        check(any(node.get('url') == url and node.get('@type') in ('WebPage', 'AboutPage')
                  for node in graph), f'{url}: missing page structured data')
        if url == origin:
            check(any(node.get('@type') == 'WebSite' and node.get('name') == 'ecnivs'
                      for node in graph), 'Homepage needs WebSite structured data')
        for href in page.links:
            target = urlsplit(urljoin(url, href))
            if target.scheme not in ('http', 'https') or target.netloc != 'ecnivs.com':
                continue
            check(target.path.rstrip('/') + '/' not in redirects,
                  f'{url}: internal link uses a legacy route {href}')
            target_url = origin.rstrip('/') + target.path
            if target_url in pages:
                check(not target.fragment or unquote(target.fragment) in pages[target_url].ids,
                      f'{url}: broken anchor {href}')
            else:
                path = output / unquote(target.path).lstrip('/')
                check(path.is_file() or (path / 'index.html').is_file(),
                      f'{url}: broken internal link {href}')
    check(f'Sitemap: {origin}sitemap.xml' in (output / 'robots.txt').read_text(),
          'robots.txt must reference the canonical sitemap')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'SEO checks passed for {len(pages)} prerendered pages: metadata, structured data, sitemap and internal links.')


if __name__ == '__main__':
    check_site(Path(sys.argv[1] if len(sys.argv) > 1 else 'dist'))

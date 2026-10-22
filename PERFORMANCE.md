# Static hosting efficiency

Research and baseline inspected on 22 October 2026.

## Constraints and evidence

The company site is a Vite static build published by GitHub Pages, not a Node application running on the shared VPS. The VPS currently serves Pixie's public files through Caddy alongside bounded API, worker and database containers. A single idle resource sample showed 6,277 MiB available from 7,935 MiB RAM; this is an observation, not a capacity guarantee or a benchmark. No unrelated service limits or shared Caddy configuration are changed.

The working tree already contains a website-services draft, including new pages, navigation and policy text. Those changes are preserved. Performance changes apply to the complete draft, not only the previous production commit.

## Primary sources and decisions

- [web.dev rendering guidance](https://web.dev/articles/rendering-on-the-web) favors evaluating static rendering against full client rendering. Build all public page content into HTML, then hydrate actual controls. Production hosting needs no per-site application process or request-time React rendering.
- [web.dev image lazy loading](https://web.dev/articles/browser-level-image-lazy-loading) explains native deferral of offscreen images and warns against delaying critical content. Existing below-fold thumbnails, screenshots and iframe previews retain native lazy loading and dimensions. The hero is visible in static HTML, including when JavaScript fails.
- [MDN Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) provides native motion without a general-purpose animation bundle. Only Hero and Reveal used the motion package. Replace those simple transforms with CSS and a shared IntersectionObserver plus Element.animate. Respect reduced motion and keep text visible throughout. Preserve the existing timing and easing.
- [Caddy precompressed static files](https://caddyserver.com/docs/caddyfile/directives/file_server#precompressed) supports serving build-time gzip and Brotli files instead of compressing each response. Prepare compressed text assets at build time, verify round-trip integrity and retain original files for clients without support.
- [Caddy header handling](https://caddyserver.com/docs/caddyfile/directives/header) and [MDN Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control) distinguish immutable fingerprinted assets from HTML. Provide an opt-in static hosting template with long-lived hashed assets and revalidated HTML. Never cache authentication responses with public assets.
- [Docker resource constraints](https://docs.docker.com/engine/containers/resource_constraints/) describes bounded service memory and CPU. Existing server workloads already have limits. Static client sites can share the existing file server, with separate roots and hostnames, rather than one JavaScript server per site. Dynamic stores still need their own workload and data-isolation review; this document does not promise arbitrary site capacity.

## Verification

Record baseline and final raw/gzip/Brotli build sizes, no-JavaScript content, hydrated interactions, reduced motion, console errors and four viewport widths. Compare repeated equivalent browser runs. Report laboratory measurements with their conditions. Field Core Web Vitals and concurrent production capacity remain unmeasured.

## Measured result

The complete initial homepage JavaScript graph changed from 397,252 to 277,004 bytes raw and 125,910 to 87,439 bytes gzip (30.6% less gzip). At measurement time, the five content-only pages required zero JavaScript. The website service page now hydrates the shared homepage contact form; the other four content pages still ship without JavaScript. Font build artifacts changed from 336,900 to 93,672 bytes. This font figure describes build storage, not an equal reduction in transferred fonts: the former Unicode ranges already deferred unused subsets.

Six alternating runs per version used fresh Chromium contexts, a 1440 by 900 viewport, 4x CPU slowdown, 40ms emulated latency and 187,500 bytes/second download throughput. Both versions used the same in-memory gzip server and blocked third-party requests. Median first contentful paint changed from 1124ms to 428ms; median largest contentful paint from 1652ms to 428ms. Layout shift was about 0.0112 for both. These are local laboratory results, not field Core Web Vitals or a production speed guarantee. The browser's entry-script transfer statistic excludes imported modules; the complete JavaScript sizes above come from the independently traversed build graph.

Browser checks passed for all six pages at 1440, 768, 390 and 320 pixels, visible content with JavaScript disabled, native website FAQ expansion, hydrated contact-form validation, reduced motion on the replaced effects and no JavaScript errors. The form is hidden without JavaScript; direct contact links remain available. No test submitted a real message.

The prepared hosting template was validated and served with Caddy 2.11.7 on a separate loopback listener. Fifteen response checks verified original, gzip and Brotli bytes and cache policies for five paths, plus a genuine 404 for an unknown path. The test listener was stopped and removed. Shared production Caddy configuration and DNS were not changed. The company's existing GitHub Pages workflow remains its deployment target.

Reproduce build and compression measurements from the project directory:

```sh
npm run build
node scripts/measure-build.mjs dist
npm run lint
npm run test:videos
```

For future static VPS sites, set `ECNIVS_SITE_HOST` and `ECNIVS_SITE_ROOT` for the reviewed `deploy/static-site.caddy` configuration. Each site uses its own immutable release directory and hostname. Validate the combined Caddy configuration before any reload, preserve the previous release, and keep HTML revalidated while fingerprinted assets receive immutable caching. This template does not provide a backend for private accounts, payments or stores.

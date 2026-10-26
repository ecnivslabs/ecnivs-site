import {
  ArrowUp,
  ArrowUpRight,
  GithubLogo,
  WhatsappLogo,
  YoutubeLogo,
  InstagramLogo,
} from '@phosphor-icons/react'
import { PRODUCTS } from '@/data/products'
import { SOCIAL } from '@/data/social'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const BRAND_LINKS: FooterLink[] = [
  { label: 'About ecnivs', href: '/about/' },
  { label: 'Videos', href: '/#videos' },
  { label: 'Sites', href: '/sites/' },
  { label: 'Support', href: '/support/' },
]

const PRODUCT_LINKS: FooterLink[] = PRODUCTS.map((product) => ({
  label: product.name,
  href: product.url,
  external: true,
}))

const RESOURCE_LINKS: FooterLink[] = PRODUCTS.flatMap((product) =>
  (product.resources ?? []).map((resource) => ({
    ...resource,
    external: true,
  })),
)

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Terms of service', href: '/terms/' },
  { label: 'Cancellation and refunds', href: '/cancellation-refund/' },
]

function FooterLinkItem({ label, href, external }: FooterLink) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="footer-link"
    >
      {label}
      {external && <ArrowUpRight size={13} aria-hidden="true" />}
    </a>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: FooterLink[]
}) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      <div>
        {links.map((link) => (
          <FooterLinkItem key={link.label} {...link} />
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content mx-auto max-w-7xl px-6">
        <a className="footer-name" href="/" aria-label="ecnivs home">
          ecnivs
        </a>
        <div className="footer-links">
          <div className="footer-contact">
            <p>For the terminally curious.</p>
            <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>
          </div>
          <FooterColumn title="Explore" links={BRAND_LINKS} />
          <FooterColumn title="Labs" links={PRODUCT_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ecnivs</p>
          <nav className="footer-socials" aria-label="Follow ecnivs">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              aria-label="ecnivs on GitHub"
            >
              <GithubLogo size={20} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="ecnivs on YouTube"
            >
              <YoutubeLogo size={20} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="ecnivs on Instagram"
            >
              <InstagramLogo size={20} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/919233429872"
              target="_blank"
              rel="noreferrer"
              aria-label="Contact ecnivs on WhatsApp"
            >
              <WhatsappLogo size={20} aria-hidden="true" />
            </a>
          </nav>
          <a href="/#top" className="footer-top-link">
            Back to top <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

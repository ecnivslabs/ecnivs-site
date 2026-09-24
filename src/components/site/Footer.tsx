import { ArrowUp, ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { Wordmark } from './Wordmark'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Company', href: '/company/' },
  { label: 'Products', href: '/#releases' },
  { label: 'Contact', href: '/#contact' },
]

const PRODUCT_LINKS: FooterLink[] = [
  { label: 'Olive', href: 'https://olive.ecnivs.com', external: true },
  { label: 'Pixie', href: 'https://pixie.ecnivs.com', external: true },
]

const RESOURCE_LINKS: FooterLink[] = [
  {
    label: 'Olive docs',
    href: 'https://olive.ecnivs.com/docs/',
    external: true,
  },
  {
    label: 'Olive download',
    href: 'https://olive.ecnivs.com/download/',
    external: true,
  },
  { label: 'GitHub', href: 'https://github.com/ecnivslabs', external: true },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Terms of service', href: '/terms/' },
]

function FooterLinkItem({ label, href, external }: FooterLink) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group/link inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {label}
      {external && (
        <ArrowUpRight
          size={13}
          className="shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        />
      )}
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
    <div>
      <p className="font-mono-brand text-xs tracking-[0.2em] text-subtle-foreground/70 uppercase">
        {title}
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <FooterLinkItem key={link.label} {...link} />
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 pt-20">
      <div className="grain-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-8 sm:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-1">
            <a href="/" aria-label="ecnivs home">
              <Wordmark />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A software company. We build what we use.
            </p>
            <a
              href="mailto:hello@ecnivs.com"
              className="mt-4 block w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              hello@ecnivs.com
            </a>
          </div>

          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Products" links={PRODUCT_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none h-[clamp(64.8px,17.67vw,162px)] overflow-hidden leading-[0.8] select-none"
        >
          <span
            className="block translate-y-[22%] font-semibold whitespace-nowrap text-[clamp(88px,24vw,220px)] tracking-[-0.04em]"
            style={{
              color: 'hsl(var(--surface))',
              textShadow:
                '0 1.5px 0 rgba(255,255,255,0.7), 0 -1px 1px rgba(30,25,18,0.12)',
            }}
          >
            ecnivs
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/50 pt-7 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <p className="font-mono-brand text-xs text-subtle-foreground">
              &copy; {new Date().getFullYear()} ecnivs.
            </p>
            <a
              href="https://github.com/ecnivslabs"
              target="_blank"
              rel="noreferrer"
              aria-label="ecnivs on GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubLogo size={16} weight="fill" />
            </a>
          </div>
          <a
            href="/#top"
            aria-label="Back to top"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}

import type { ReactNode } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Wordmark } from '@/components/site/Wordmark'
import { Footer } from '@/components/site/Footer'

export function PageLayout({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-background">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="border-b border-border/60 py-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <a href="/" aria-label="ecnivs home">
            <Wordmark />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to home
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm text-subtle-foreground">{subtitle}</p>
        )}

        <div className="mt-12 space-y-10">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

export function PageSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export function PageList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

import { Children, isValidElement, type ReactNode } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Wordmark } from '@/components/site/Wordmark'
import { Footer } from '@/components/site/Footer'

export function PageLayout({
  title,
  subtitle,
  intro,
  media,
  variant = 'document',
  children,
}: {
  title: string
  subtitle?: string
  intro?: ReactNode
  media?: ReactNode
  variant?: 'document' | 'about' | 'support'
  children: ReactNode
}) {
  const sections = Children.toArray(children).flatMap((child) =>
    isValidElement<{ title: string }>(child) && child.type === PageSection
      ? [{ title: child.props.title, id: sectionId(child.props.title) }]
      : [],
  )
  return (
    <div className={`subpage page-${variant}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="subpage-header">
        <div className="page-container flex items-center justify-between">
          <a href="/" aria-label="ecnivs home">
            <Wordmark />
          </a>
          <a href="/" className="page-home-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Home
          </a>
        </div>
      </header>

      <main id="main" className="page-container">
        <div className="page-heading">
          <div className="page-heading-copy">
            <h1>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
            {intro && <div className="page-intro">{intro}</div>}
          </div>
          {media}
        </div>
        <div className="page-content">
          {variant === 'document' && sections.length > 0 && (
            <nav className="page-outline" aria-label="On this page">
              <p>On this page</p>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="page-sections">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function PageSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section
      className="page-section"
      id={sectionId(title)}
      aria-labelledby={`${sectionId(title)}-title`}
    >
      <h2 id={`${sectionId(title)}-title`}>{title}</h2>
      <div className="page-section-body">{children}</div>
    </section>
  )
}

export function PageList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="page-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

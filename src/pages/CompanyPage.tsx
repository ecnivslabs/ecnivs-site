import { PageLayout, PageSection } from './PageLayout'

export function CompanyPage() {
  return (
    <PageLayout
      title="About ecnivs"
      subtitle="An independent software company."
    >
      <PageSection title="What we do">
        <p>
          We’re an independent software company. Our products start with
          problems we run into ourselves and ideas we want to see through. We
          design, build, and maintain them as a small team.
        </p>
        <p>
          Take a look at our{' '}
          <a href="/#releases" className="text-accent hover:underline">
            products
          </a>
          .
        </p>
      </PageSection>

      <PageSection title="How we work">
        <p>
          We're a small team. We design, build, and use our products ourselves.
          Using them in real projects helps us decide what to fix and what to
          build next.
        </p>
      </PageSection>

      <PageSection title="Where to find us">
        <p>
          Code lives on{' '}
          <a
            href="https://github.com/ecnivslabs"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          . Everything else goes to{' '}
          <a
            href="mailto:hello@ecnivs.com"
            className="text-accent hover:underline"
          >
            hello@ecnivs.com
          </a>
          .
        </p>
      </PageSection>
    </PageLayout>
  )
}

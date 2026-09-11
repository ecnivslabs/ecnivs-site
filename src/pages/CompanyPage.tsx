import { PageLayout, PageSection } from './PageLayout'

export function CompanyPage() {
  return (
    <PageLayout
      eyebrow="Company"
      title="About ecnivs"
      subtitle="An independent software company."
    >
      <PageSection title="What we do">
        <p>
          ecnivs designs and builds software, then runs it ourselves before
          anyone else does. If it holds up in our own use, it ships. If it
          doesn't, it never leaves the building. Right now that's a systems
          language and a coding agent, both running in our own stack every day.
        </p>
        <p>
          See what's live right now on the{' '}
          <a href="/#releases" className="text-accent hover:underline">
            releases page
          </a>
          .
        </p>
      </PageSection>

      <PageSection title="How we work">
        <p>
          We're a small team. There's no separation between the people who
          design a system and the people who run it, which means nobody hands
          off a hard problem and walks away from it. We don't ship anything we
          wouldn't depend on ourselves.
        </p>
      </PageSection>

      <PageSection title="Vision">
        <p>
          We don't think good software comes from more people deciding what it
          should be. It comes from someone who needs it, building it, and living
          with the result. That's the model we want to keep, even as we grow:
          fewer decisions made by committee, more things built by the people
          who'll actually run them.
        </p>
        <p>
          We'd rather ship products we trust completely than ones we don't.
          That's where it's led us so far, and it won't be where it ends.
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

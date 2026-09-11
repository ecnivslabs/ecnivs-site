import { PageLayout, PageList, PageSection } from './PageLayout'

export function PrivacyPolicy() {
  return (
    <PageLayout
      eyebrow="Legal"
      title="Privacy policy"
      subtitle="Last updated September 2026"
    >
      <PageSection title="Who we are">
        <p>
          ecnivs (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates ecnivs.com and
          any other site or subdomain we run. ecnivs is currently run by an
          individual developer based in India and is not yet a registered
          company. This policy explains what we collect on these sites and what
          we do with it.
        </p>
      </PageSection>

      <PageSection title="What we collect">
        <p>
          The only personal information we collect directly is what you give us:
        </p>
        <PageList
          items={[
            'Your name, email address, and message, if you use a contact form on one of our sites.',
            'Your name and email address, if you join a waitlist for one of our unreleased products.',
          ]}
        />
        <p>
          If analytics are enabled on a given page, we may also see aggregate,
          non-identifying usage data such as page views and referring pages. We
          use a privacy-respecting analytics tool that does not use cookies and
          does not track you across sites.
        </p>
      </PageSection>

      <PageSection title="How we use it">
        <PageList
          items={[
            'To reply to a message you send us.',
            'To notify you when a product you joined the waitlist for is ready.',
            'To understand, in aggregate, which pages people visit, so we know what is worth improving.',
          ]}
        />
        <p>
          We read every message ourselves. We do not use your information for
          advertising, and we do not build profiles from it.
        </p>
      </PageSection>

      <PageSection title="What we don't do">
        <PageList
          items={[
            'We do not sell your information.',
            'We do not share it with third parties for marketing.',
            'We do not run ad trackers or cross-site tracking pixels on these sites.',
          ]}
        />
      </PageSection>

      <PageSection title="Third-party services">
        <p>
          Our contact forms submit to a third-party form service that delivers
          messages to our inbox. Where analytics are enabled, we use a
          self-hosted or privacy-focused analytics provider rather than a tool
          that tracks individual users across the web. We don't control those
          services' own policies, but we choose ones that don't sell data or
          track people across sites.
        </p>
      </PageSection>

      <PageSection title="Cookies">
        <p>
          These sites don't set tracking or advertising cookies. Any cookies
          that do appear are functional, such as keeping a form submission from
          double-sending.
        </p>
      </PageSection>

      <PageSection title="Data retention">
        <p>
          We keep messages and waitlist entries for as long as they're useful,
          generally until we've replied or the related product has shipped. You
          can ask us to delete your information at any time.
        </p>
      </PageSection>

      <PageSection title="Your rights">
        <p>
          You can ask us what information we hold about you, ask us to correct
          it, or ask us to delete it. Email{' '}
          <a
            href="mailto:hello@ecnivs.com"
            className="text-accent hover:underline"
          >
            hello@ecnivs.com
          </a>{' '}
          and we'll handle it directly.
        </p>
      </PageSection>

      <PageSection title="Children">
        <p>
          These sites aren't directed at children, and we don't knowingly
          collect information from anyone under 13.
        </p>
      </PageSection>

      <PageSection title="Changes to this policy">
        <p>
          If this policy changes in a meaningful way, we'll update the date at
          the top of this page.
        </p>
      </PageSection>

      <PageSection title="Contact">
        <p>
          Questions about this policy go to{' '}
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

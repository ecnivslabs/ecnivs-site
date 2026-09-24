import { PageLayout, PageSection } from './PageLayout'

export function TermsOfService() {
  return (
    <PageLayout title="Terms of service" subtitle="Last updated September 2026">
      <PageSection title="Agreement">
        <p>
          These terms cover your use of ecnivs.com and any other site or
          subdomain we operate. By using these sites, you agree to them. ecnivs
          is currently run by an individual developer based in India and is not
          yet a registered company, so these terms are between you and that
          individual, trading as ecnivs.
        </p>
      </PageSection>

      <PageSection title="Using the site">
        <p>
          These sites are informational. There's no account system and nothing
          to purchase here. Where a product has a waitlist or a contact form,
          using it is voluntary. Don't use these sites to send spam, attempt to
          break them, or misrepresent who you are.
        </p>
      </PageSection>

      <PageSection title="Open-source software">
        <p>
          Anything we release as open source is governed by the license stated
          in its own repository, not by these terms. That license takes
          precedence over these terms for anything it covers, and nothing here
          restricts rights it already grants you.
        </p>
      </PageSection>

      <PageSection title="Waitlist products">
        <p>
          Some of what we build isn't released yet and only has a waitlist or
          signup. Joining one means giving us a name and email address so we can
          notify you when it's available. It isn't a purchase, a contract for
          future delivery, or a commitment on our part to ship by any particular
          date. Once released, that product's own terms will apply and may
          differ from these.
        </p>
      </PageSection>

      <PageSection title="Intellectual property">
        <p>
          The ecnivs name, logo, and the content of these sites belong to us,
          aside from anything we've explicitly open sourced. Open-source
          projects we publish are licensed under the terms stated in each
          project's own repository, not under these terms.
        </p>
      </PageSection>

      <PageSection title="No warranty">
        <p>
          These sites, and the open-source software we publish, are provided as
          is, without warranty of any kind, express or implied. We don't
          guarantee that any of it will be uninterrupted, error-free, or fit for
          a particular purpose.
        </p>
      </PageSection>

      <PageSection title="Limitation of liability">
        <p>
          To the extent the law allows, we aren't liable for any indirect,
          incidental, or consequential damages arising from your use of these
          sites or our software. If you're relying on our software for something
          critical, that's a decision you're making with open eyes: read the
          license, and test accordingly.
        </p>
      </PageSection>

      <PageSection title="Third-party links">
        <p>
          These sites link out to places like GitHub and our contact form
          provider. We aren't responsible for the content or practices of sites
          we don't control.
        </p>
      </PageSection>

      <PageSection title="Changes to these terms">
        <p>
          If we change these terms in a way that matters, we'll update the date
          at the top of this page.
        </p>
      </PageSection>

      <PageSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Since ecnivs isn't a
          registered entity yet, disputes would be handled with the individual
          operating it, under Indian law.
        </p>
      </PageSection>

      <PageSection title="Contact">
        <p>
          Questions about these terms go to{' '}
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

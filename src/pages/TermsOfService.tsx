import { PageLayout, PageList, PageSection } from './PageLayout'

export function TermsOfService() {
  return (
    <PageLayout
      title="Terms of service"
      subtitle="Updated 21 October 2026"
      intro={
        <p>
          Terms for ecnivs websites, Pixie accounts and the services we make
          available.
        </p>
      }
    >
      <PageSection title="About these terms">
        <p>
          These terms are between you and Vince Hika Swu, an individual
          developer based in India trading as ecnivs. ecnivs is not a registered
          company. They cover ecnivs.com, the product sites we operate, and the
          Pixie account and feedback services at pixie.ecnivs.com.
        </p>
        <p>
          Using a website does not give you ownership of its content. Creating
          an account means agreeing to the terms presented with that account.
          You must be able to enter into this agreement, or have the permission
          and supervision required by applicable law.
        </p>
        <p>
          A product’s accompanying software license governs that software. If
          feature-specific terms apply, we will identify them before you use
          that feature. These terms do not remove rights granted by an
          open-source license or mandatory consumer law.
        </p>
      </PageSection>
      <PageSection title="Using our services">
        <PageList
          items={[
            'Provide accurate information where needed to operate your account and use an email address you control.',
            'Keep passwords, session credentials and sign-in links private. Tell support if you believe your account has been compromised.',
            'Do not send spam, impersonate others, interfere with service operation, attempt unauthorized access or use the services unlawfully.',
            'Only submit material you are entitled to share. Do not include other people’s private information or credentials in support messages or feedback.',
          ]}
        />
      </PageSection>
      <PageSection title="Pixie accounts and beta access">
        <p>
          Account registration is open. Verify your email before using your
          account. Browser sign-in and explicit device approval connect a Pixie
          terminal; approve only a code displayed on a device you control.
          Provider credentials remain separate.
        </p>
        <p>
          Pixie is free for the time being while we improve it with feedback.
          Public downloads and billing are coming soon. Creating an account is
          not a purchase, a paid subscription or a promise of software delivery
          by a particular date. There are no automatic charges or payment card
          collection on the account site at present.
        </p>
        <p>
          If a paid offer is introduced, its price, billing terms and any
          cancellation or refund conditions will be presented before you choose
          to purchase. We will not charge you merely because you created a free
          account.
        </p>
        <p>
          Model providers and connected services may charge under their own
          terms. Free Pixie access does not include paid model credits. You are
          responsible for reviewing the services, models, tools and extensions
          you choose to connect.
        </p>
      </PageSection>
      <PageSection title="Software and generated work">
        <p>
          Software we release is governed by its accompanying license, including
          any open-source or source-available license. A website account grants
          no ownership of the ecnivs or Pixie name, logos or artwork.
        </p>
        <p>
          Model output, code and commands can be incorrect. Review proposed
          changes, permissions and results before relying on them. Run relevant
          checks and keep appropriate backups for important work. These terms do
          not promise that every model or extension can complete every task.
        </p>
        <p>
          Your rights in inputs and outputs also depend on the material you use,
          the applicable software licenses and your model provider’s terms.
          These website terms do not transfer ownership of your repository or
          other work to ecnivs.
        </p>
      </PageSection>
      <PageSection title="Feedback and support">
        <p>
          You keep your rights in feedback and support material you submit. You
          permit ecnivs to use that material as needed to answer your request,
          investigate problems and improve the relevant product. This does not
          authorize publishing your private messages, repository contents or
          credentials.
        </p>
        <p>
          <a href="/support/">Support</a> provides contact and recovery
          guidance. Support availability depends on the nature of the request;
          no response-time or uninterrupted-service guarantee is offered unless
          separately agreed.
        </p>
      </PageSection>
      <PageSection title="Accounts and service changes">
        <p>
          You can stop using a service and request deletion of your account
          through{' '}
          <a href="mailto:support@ecnivs.com?subject=Account%20deletion%20request">
            support@ecnivs.com
          </a>
          . We verify ownership before acting. The{' '}
          <a href="/privacy/">privacy policy</a> explains retention and
          protected backup expiry.
        </p>
        <p>
          We may restrict or suspend access when reasonably necessary to address
          abuse, security problems or legal obligations. Where appropriate and
          lawful, we will explain the restriction and provide a way to contact
          support. Unreleased features and free beta services may change, pause
          or end.
        </p>
      </PageSection>
      <PageSection title="Availability and responsibility">
        <p>
          To the extent permitted by law, these services are provided as
          available, without a promise that they will be uninterrupted,
          error-free or suitable for every purpose. Software licenses may
          provide their own warranty and liability terms.
        </p>
        <p>
          To the extent permitted by law, ecnivs is not responsible for indirect
          or consequential losses arising from use of the websites or account
          services. Nothing here excludes liability or limits rights that
          applicable law does not allow us to exclude, including mandatory
          consumer protections.
        </p>
      </PageSection>
      <PageSection title="Third-party services">
        <p>
          External sites, model providers, extensions and services operate under
          their own terms and policies. Links and connections do not make ecnivs
          responsible for services we do not operate. Our own processing is
          described in the <a href="/privacy/">privacy policy</a>.
        </p>
      </PageSection>
      <PageSection title="Changes and governing law">
        <p>
          We update the date when these terms change. Material changes affecting
          an existing account will receive an appropriate notice through the
          service or account email where required. New paid terms will be
          presented before any purchase.
        </p>
        <p>
          These terms are governed by the laws of India, subject to mandatory
          rights and protections that apply where you live. No clause here
          requires you to give up a legal right that cannot be waived.
        </p>
        <p>
          Terms and general enquiries:{' '}
          <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>. Product help:{' '}
          <a href="mailto:support@ecnivs.com">support@ecnivs.com</a>.
        </p>
      </PageSection>
    </PageLayout>
  )
}

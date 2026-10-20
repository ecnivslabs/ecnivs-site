import { PageLayout, PageList, PageSection } from './PageLayout'

export function TermsOfService() {
  return (
    <PageLayout
      title="Terms of service"
      subtitle="Updated 21 October 2026"
      intro={<p>Terms for ecnivs websites, products and services.</p>}
    >
      <PageSection title="About these terms">
        <p>
          These terms are between you and Vince Hika Swu, an individual
          developer based in India trading as ecnivs. ecnivs is not a registered
          company. They cover the websites, products and services we operate,
          including accounts, support and feedback where offered.
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
      <PageSection title="Accounts">
        <p>
          <span id="pixie-accounts-and-beta-access" aria-hidden="true" />
          Where a service offers accounts, follow its registration, verification
          and recovery instructions. Use an email address you control. If a
          service asks you to approve a device, approve only requests you
          initiated on a device you control.
        </p>
        <p>
          Account access and credentials for external services are separate.
          Review the permissions of the tools, extensions and providers you
          connect. You remain responsible for activity you authorize through
          your account.
        </p>
      </PageSection>
      <PageSection title="Free and paid services">
        <p>
          Creating a free account does not authorize a charge or start a paid
          subscription. Where a paid offer is available, its price, billing
          terms and cancellation or refund conditions are presented before you
          choose to purchase.
        </p>
        <p>
          Free access, previews and beta features can change or end.
          Availability and release information belong to the relevant product.
          Announcing a feature does not promise delivery by a particular date.
        </p>
        <p>
          External providers may charge under their own terms. Free access to an
          ecnivs service does not include credits or subscriptions from another
          provider unless the offer explicitly says so.
        </p>
      </PageSection>
      <PageSection title="Software and your work">
        <p>
          Software we release is governed by its accompanying license, including
          any open-source or source-available license. A website account grants
          no ownership of ecnivs names, product branding, logos or artwork.
        </p>
        <p>
          Review software results, proposed changes and requested permissions
          before relying on them. Tools that generate content, code or commands
          can produce incorrect results. Run relevant checks and keep
          appropriate backups for important work. No tool or extension is
          promised to complete every task.
        </p>
        <p>
          Your rights in inputs and outputs also depend on the material you use,
          the applicable software licenses and any connected provider’s terms.
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
          <a href="/support/">Support</a> explains how to contact us and what
          information to include. Support availability depends on the nature of
          the request; no response-time or uninterrupted-service guarantee is
          offered unless separately agreed.
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

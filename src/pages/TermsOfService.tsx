import { PageLayout, PageList, PageSection } from './PageLayout'

export function TermsOfService() {
  return (
    <PageLayout
      title="Terms of service"
      subtitle="Updated 22 October 2026"
      intro={<p>Terms for ecnivs websites, products and services.</p>}
    >
      <PageSection title="About these terms">
        <p>
          These terms are between you and Vince Hika Swu, an individual
          developer based in Nagaland, India, operating as ecnivs. They cover
          the websites, products and services we operate, including accounts,
          support and feedback where offered.
        </p>
        <p>
          Business contact address: Yehovi Complex, Dimapur 797112, Nagaland,
          India.
        </p>
        <p>
          Using a website does not give you ownership of its content. Creating
          an account means agreeing to the terms presented with that account.
          You must have the legal capacity to enter into this agreement. If you
          act for an organisation, you must have authority to bind it. These
          terms do not create a parental-consent process for children.
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
      <PageSection title="Acceptable use and service limits">
        <PageList
          items={[
            'Use services only with lawful authority over the accounts, systems, data and material involved. Obtain any permission needed before accessing or testing someone else’s systems.',
            'Do not use our services to steal credentials or data, distribute malicious software, send spam, harass people or infringe privacy or intellectual property rights. Authorised security testing must stay within its agreed scope.',
            'Do not bypass access controls or service limits, impersonate another person, share accounts to evade restrictions or deliberately disrupt our infrastructure.',
            'Follow the terms and usage restrictions of any external provider you connect. Access to our service does not grant access to another provider’s paid or restricted resources.',
          ]}
        />
        <p>
          Hosted services use request-size and rate limits to protect capacity
          and prevent abuse. An offer is not a promise of unlimited requests,
          storage or provider credits unless it explicitly says so. Any
          plan-specific allowance or paid overage must be disclosed before you
          purchase that plan. These terms do not introduce an undisclosed usage
          charge.
        </p>
        <p>
          We may proportionately limit access to address abuse, security risks
          or legal obligations. You can contact{' '}
          <a href="mailto:support@ecnivs.com">support@ecnivs.com</a> if you
          believe a restriction is mistaken. These service rules do not remove
          rights granted by a separate software license or mandatory law.
        </p>
      </PageSection>
      <PageSection title="Free and paid services">
        <p>
          Creating a free account does not authorize a charge or start a paid
          subscription. A free preview does not automatically become a paid
          subscription. Before any purchase, the offer must identify the price,
          currency, applicable taxes, billing interval, included usage, renewal,
          cancellation and refund conditions. You must explicitly choose the
          paid offer before we charge you.
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
      <PageSection title="Website services">
        <p>
          Full websites and online stores include their backend, admin panel,
          analytics dashboard, hosting and technical maintenance. Choose $20 USD
          billed monthly or $180 USD billed yearly, equivalent to $15 per month.
          Both billing options include the same agreed features, with no setup
          fee and no ecnivs commission on sales. Monthly subscriptions have no
          minimum term; yearly subscriptions are paid for a full year in
          advance. Before subscribing, we agree the project scope, supported
          features, billing start date, renewal date, applicable taxes and
          refund conditions in writing. An enquiry does not start billing.
        </p>
        <p>
          The initial build includes up to five informational pages and two
          design revision rounds, plus the customer, admin and commerce screens
          agreed for the project. Your frontend is designed for your brand.
          Editing controls allow permitted accounts to change supported colours,
          copy, images and content; they are not an unrestricted page builder.
          You supply content and product information you are entitled to use.
          Routine maintenance and help using the site are included. New pages,
          redesigns, ongoing content entry, custom features and extra
          integrations require a separate quote and your approval. These plans
          do not include custom SaaS application development or an unrestricted
          development service.
        </p>
        <p>
          You own or control your domain and connected payment and email
          accounts. We configure the agreed integrations with your permission.
          Domain registration, email delivery, payment processing and other
          external provider charges are separate and payable to those providers.
          We do not operate your email inbox or act as the seller of your
          products. You remain responsible for your catalog, customer service,
          fulfilment, tax obligations and lawful business operations. Carrier
          tracking and other integrations depend on provider support.
        </p>
        <p>
          You retain your rights in your domain, supplied content and business
          data. You permit us to use them to build, host and maintain the agreed
          site. The subscription provides access to a hosted website, not
          delivery or transfer of our proprietary source code, platform or
          reusable components. Separate software licenses and mandatory rights
          remain unaffected.
        </p>
        <p>
          Cancel by emailing{' '}
          <a href="mailto:hello@ecnivs.com?subject=Website%20subscription%20cancellation">
            hello@ecnivs.com
          </a>{' '}
          before the next renewal. Cancellation stops the next renewal; hosting
          continues through the paid month or year and then ends. Cancellation
          does not by itself create a refund for unused time; refund conditions
          are agreed before subscribing, subject to applicable rights. We verify
          the request before changing a subscription. Contact us before hosting
          ends to arrange an export of your supplied content and business
          records, excluding other customers’ information, secrets and our
          proprietary source code. Data return, deletion, backup retention,
          relevant providers and any required data-processing agreement are
          documented for the project before personal information is collected.
        </p>
      </PageSection>
      <PageSection title="Software and your work">
        <p>
          Where we provide an official client application without a separate
          software license, we grant you a limited, non-exclusive right to
          install and use that client on devices you own or are authorised to
          use, for the service’s intended personal or business use. This does
          not grant a right to redistribute or sell our proprietary client,
          publish its source code or use our branding as your own. Rights
          required by law and licenses for third-party components remain
          unaffected. A separately supplied software license takes precedence
          for that software.
        </p>
        <p>
          Software we release is governed by its accompanying license, including
          any open-source or source-available license. A website account grants
          no ownership of ecnivs names, product branding, logos or artwork.
        </p>
        <p>
          Review software results, proposed changes and requested permissions
          before relying on them. Tools may read or change files, run commands
          or contact external services with the access you grant. Generated
          content, code and commands can be incorrect, insecure, non-unique or
          subject to third-party rights. Run relevant checks and keep
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
          consumer protections. We do not exclude liability for fraud, wilful
          misconduct or any other liability that cannot lawfully be excluded.
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
          For privacy complaints, see the named contact in our{' '}
          <a href="/privacy/#privacy-complaints">privacy policy</a>. Terms and
          general enquiries:{' '}
          <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>. Product help:{' '}
          <a href="mailto:support@ecnivs.com">support@ecnivs.com</a>.
        </p>
      </PageSection>
    </PageLayout>
  )
}

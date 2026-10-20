import { PageLayout, PageList, PageSection } from './PageLayout'

export function PrivacyPolicy() {
  return (
    <PageLayout
      title="Privacy policy"
      subtitle="Updated 21 October 2026"
      intro={
        <p>
          How ecnivs handles information across our websites, products and
          services.
        </p>
      }
    >
      <PageSection title="Who is responsible">
        <p>
          Vince Hika Swu, an individual developer based in India trading as
          ecnivs, operates ecnivs.com and the ecnivs product sites. ecnivs is
          not a registered company.
        </p>
        <p>
          This policy covers the websites, products and services we operate,
          including accounts, support and feedback where offered. Only the
          sections relevant to the features you use apply. Information presented
          within a product explains any additional data use for that feature.
          Third-party services you choose have their own policies.
        </p>
        <p>
          For privacy questions, email{' '}
          <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>. For account
          access, correction or deletion, email{' '}
          <a href="mailto:support@ecnivs.com">support@ecnivs.com</a>.
        </p>
      </PageSection>
      <PageSection title="Information you provide">
        <PageList
          items={[
            'Contact and support: your name, email address, message and any details you choose to include, so we can answer and resolve your request.',
            'Product updates or waitlists, where offered: the details requested on the signup form, used for the updates you request. You can ask to stop receiving them.',
            'Technical requests: hosting and security services process IP addresses, browser information and request metadata to serve pages, diagnose failures and prevent abuse.',
          ]}
        />
        <p>
          Do not send passwords, API keys, private device codes or sensitive
          repository content in support requests. We may ask for limited
          information to verify account ownership before disclosing or deleting
          data.
        </p>
      </PageSection>
      <PageSection title="Accounts and product use">
        <p>
          <span id="pixie-accounts" aria-hidden="true" />
          Where a service offers an account, registration collects your name,
          email address and password. Our hosted account service stores a
          password hash rather than a readable password, along with verification
          state, account status and timestamps. These records support account
          creation, sign-in, verification and recovery.
        </p>
        <p>
          Sign-in records include session identifiers, expiry times, IP
          addresses and client information such as browser or app identifiers.
          Services with device sign-in also keep temporary authorization codes
          and approval records. These records and rate limits protect access.
        </p>
        <p>
          Where two-factor authentication is available, we store an encrypted
          authenticator secret and encrypted recovery codes. Session records
          include second-factor verification times. These records protect
          sign-in and privileged access; used recovery codes are removed.
          Administrative records identify who changed account roles, revoked
          sessions or reviewed feedback, along with the target, time and reason.
        </p>
        <p>
          Transactional email uses your account address for verification,
          recovery and service notifications. Resend processes the recipient,
          message content and delivery information. We use delivery and failure
          events to monitor these messages. Account emails are not advertising.
        </p>
        <p>
          Feedback submitted through an app can include the message, category,
          account identifier, app version, platform and submission time. The
          submission interface identifies what is sent. Our current feedback
          service does not automatically attach conversations, repository files,
          provider keys or terminal logs.
        </p>
        <p>
          When you connect an external provider or extension, review the data
          and permissions that connection needs. Requests sent directly from
          your device to another provider follow that provider’s policies.
          Signing in to our account service does not require your model provider
          API keys.
        </p>
      </PageSection>
      <PageSection title="Why we use information">
        <PageList
          items={[
            'To provide the account, recovery, feedback or support service you request.',
            'To protect accounts and infrastructure, investigate misuse and maintain reliable delivery.',
            'To understand reports and improve our products using the feedback you choose to send.',
            'To send optional product updates only where you have requested them.',
          ]}
        />
        <p>
          Where data protection law requires a legal basis, we rely on providing
          the service you request for account and support operations, our
          legitimate interests in security and improving services for
          proportionate operational processing, and consent for optional updates
          or other processing that requires it. You can withdraw consent by
          contacting us; this does not change processing already carried out
          lawfully.
        </p>
        <p>
          We do not sell personal information, share it for third-party
          marketing or use account information for advertising profiles. We do
          not make automated decisions that produce legal or similarly
          significant effects about you.
        </p>
      </PageSection>
      <PageSection title="Service providers and transfers">
        <p>
          GitHub Pages hosts ecnivs.com. Cloudflare processes traffic for
          delivery and security. Our hosting infrastructure stores account
          databases and backups, and Resend delivers transactional email. Email
          providers process messages you send to our inboxes. A contact form,
          when configured, uses the delivery service identified by that form.
        </p>
        <p>
          These providers may process information in countries outside your own.
          Applicable transfer arrangements depend on the service and the law
          that applies to you. Contact us for information about the providers
          and arrangements relevant to your request. We do not claim that all
          processing stays in India.
        </p>
        <p>
          Provider information:{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub privacy
          </a>
          ,{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">
            Cloudflare privacy
          </a>{' '}
          and{' '}
          <a href="https://resend.com/legal/privacy-policy">Resend privacy</a>.
          Links to other sites, embedded previews and services you open are
          subject to their operators’ policies.
        </p>
      </PageSection>
      <PageSection title="Cookies and local storage">
        <p>
          Our hosted account service uses necessary sign-in cookies with Secure,
          HttpOnly and SameSite protections. Website JavaScript cannot read
          those session cookies. Apps may store an account credential on your
          device, separately from credentials for external providers. Signing
          out ends the selected session; the service’s account settings let you
          revoke other sessions.
        </p>
        <p>
          Cloudflare may set security cookies. The contact form can keep a
          recent-submission timestamp in browser session storage to reduce
          duplicate submissions; it does not store your message there. We do not
          use advertising cookies on these sites.
        </p>
        <p>
          ecnivs.com and our hosted account pages do not load analytics or
          advertising scripts. Any additional product-specific measurement is
          disclosed where it is used. We will update the relevant notice and
          provide any legally required choice before introducing nonessential
          tracking.
        </p>
      </PageSection>
      <PageSection title="Retention and deletion">
        <PageList
          items={[
            'Account information remains while your account is active, unless you request deletion or retention is required for a specific security or legal purpose.',
            'Feedback remains while useful for investigating an issue or improving the product, or until you request its removal, subject to necessary security or legal records.',
            'Our current hosted account service uses sessions lasting up to 30 days without renewal, verification links lasting one hour, reset links lasting 30 minutes and device codes lasting ten minutes. Expired authentication records are removed by routine maintenance.',
            'Queued account email bodies are cleared after acceptance by the mail service. Queue metadata and associated delivery records are removed after 30 days.',
            'Administrative change history in our current hosted account service is retained for 180 days for access reviews and security investigations. Authentication replay checks expire after two minutes.',
            'Routine backups of our current hosted account database are retained for 14 days. Deleted records can remain in protected backups until those backups expire.',
            'Support messages are kept while needed to resolve the request and manage relevant follow-up, security or legal obligations. Optional update or waitlist details are kept while that purpose continues, or until you ask to leave.',
          ]}
        />
        <p>
          Infrastructure and email providers may retain their own operational
          records under their policies. We use restricted access and appropriate
          technical measures to protect retained information; no service can
          promise absolute security.
        </p>
      </PageSection>
      <PageSection title="Your choices and rights">
        <p>
          Where available, use the product’s account settings to update your
          details or manage sessions. To request access, a copy, correction or
          deletion of personal information, email{' '}
          <a href="mailto:support@ecnivs.com?subject=Account%20data%20request">
            support@ecnivs.com
          </a>{' '}
          from the address associated with the account or request. Tell us which
          service your request concerns. We verify ownership before acting.
        </p>
        <p>
          Depending on applicable law, you may also have rights to portability,
          restriction, objection and withdrawal of consent, and to complain to
          the relevant data protection authority. Contact{' '}
          <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a> to exercise
          these rights or raise a privacy concern. We respond within the time
          limits that apply to the request. Deleting necessary account
          information can end access to that account.
        </p>
        <p>
          Our services are not designed for children. If you believe a child has
          provided personal information without any permission required by
          applicable law, contact us so we can investigate and take appropriate
          action.
        </p>
      </PageSection>
      <PageSection title="Changes and contact">
        <p>
          We update the date when this policy changes. For material changes
          affecting an existing account, we will provide an appropriate notice
          through the service or account email where required.
        </p>
        <p>
          Privacy: <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>.
          Product help and account requests:{' '}
          <a href="/support/">ecnivs support</a>.
        </p>
      </PageSection>
    </PageLayout>
  )
}

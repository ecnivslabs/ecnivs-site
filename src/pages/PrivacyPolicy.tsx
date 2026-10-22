import { PageLayout, PageList, PageSection } from './PageLayout'

export function PrivacyPolicy() {
  return (
    <PageLayout
      title="Privacy policy"
      subtitle="Updated 22 October 2026"
      intro={
        <p>
          How ecnivs handles information across our websites, products and
          services.
        </p>
      }
    >
      <PageSection title="Who is responsible">
        <p>
          Vince Hika Swu, an individual developer based in Nagaland, India,
          operating as ecnivs, operates ecnivs.com and the ecnivs product sites.
        </p>
        <p>
          Business contact address: Yehovi Complex, Dimapur 797112, Nagaland,
          India.
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
      <PageSection title="Client projects and websites">
        <p>
          For freelance projects, contracts and website subscriptions, we handle
          contact details, business requirements, supplied content, project
          correspondence and billing records to discuss and deliver the work.
          With your permission, we may access domain settings and connected
          service accounts to configure or maintain your site. Credentials
          belong in an agreed secure setup process, not an enquiry form or
          ordinary support message. Access is limited to the work authorised and
          removed when it is no longer needed.
        </p>
        <p>
          A client’s website or store may process customer account details,
          delivery addresses, orders, payment references, reviews and website
          activity, depending on its features. The client determines its
          business purposes and provides the privacy notice for that site. Where
          we host or maintain this information on the client’s behalf, we follow
          the documented project instructions and applicable data-processing
          terms. We do not use one client’s customer records for another client
          or for our own advertising.
        </p>
        <p>
          Connected payment and email providers process information needed for
          their services under the client’s accounts. We agree the hosting
          providers, access, retention, backups, data return and deletion
          arrangements before launching features that collect personal
          information. The retention periods for ecnivs app accounts elsewhere
          in this policy do not automatically apply to client stores. Necessary
          project and billing records may remain for contractual, security or
          legal obligations after the work ends.
        </p>
        <p>
          If your request concerns a purchase or account on a client’s site,
          contact that business first. We assist the client with verified
          privacy requests for information we process on its behalf. For
          enquiries and project information you give directly to ecnivs, use the
          contact and rights sections of this policy.
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
      <PageSection title="Security and operational logs">
        <p>
          Where our hosted services keep security and operational logs, these
          record collection time, service and event category. Depending on the
          event, metadata may include an IP address, a server-generated request
          reference, HTTP method, route category, status and duration, or a
          database error code and database process or session identifiers.
        </p>
        <p>
          These records help detect abuse, diagnose failures, investigate
          incidents and meet applicable security-record requirements. Necessary
          security records are separate from optional app diagnostics. Turning
          off optional diagnostics does not turn off this operational
          recordkeeping.
        </p>
        <p>
          Our restricted security archive is stored in India. It keeps selected
          metadata and content-free markers rather than raw log messages. The
          archive excludes request URLs, headers and bodies, raw database error
          text, passwords, provider keys, conversations and repository content.
          Support messages, feedback you submit and records held by our service
          providers are separate and follow the relevant sections of this
          policy.
        </p>
      </PageSection>
      <PageSection title="Information on your device">
        <p>
          Installed applications may keep settings, account credentials, local
          conversation history, task records, generated files and diagnostic
          logs on your device, depending on the features you use. Signing out of
          an account does not by itself erase local work or records. Review an
          application’s storage and removal instructions before sharing a device
          or uninstalling it.
        </p>
        <p>
          A tool, provider or extension you authorise may read files, run
          commands or send material to external services. Check the requested
          access and the receiving service’s terms and privacy notice. Our
          current hosted account and feedback services do not automatically
          receive your conversations, repository files or provider credentials.
          This does not mean that a connected model provider or tool processes
          no content.
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
          lawfully. Legitimate interests is a basis only where the applicable
          law recognises it; it does not replace consent where consent is
          required.
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
          delivery and security. Our current hosted account infrastructure runs
          on Hostinger in India, including the account database, local backups
          and restricted security archive. Resend delivers transactional email.
          Email providers process messages you send to our inboxes. A contact
          form, when configured, uses the delivery service identified by that
          form.
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
          </a>
          ,{' '}
          <a href="https://www.hostinger.com/legal/privacy-policy">
            Hostinger privacy
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
      <PageSection title="Optional app diagnostics">
        <p>
          Where an ecnivs app offers optional diagnostics, its collection notice
          explains the reports and controls before you choose. On may be offered
          first, but reports do not start until you save a choice. Closing the
          notice does not give consent. Choose Off in the app’s diagnostics or
          privacy controls at any time; all features and account access remain
          available. The choice applies to that installation. Supported
          command-line clients also honour DO_NOT_TRACK=1 or
          DISABLE_TELEMETRY=1.
        </p>
        <p>
          These reports help us investigate reliability and improve our apps.
          They contain run outcomes and duration, model usage-report and
          tool-call counts, input, output and cache token counts, app version,
          operating system and architecture, and whether work ran in a child
          task. A random batch reference prevents duplicate submissions.
          Diagnostic payloads do not contain prompts, conversations, source
          code, filenames, file paths, tool arguments or output, error messages,
          stack traces or provider API keys.
        </p>
        <p>
          Uploads authenticate with your app account. We associate diagnostic
          batches with that account for access control and deletion; these
          reports are not anonymous. Unsent reports are queued only in memory.
          The app checks your preference before collecting and before sending,
          and discards queued reports on sign-out or withdrawal. A local record
          stores your choice, the notice version and the time you saved it.
          Changing the setting does not automatically erase reports already
          received. You can request their removal at support@ecnivs.com.
        </p>
        <p>
          Diagnostic batches are removed from active storage after 30 days by
          routine maintenance, or when the account is deleted. Protected backup
          copies can remain until daily backup rotation removes them, normally
          around two weeks for these reports. Necessary account security
          records, feedback you explicitly submit, local app records and
          monitoring collectors you configure yourself are separate from this
          optional setting. Model providers and independently installed
          extensions have their own data practices; consult their notices and
          controls.
        </p>
        <p>
          Pixie also offers optional daily usage history in account Settings.
          This separate choice is off until you enable it. It saves daily turn,
          model-call, tool-execution and input/output token totals from new
          optional app reports while your account exists, until you turn history
          off. Earlier 365-day choices keep that limit until you explicitly
          choose yearly history. It does not retain diagnostic samples for
          longer or recover expired activity. Turning history off deletes those
          daily totals from active storage. Account exports include this
          preference and saved history; account deletion removes both. Protected
          backups follow the rotation described below.
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
            'Security and operational metadata in our restricted archive is retained for 180 days from collection, then removed by routine maintenance. This archive is separate from optional diagnostics and is not included in routine account-database backups.',
            'Routine backups of our current hosted account database are retained for around two weeks under daily rotation. Deleted records can remain in protected backups until that rotation removes them.',
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
      <PageSection title="Privacy complaints">
        <p>
          Privacy grievance officer: Vince Hika Swu. Email{' '}
          <a href="mailto:hello@ecnivs.com?subject=Privacy%20complaint">
            hello@ecnivs.com
          </a>
          . Business contact address: Yehovi Complex, Dimapur 797112, Nagaland,
          India.
        </p>
        <p>
          Identify the service involved, explain your concern and include a way
          to reply. Do not send passwords, API keys or identity documents with
          your initial complaint. We address privacy grievances within one month
          of receipt, or a shorter period where applicable law requires it.
          Contacting us does not prevent you from using any regulatory or court
          remedy available under applicable law.
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

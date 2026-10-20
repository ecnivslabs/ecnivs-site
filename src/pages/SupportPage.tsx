import { Envelope, ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PageLayout, PageSection } from './PageLayout'

export function SupportPage() {
  return (
    <PageLayout
      title="Support"
      variant="support"
      intro={<p>Help with ecnivs products and your Pixie account.</p>}
    >
      <div className="support-contact">
        <div>
          <h2>Talk to us</h2>
          <p>
            Tell us which product you use, what happened and what you expected.
          </p>
        </div>
        <div className="support-contact-action">
          <Button asChild>
            <a href="mailto:support@ecnivs.com">
              <Envelope size={18} aria-hidden="true" /> Email support
            </a>
          </Button>
          <p>support@ecnivs.com</p>
        </div>
      </div>
      <p className="support-safety">
        Include an error message and app version when useful. Leave out
        passwords, API keys, sign-in links and private device codes.
      </p>
      <PageSection title="Pixie">
        <p>
          Accounts are open. Downloads and billing are coming soon. Pixie is
          free for the time being; your model provider’s charges may still
          apply.
        </p>
        <div className="support-shortcuts">
          <a href="https://pixie.ecnivs.com/signin">
            Sign in <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="https://pixie.ecnivs.com/forgot-password">
            Reset password <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="https://pixie.ecnivs.com/guide">
            Pixie docs <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="support-answers">
          <details>
            <summary>I haven’t received the verification email</summary>
            <p>
              Check spam and confirm the address you entered. After signup, use
              “Resend verification email” if needed. You can also sign in with
              your email and password; if verification is required, Pixie offers
              that recovery action. Use the newest link. Verification links
              expire after one hour.
            </p>
          </details>
          <details>
            <summary>I forgot my password or my link expired</summary>
            <p>
              <a href="https://pixie.ecnivs.com/forgot-password">
                Request a password reset
              </a>
              . If your email has an account, a link will arrive that expires
              after 30 minutes. Resetting your password signs out existing
              browser and terminal sessions. For an expired verification link,
              return to sign-in and follow the verification recovery prompt.
            </p>
          </details>
          <details>
            <summary>How do I sign in from Pixie?</summary>
            <p>
              Run <code>/login</code> in Pixie. Open its browser link, create or
              sign in to your account and verify your email if needed. Compare
              the displayed device code with your terminal before approving. The
              terminal saves its account session across restarts, separately
              from provider credentials.
            </p>
            <p>
              Device codes expire after ten minutes. Run <code>/login</code>{' '}
              again for a new code. If your account session expires or is
              revoked, Pixie asks you to sign in again. <code>/logout</code>{' '}
              signs out the terminal without removing provider keys.
            </p>
          </details>
          <details>
            <summary>I don’t recognize a device or session</summary>
            <p>
              Leave unknown requests unapproved. In{' '}
              <a href="https://pixie.ecnivs.com/account/settings">
                profile and security
              </a>
              , review and revoke sessions. Change your password if needed.
              Never approve a code sent by someone else.
            </p>
          </details>
          <details>
            <summary>Where are downloads and billing?</summary>
            <p>
              Both are coming soon. The{' '}
              <a href="https://pixie.ecnivs.com/downloads">downloads page</a>{' '}
              will list supported builds and installation details when they are
              available. No checkout is available. Creating an account does not
              start a paid subscription.
            </p>
          </details>
          <details>
            <summary>
              How do I report a problem or request my account data?
            </summary>
            <p>
              Use <code>/feedback</code> inside Pixie or email support with the
              details you want to share. Feedback does not automatically attach
              conversations, repository files or provider keys.
            </p>
            <p>
              For access, correction or deletion,{' '}
              <a href="mailto:support@ecnivs.com?subject=Pixie%20account%20data%20request">
                email support
              </a>{' '}
              from your account address. We verify ownership first. Read the{' '}
              <a href="/privacy/#pixie-accounts">privacy policy</a> for
              processing and retention details.
            </p>
          </details>
        </div>
      </PageSection>
      <PageSection title="Other products">
        <p>
          For Olive and Weft, start with the product’s documentation or contact
          support with its name, version and relevant error. If you use a public
          issue tracker, remove private information before posting.
        </p>
        <div className="support-shortcuts">
          <a href="https://olive.ecnivs.com/docs/">
            Olive docs <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="https://weft.ecnivs.com/docs/">
            Weft docs <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </PageSection>
      <p className="support-general">
        For collaborations, videos and general enquiries, email{' '}
        <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>.
      </p>
    </PageLayout>
  )
}

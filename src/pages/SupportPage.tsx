import { Envelope } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PageLayout, PageList, PageSection } from './PageLayout'

export function SupportPage() {
  return (
    <PageLayout
      title="Support"
      variant="support"
      intro={<p>Help with ecnivs products and services.</p>}
    >
      <div className="support-contact" id="pixie">
        <div>
          <h2>Talk to us</h2>
          <p>
            Something not working as expected? Tell us what happened and we’ll
            help you find the next step.
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
        Leave out passwords, API keys, sign-in links and private device codes.
        Remove personal or confidential information from screenshots and logs.
      </p>
      <PageSection title="What to include">
        <PageList
          items={[
            'The product or service you need help with, plus its version and your operating system where relevant.',
            'What you were trying to do, what you expected and what happened instead.',
            'Steps to reproduce the problem and the exact error message, if there is one.',
          ]}
        />
        <p>
          For installation and usage instructions, start with the documentation
          on the product’s website. You can find our current projects in the{' '}
          <a href="/products/">product directory</a>.
        </p>
      </PageSection>
      <PageSection title="Account and privacy requests">
        <p>
          If your request concerns an account, email from its associated address
          where possible. We verify ownership before sharing account information
          or making changes. Never send your password.
        </p>
        <p>
          Our <a href="/privacy/">privacy policy</a> explains how to request
          access, correction or deletion of personal information.
        </p>
      </PageSection>
      <p className="support-general">
        For collaborations, videos and general enquiries, email{' '}
        <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>.
      </p>
    </PageLayout>
  )
}

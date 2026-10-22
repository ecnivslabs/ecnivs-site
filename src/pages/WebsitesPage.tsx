import { ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Contact } from '@/components/site/Contact'
import { WEBSITE_BILLING_OPTIONS, WEBSITE_QUESTIONS } from '@/data/websites'
import { PageLayout, PageSection } from './PageLayout'

export function WebsitesPage() {
  return (
    <PageLayout
      eyebrow="Work with ecnivs"
      title={
        <>
          Websites &amp; <span className="text-accent">online stores</span>
        </>
      }
      variant="websites"
      intro={
        <>
          <p>
            We design, build and host your site, including the backend, admin
            panel and analytics dashboard.
          </p>
          <p>
            Manage products, orders and customers. Edit copy, images and
            supported colours through your account.
          </p>
          <div className="websites-actions">
            <Button size="lg" asChild>
              <a href="#contact">
                Get a website <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Button>
            <a href="#pricing" className="editorial-link">
              See pricing
            </a>
          </div>
        </>
      }
    >
      <PageSection title="Pricing" eyebrow="Build & hosting">
        <p>
          One complete website, built for you. Design, development, hosting and
          technical maintenance are included with either billing option.
        </p>
        <div className="websites-billing-options">
          {WEBSITE_BILLING_OPTIONS.map((billing) => (
            <div
              className="websites-billing-option"
              key={billing.id}
              aria-labelledby={`${billing.id}-title`}
            >
              <h3 id={`${billing.id}-title`}>{billing.name}</h3>
              <p className="websites-price">
                <strong>${billing.monthlyPrice}</strong>
                <span>USD / month</span>
              </p>
              <p className="websites-billing-total">
                ${billing.monthlyPrice * billing.months} USD billed {billing.id}
                .
              </p>
            </div>
          ))}
        </div>
        <p className="websites-pricing-note">
          No setup fee. No ecnivs cut of your sales. Prices in USD. Your domain,
          email delivery and payment-provider charges are separate.
        </p>
      </PageSection>

      <PageSection title="What’s included" eyebrow="Business tools">
        <div className="websites-feature-list">
          <div>
            <h3>Admin panel</h3>
            <p>
              Manage your store from one panel. Invite staff and control what
              each person can access.
            </p>
          </div>
          <div>
            <h3>Products &amp; inventory</h3>
            <p>
              Manage products, categories, variants and stock levels, with
              low-stock views and an adjustment history.
            </p>
          </div>
          <div>
            <h3>Analytics dashboard</h3>
            <p>
              See sales, visitor activity, product performance and conversion
              rates. Filter by date, track cart and wishlist activity, and
              export chart data to CSV.
            </p>
          </div>
          <div>
            <h3>Accounts &amp; checkout</h3>
            <p>
              Customer accounts, carts, wishlists and payments through your own
              merchant account. We confirm payment-provider compatibility before
              building.
            </p>
          </div>
          <div>
            <h3>Orders &amp; tracking</h3>
            <p>
              Manage orders, refunds and delivery rates. Customers can track
              shipments on your site for supported carriers.
            </p>
          </div>
          <div>
            <h3>Content and colours</h3>
            <p>
              Edit supported colours, copy, images, homepage collections and
              announcements. New layouts and features are quoted separately.
            </p>
          </div>
          <div>
            <h3>Emails &amp; reviews</h3>
            <p>
              Send automatic account and order emails through your own sending
              account. Collect product reviews with moderation controls.
            </p>
          </div>
          <div>
            <h3>Hosting and maintenance</h3>
            <p>
              Hosting, routine maintenance and help using your site. New pages,
              redesigns and extra integrations are quoted separately.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection title="How it works" eyebrow="From brief to launch">
        <ol className="websites-process-list">
          <li>
            <h3>Agree the scope</h3>
            <p>Tell us what you need. We agree the scope and price.</p>
          </li>
          <li>
            <h3>Design and build</h3>
            <p>Provide your domain and content. We build your site.</p>
          </li>
          <li>
            <h3>Review and launch</h3>
            <p>Review your site and learn to use the admin panel.</p>
          </li>
        </ol>
      </PageSection>

      <PageSection title="Questions" eyebrow="Service details">
        <div className="websites-questions">
          {WEBSITE_QUESTIONS.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <a href="/terms/#website-services" className="editorial-link">
          Read the service terms <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </PageSection>

      <Contact />
    </PageLayout>
  )
}

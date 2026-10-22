export const WEBSITE_BILLING_OPTIONS = [
  { id: 'monthly', name: 'Monthly', monthlyPrice: 20, months: 1 },
  { id: 'yearly', name: 'Yearly', monthlyPrice: 15, months: 12 },
] as const

export const WEBSITE_QUESTIONS = [
  {
    question: 'What do I provide?',
    answer:
      'Your domain, business details, copy, images and product information. We connect your domain and configure the services your site needs. Payment and email accounts stay in your name, with provider charges paid directly by you.',
  },
  {
    question: 'How much can I customize?',
    answer:
      'Your frontend is designed for your brand. Once live, permitted accounts can edit supported colours, copy, images and content. Store owners can manage products, categories and homepage collections. These are focused editing controls, not an unrestricted page builder. Layout changes and new features are quoted separately.',
  },
  {
    question: 'Are emails included?',
    answer:
      'We configure automatic account and order emails through your own sending account, using your verified domain. The integration is included; email delivery charges belong to your provider. Email inbox hosting and marketing campaigns are separate.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Choose $20 USD billed monthly, or $180 USD billed yearly, equivalent to $15 per month. Both include the same full website and backend. There is no setup fee or ecnivs commission on sales. Domain, email delivery and payment-provider charges are separate.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. Contact us before the next renewal to cancel. Monthly subscriptions remain active through the paid month; yearly subscriptions remain active through the paid year. Cancellation stops renewal and does not by itself create a refund for unused time. Refund conditions are agreed before subscribing, subject to applicable rights.',
  },
  {
    question: 'Who owns what?',
    answer:
      'You retain your domain, content and business data. The subscription provides a hosted website; it does not include delivery of our source code. Contact us before hosting ends to arrange an export of your content and business records. See our terms for ownership and service details.',
  },
  {
    question: 'What about extra work?',
    answer:
      'The initial build includes up to five informational pages, the agreed customer and admin screens, and two design revision rounds. Routine technical maintenance and help using your site are included. New pages, redesigns, ongoing content entry, custom features and extra integrations are quoted separately. Custom SaaS applications are outside this service.',
  },
] as const

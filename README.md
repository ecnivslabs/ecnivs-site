# ecnivs website

React and Vite serve the ecnivs site and its shared support, privacy and terms pages. Support and legal pages reuse the existing ecnivs layout, palette, typography, buttons and footer.

## Development and verification

Install dependencies with `npm ci`. Run `npm run dev` for local development, `npm run lint` for source checks, `npm run test:videos` for the video data tests and `npm run build` for TypeScript checking and the production build.

The build prerenders `/support/`, `/privacy/` and `/terms/` with the existing React server renderer through Vite. Their essential content and native help disclosures work without JavaScript. Client entry points hydrate that markup, or render normally during development. The temporary Vite renderer is closed after the build.

The contact form reports success only after its configured endpoint accepts the request. Honeypot and duplicate-submission checks do not claim delivery. Request failures preserve entered fields; restricted browser storage cannot block delivery or turn an accepted request into a failure. An unconfigured form provides a direct email alternative. The implementation's optional duplicate timestamp is not a server-side abuse-control guarantee.

## Shared product information

The central privacy policy describes Pixie's actual account, session, transactional email, feedback and retention behavior. Terms distinguish free account access, unavailable downloads and billing, provider costs and accompanying software licenses. Earlier statements that the sites had no account system were obsolete and removed. Pixie's product listing now says Accounts open rather than Waitlist open.

Source evidence was inspected in the separate private `pixie-site/server` implementation and tested account flows. No private server source or credentials are copied into this public repository.

Research used for the changes:

- [ICO privacy information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/): clear controller identity and contact, processing purposes, recipients, retention and applicable rights. Its UK-specific requirements are not presented as a universal certification.
- [India's notified DPDP Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf): plain, independently understandable notices and itemized data/purpose information. Commencement is phased; this site does not claim that all provisions were already in effect at the date of the update.
- [W3C page regions](https://www.w3.org/WAI/tutorials/page-structure/regions/): semantic header, main, footer and distinctly named navigation regions.
- [W3C form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): explicit success and failure feedback that remains available to assistive technology.
- [Resend privacy information](https://resend.com/legal/privacy-policy): the transactional mail provider is identified rather than hidden behind a general third-party statement.

The existing project design takes precedence over generic skill palettes or decorative imagery. Support is a practical contact action followed by six native, initially closed Pixie help disclosures. It introduces no new form service, search service, tracking or promised response-time agreement.

## Publishing

GitHub Pages deploys `master` using `.github/workflows/deploy.yml`. The existing workflow checks source and video metadata, builds and publishes the static artifact. Publishing changed source through that workflow requires an explicitly authorized commit and push. Do not commit or push automatically.

Pixie support and legal links should switch to these canonical pages only after the matching ecnivs deployment is live. Keep the old Pixie URLs as redirects, including the Pixie sections of the shared policies. This avoids duplicated policies and broken saved links.

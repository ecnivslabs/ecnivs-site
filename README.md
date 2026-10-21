# ecnivs website

React and Vite serve the ecnivs site and its shared support, privacy and terms pages. Support and legal pages reuse the existing ecnivs layout, palette, typography, buttons and footer.

## Development and verification

Install dependencies with `npm ci`. Run `npm run dev` for local development, `npm run lint` for source checks, `npm run test:videos` for the video data tests and `npm run build` for TypeScript checking and the production build.

The build prerenders `/support/`, `/privacy/` and `/terms/` with the existing React server renderer through Vite. Their essential content and contact links work without JavaScript. Client entry points hydrate that markup, or render normally during development. The temporary Vite renderer is closed after the build.

The contact form reports success only after its configured endpoint accepts the request. Honeypot and duplicate-submission checks do not claim delivery. Request failures preserve entered fields; restricted browser storage cannot block delivery or turn an accepted request into a failure. An unconfigured form provides a direct email alternative. The implementation's optional duplicate timestamp is not a server-side abuse-control guarantee.

## Shared product information

The central privacy policy describes our actual account, session, transactional email, feedback and retention practices. Terms cover our websites and services, free and paid access, external providers and accompanying software licenses. Product instructions and release status belong to the individual product rather than these shared pages.

Source evidence was inspected in the separate private `pixie-site/server` implementation and tested account flows. No private server source or credentials are copied into this public repository.

Research used for the changes:

- [ICO privacy information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/): clear controller identity and contact, processing purposes, recipients, retention and applicable rights. Its UK-specific requirements are not presented as a universal certification.
- [India's notified DPDP Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf): plain, independently understandable notices and itemized data/purpose information. Commencement is phased; this site does not claim that all provisions were already in effect at the date of the update.
- [W3C page regions](https://www.w3.org/WAI/tutorials/page-structure/regions/): semantic header, main, footer and distinctly named navigation regions.
- [W3C form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): explicit success and failure feedback that remains available to assistive technology.
- [Resend privacy information](https://resend.com/legal/privacy-policy): the transactional mail provider is identified rather than hidden behind a general third-party statement.

The existing project design takes precedence over generic skill palettes or decorative imagery. Support is a shared contact action with product-neutral reporting guidance. Product instructions and release status belong in the relevant product’s website or documentation. It introduces no new form service, search service, tracking or promised response-time agreement.

## Publishing

GitHub Pages deploys `master` using `.github/workflows/deploy.yml`. The existing workflow checks source and video metadata, builds and publishes the static artifact. Publishing changed source through that workflow requires an explicitly authorized commit and push. Do not commit or push automatically.

Product websites should link to the canonical shared support and legal pages. Preserve already-published redirects and incoming fragments when reorganizing content. This avoids duplicated policies and broken saved links.

## Shared-page ownership

Support, privacy and terms represent ecnivs across its products and services. They must not duplicate a product catalogue, launch status, account walkthrough or release FAQ. The existing product directory and footer already read from `src/data/products.ts`; adding a product there does not require changing these shared pages. Product-specific instructions belong with that product.

The shared privacy notice retains concrete, inspected data categories, purposes, providers, current hosted-account retention and rights. It applies relevant sections according to the service used. New data practices, processors, retention or contractual conditions still require review before they change. Avoid vague wording merely to eliminate maintenance. Feature-specific disclosures belong at the point of use and supplement the shared notice when needed. This follows the [ICO layered-notice guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-methods-can-we-use-to-provide-privacy-information/), used as transparency guidance rather than a claim of universal legal compliance.

The three existing product-named fragment IDs are retained only for already-published incoming links. They produce no product-specific heading or content and do not require aliases for new products. Use `/support/`, `/privacy/` and `/terms/` for new shared links.

## Security archive disclosure

The shared privacy notice describes selected security metadata, its purposes, restricted access, storage in India and a 180-day retention period. It distinguishes necessary service security records from optional app diagnostics, feedback, support and providers' own records. Hostinger is named as the current account infrastructure provider, with the country confirmed by the operator. No product name, release state, new visual treatment, consent gate or tracking script is added. The notice is published before connecting production sources to the verified archive.

The [CERT-In Directions, paragraph (iv)](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) specify secure rolling 180-day ICT log retention in India for covered entities. This motivates a retained security archive; the privacy wording does not assert that a single archive satisfies every obligation or resolves the operator's legal classification. [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) supports purposeful event metadata, sensitive-content exclusion and restricted access. [ICO transparency guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) supports clear purposes, recipients and retention; it is used as a disclosure checklist, not a claim that UK law necessarily applies. The technical implementation and observed native verification remain in the owning service repository.

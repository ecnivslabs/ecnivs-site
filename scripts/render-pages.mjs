import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { PrivacyPolicy } from '../src/pages/PrivacyPolicy.tsx'
import { TermsOfService } from '../src/pages/TermsOfService.tsx'
import { SupportPage } from '../src/pages/SupportPage.tsx'
import App from '../src/App.tsx'
import { AboutPage } from '../src/pages/AboutPage.tsx'
import { WebsitesPage } from '../src/pages/WebsitesPage.tsx'

export function renderPages() {
  return Object.fromEntries(
    [
      ['index.html', App],
      ['about/index.html', AboutPage],
      ['privacy/index.html', PrivacyPolicy],
      ['terms/index.html', TermsOfService],
      ['support/index.html', SupportPage],
      ['sites/index.html', WebsitesPage],
    ].map(([file, Component]) => [
      file,
      renderToString(createElement(StrictMode, null, createElement(Component))),
    ]),
  )
}

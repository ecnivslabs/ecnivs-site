import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { PrivacyPolicy } from '../src/pages/PrivacyPolicy.tsx'
import { TermsOfService } from '../src/pages/TermsOfService.tsx'
import { SupportPage } from '../src/pages/SupportPage.tsx'

export function renderPages() {
  return Object.fromEntries(
    [
      ['privacy/index.html', PrivacyPolicy],
      ['terms/index.html', TermsOfService],
      ['support/index.html', SupportPage],
    ].map(([file, Component]) => [
      file,
      renderToString(createElement(StrictMode, null, createElement(Component))),
    ]),
  )
}

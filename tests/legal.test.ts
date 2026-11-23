import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const pages = ['TermsOfService', 'PrivacyPolicy', 'CancellationRefundPolicy', 'SupportPage'].map(name => ({
  name,
  text: readFileSync(new URL(`../src/pages/${name}.tsx`, import.meta.url), 'utf8'),
}))

for (const { name, text } of pages) {
  const prose = text.replace(/\sid="[^"]*"/g, '')
  assert.doesNotMatch(prose, /[$₹€£]\s?\d|\b\d+\s?(USD|INR|EUR|GBP)\b|\b(USD|INR)\s?\d/, `${name} must not state a price; the offer shown at checkout owns prices`)
  assert.doesNotMatch(prose, /\b(Pixie|Basic|Pro plan)\b/, `${name} must stay product-agnostic`)
  assert.doesNotMatch(prose, /do not (automatically )?(convert|become)|never convert/i, `${name} must not claim that trials never convert`)
  assert.doesNotMatch(prose, /—|--/, `${name} must not use em dashes or double dashes`)
}

const terms = pages[0].text
const privacy = pages[1].text
for (const required of ['free trial', 'one free trial per person', 'renews automatically', 'regions', 'checks your access']) {
  assert.match(terms.replace(/\s+/g, ' '), new RegExp(required.replace('regions', 'differ by region'), 'i'), `Terms must cover: ${required}`)
}
for (const required of ['Trial abuse prevention', '365 days', 'Razorpay', 'Formspree', 'DB-IP', 'automatic refusal']) {
  assert.match(privacy.replace(/\s+/g, ' '), new RegExp(required, 'i'), `Privacy policy must disclose: ${required}`)
}
const anchors = [...terms.matchAll(/href="\/privacy\/#([a-z-]+)"/g)].map(match => match[1])
for (const anchor of anchors) {
  const title = anchor.replace(/-/g, ' ')
  assert.match(privacy.toLowerCase().replace(/\s+/g, ' '), new RegExp(`title="${title}`), `Terms link to a privacy section that must exist: #${anchor}`)
}
console.log('Legal pages are product-agnostic and disclose trials, payments, regional pricing and abuse prevention.')

import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { buildFixture, serveFixture } from './fixture.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
const evidence = resolve(
  process.env.ECNIVS_BROWSER_EVIDENCE ??
    join(tmpdir(), 'ecnivs-browser-evidence'),
)
await mkdir(evidence, { recursive: true })
const temporary = await mkdtemp(join(tmpdir(), 'ecnivs-browser-build-'))
const fixtures = []
let resumeModule
let compose
let browser
const errors = []
try {
  const directory = await buildFixture(root, temporary, evidence, false)
  const unconfigured = await serveFixture(directory)
  fixtures.push(unconfigured)
  const configuredDirectory = await buildFixture(
    root,
    temporary,
    evidence,
    true,
  )
  const configured = await serveFixture(configuredDirectory)
  fixtures.push(configured)
  const feed = JSON.parse(await readFile(join(root, 'src/data/youtube.json')))
  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  page.setDefaultTimeout(15000)
  page.on('pageerror', (error) => errors.push(error.message))
  for (const route of [
    '/',
    '/about/',
    '/sites/',
    '/support/',
    '/privacy/',
    '/terms/',
    '/cancellation-refund/',
  ]) {
    const response = await page.goto(unconfigured.origin + route)
    assert.equal(response.status(), 200)
    await page.evaluate(() => document.fonts.ready)
    assert.equal(await page.locator('h1').count(), 1)
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      ),
      'rgb(15, 13, 14)',
    )
    assert.equal(await page.locator('footer a[href="/privacy/"]').count(), 1)
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 })
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflows at ${width}`,
      )
    }
  }
  await page.goto(unconfigured.origin)
  assert.equal(
    await page.locator('#contact form').count(),
    0,
    'An unconfigured form must not ask visitors to compose an unsendable message',
  )
  assert(
    await page
      .locator('.contact-email a[href="mailto:hello@ecnivs.com"]')
      .isVisible(),
  )
  assert.equal(await page.locator('iframe').count(), 0)
  const next = page.getByRole('button', { name: 'Next video', exact: true })
  await next.waitFor({ state: 'visible' })
  await next.focus()
  await page.keyboard.press('Enter')
  assert.equal(
    await page.locator('#hero-video-title').textContent(),
    feed.videos[1].title,
  )
  assert.equal(
    await page.locator('.hero-actions a').first().getAttribute('href'),
    `https://www.youtube.com/watch?v=${feed.videos[1].id}`,
  )
  assert.equal(
    await next.evaluate((node) => node === document.activeElement),
    true,
  )
  await page
    .getByRole('button', { name: 'Previous video', exact: true })
    .click()
  assert.equal(
    await page.locator('#hero-video-title').textContent(),
    feed.videos[0].title,
  )
  const missingImages = await browser.newContext()
  const unavailable = await missingImages.newPage()
  unavailable.setDefaultTimeout(15000)
  await unavailable.route('https://i.ytimg.com/**', (route) => route.abort())
  await unavailable.goto(unconfigured.origin)
  await unavailable
    .locator('.hero-feature .video-image-fallback')
    .waitFor({ state: 'visible' })
  assert.match(
    await unavailable.locator('.hero-feature a').getAttribute('aria-label'),
    /Watch .* on YouTube/,
  )
  await missingImages.close()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('#releases').scrollIntoViewIfNeeded()
  const animations = await page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation.playState === 'running')
      .filter((animation) =>
        animation.effect
          .getKeyframes()
          .some((frame) =>
            [
              'transform',
              'translate',
              'rotate',
              'scale',
              'offsetDistance',
            ].some((property) => property in frame),
          ),
      )
      .map((animation) => ({
        target: animation.effect.target.className,
        frames: animation.effect.getKeyframes(),
      })),
  )
  assert.deepEqual(animations, [], JSON.stringify(animations))
  const still = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await still.newPage()
  await staticPage.goto(unconfigured.origin)
  assert.equal(await staticPage.locator('h1').textContent(), 'ecnivs')
  assert.equal(
    await staticPage.locator('.hero-actions a').first().getAttribute('href'),
    `https://www.youtube.com/watch?v=${feed.videos[0].id}`,
  )
  assert.equal(
    await staticPage
      .locator('.product-website img')
      .evaluateAll((images) =>
        images.every((image) => image.complete && image.naturalWidth > 0),
      ),
    true,
  )
  assert.equal(await staticPage.locator('iframe').count(), 0)
  assert(await staticPage.locator('.contact-email a').isVisible())
  await still.close()

  compose = await context.newPage()
  compose.setDefaultTimeout(15000)
  compose.on('pageerror', (error) => errors.push(error.message))
  await compose.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError')
    }
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError')
    }
  })
  let postsBeforeReady = 0
  compose.on('request', (request) => {
    if (request.method() === 'POST') postsBeforeReady++
  })
  await compose.route('**/assets/main-*.js', async (route) => {
    await new Promise((resolve) => {
      resumeModule = resolve
    })
    await route.continue()
  })
  await compose.goto(configured.origin, { waitUntil: 'commit' })
  await compose.locator('#name').fill('Synthetic browser review')
  await compose.locator('#email').fill('review@example.invalid')
  await compose
    .locator('#message')
    .fill('Synthetic draft entered before hydration. No email should be sent.')
  assert(
    await compose
      .getByRole('button', { name: 'Send message', exact: true })
      .isDisabled(),
  )
  await compose.locator('#email').press('Enter')
  assert.equal(postsBeforeReady, 0)
  assert.equal(configured.deliveries.length, 0)
  for (let attempt = 0; !resumeModule && attempt < 100; attempt++)
    await compose.waitForTimeout(10)
  assert(resumeModule)
  resumeModule()
  resumeModule = undefined
  await compose.unrouteAll({ behavior: 'wait' })
  await compose.waitForFunction(
    () => !document.querySelector('#contact button[type="submit"]').disabled,
  )
  assert.equal(
    await compose.locator('#name').inputValue(),
    'Synthetic browser review',
  )
  assert.match(
    await compose.locator('#message').inputValue(),
    /before hydration/,
  )
  assert.equal(
    await compose.locator('#contact form').getAttribute('method'),
    'post',
  )
  await compose.locator('#name').fill('')
  await compose
    .getByRole('button', { name: 'Send message', exact: true })
    .click()
  await compose.locator('#name-error').waitFor({ state: 'visible' })
  assert.equal(
    await compose.locator('#name').getAttribute('aria-invalid'),
    'true',
  )
  assert.equal(configured.deliveries.length, 0)
  await compose.locator('#name').fill('Synthetic browser review')
  await compose
    .getByRole('button', { name: 'Send message', exact: true })
    .click()
  await compose
    .locator('[role="alert"]')
    .filter({ hasText: 'The message did not send' })
    .waitFor()
  assert.equal(configured.deliveries.length, 1)
  assert.equal(
    await compose.locator('#email').inputValue(),
    'review@example.invalid',
  )
  configured.setDelivery(200, true)
  await compose.evaluate(() => {
    document
      .querySelector('#contact form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    document
      .querySelector('#contact form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  for (
    let attempt = 0;
    configured.deliveries.length < 2 && attempt < 100;
    attempt++
  )
    await compose.waitForTimeout(10)
  assert.equal(
    configured.deliveries.length,
    2,
    'Two simultaneous submits must result in one request',
  )
  assert(await compose.locator('#message').isDisabled())
  assert.equal(
    await compose.locator('#contact h2').textContent(),
    'Got an idea?',
  )
  configured.release()
  await compose
    .getByRole('heading', { name: 'Received', exact: true })
    .waitFor()
  assert.equal(
    await compose.evaluate(() => document.activeElement.textContent),
    'Received',
  )
  assert.equal(await compose.locator('#contact form').count(), 0)
  assert.equal(
    configured.deliveries[1].message,
    'Synthetic draft entered before hydration. No email should be sent.',
  )

  for (const [width, height] of [
    [1440, 900],
    [1280, 720],
    [768, 1024],
    [390, 844],
    [320, 844],
  ]) {
    await page.setViewportSize({ width, height })
    await page.goto(unconfigured.origin)
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({
      path: join(evidence, `homepage-${width}.png`),
      fullPage: true,
    })
    assert.equal(
      await page.evaluate(() => {
        const heading = document.querySelector('h1').getBoundingClientRect()
        const button = document
          .querySelector('.hero-actions a')
          .getBoundingClientRect()
        return (
          heading.top >= 0 &&
          heading.bottom <= innerHeight &&
          button.bottom <= innerHeight
        )
      }),
      true,
      `Name and primary action must fit the first screen at ${width}`,
    )
  }
  assert.deepEqual(errors, [])
  console.log(
    JSON.stringify({
      routes: 7,
      widths: [1440, 768, 390, 320],
      noScriptPreviews: 3,
      videoChooser: true,
      hydrationDrafts: 'preserved',
      failedSubmission: 'retained',
      duplicateRequests: 'blocked',
      syntheticDelivery: 'accepted',
      realMessagesSent: 0,
    }),
  )
} catch (error) {
  // Screenshot failures must not replace the original test failure.
  if (browser) {
    let index = 0
    for (const context of browser.contexts())
      for (const page of context.pages()) {
        await page
          .screenshot({
            path: join(evidence, `failure-${index++}.png`),
            fullPage: true,
          })
          .catch(() => {})
      }
  }
  throw error
} finally {
  resumeModule?.()
  await compose?.unrouteAll({ behavior: 'wait' })
  for (const fixture of fixtures) fixture.release()
  await browser?.close()
  for (const fixture of fixtures) await fixture.close()
  await rm(temporary, { recursive: true, force: true })
}

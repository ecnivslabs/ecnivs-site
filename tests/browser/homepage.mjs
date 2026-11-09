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
let browser
try {
  for (const configured of [false, true]) {
    const directory = await buildFixture(root, temporary, evidence, configured)
    fixtures.push(await serveFixture(directory))
  }
  const [unconfigured, configured] = fixtures
  const feed = JSON.parse(await readFile(join(root, 'src/data/youtube.json')))
  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  page.setDefaultTimeout(15000)
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.route('https://weft.ecnivs.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<title>Synthetic product preview</title>',
    }),
  )
  for (const route of [
    '/',
    '/about/',
    '/support/',
    '/privacy/',
    '/terms/',
    '/cancellation-refund/',
  ]) {
    assert.equal((await page.goto(unconfigured.origin + route)).status(), 200)
    assert.equal(await page.locator('h1').count(), 1)
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
  assert.match(await page.locator('h1').textContent(), /curious/)
  assert.equal(
    await page.locator('#videos .video-card').count(),
    feed.videos.length,
  )
  assert.equal(
    await page.locator('#videos .video-card').first().getAttribute('href'),
    `https://www.youtube.com/watch?v=${feed.videos[0].id}`,
  )
  assert.equal(await page.locator('iframe').count(), 1)
  assert.equal(
    await page.locator('#contact form').getAttribute('method'),
    'post',
  )
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 })
    await page.screenshot({
      path: join(evidence, `homepage-${width}.png`),
      fullPage: true,
    })
  }
  const fill = async () => {
    await page.locator('#name').fill('Website review')
    await page.locator('#email').fill('review@example.invalid')
    await page
      .locator('#message')
      .fill('Synthetic review message for the restored contact form.')
  }
  await fill()
  await page.locator('#contact button[type="submit"]').click()
  assert.equal(unconfigured.deliveries.length, 0)
  assert(
    await page
      .locator('#contact a[href="mailto:hello@ecnivs.com"]')
      .first()
      .isVisible(),
  )
  await page.goto(configured.origin)
  await page.locator('#contact button[type="submit"]').click()
  await page.locator('#name-error').waitFor()
  assert.equal(configured.deliveries.length, 0)
  await fill()
  await page.locator('#contact button[type="submit"]').click()
  await page.locator('#contact [role="alert"]').waitFor()
  assert.equal(await page.locator('#name').inputValue(), 'Website review')
  assert.equal(configured.deliveries.length, 1)
  configured.setDelivery(200)
  await page.locator('#contact button[type="submit"]').click()
  await page.locator('#contact h2[role="status"]').waitFor()
  assert.equal(
    await page.locator('#contact h2[role="status"]').textContent(),
    'Received',
  )
  assert.equal(configured.deliveries.length, 2)
  assert.equal(
    await page
      .locator('#contact h2[role="status"]')
      .evaluate((node) => document.activeElement === node),
    true,
  )
  const still = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await still.newPage()
  await staticPage.route('https://weft.ecnivs.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<title>Synthetic product preview</title>',
    }),
  )
  await staticPage.goto(unconfigured.origin)
  assert.match(await staticPage.locator('h1').textContent(), /curious/)
  assert(await staticPage.locator('#contact form').isHidden())
  assert(
    await staticPage
      .locator('#contact a[href="mailto:hello@ecnivs.com"]')
      .first()
      .isVisible(),
  )
  await still.close()
  assert.deepEqual(errors, [])
  await context.close()
  console.log(
    'Restored website: six routes, four widths, video links, product preview and synthetic contact outcomes pass.',
  )
} finally {
  await browser?.close()
  for (const fixture of fixtures.reverse()) await fixture.close()
  await rm(temporary, { recursive: true, force: true })
}

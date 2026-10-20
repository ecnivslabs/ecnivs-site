import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, process.env.ECNIVS_BUILD_DIRECTORY ?? 'dist')
const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
})
try {
  const { renderPages } = await server.ssrLoadModule(
    '/scripts/render-pages.mjs',
  )
  const pages = renderPages()
  for (const [file, content] of Object.entries(pages)) {
    const target = resolve(output, file)
    const html = await readFile(target, 'utf8')
    const marker = '<div id="root"></div>'
    if (!html.includes(marker)) throw new Error(`Missing page mount: ${file}`)
    await writeFile(
      target,
      html.replace(marker, () => `<div id="root">${content}</div>`),
    )
  }
  console.log(
    `Prerendered ${Object.keys(pages).length} support and policy pages.`,
  )
} finally {
  await server.close()
}

import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import {
  brotliDecompressSync,
  gunzipSync,
  gzipSync,
  brotliCompressSync,
} from 'node:zlib'

const root = resolve(process.argv[2] ?? 'dist')
const paths = []
async function inventory(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name)
    if (item.isDirectory()) await inventory(path)
    else if (item.isFile()) paths.push(path)
  }
}
await inventory(root)
const sizes = {
  javascript: 0,
  javascriptGzip: 0,
  fonts: 0,
  files: paths.length,
}
for (const path of paths) {
  const body = await readFile(path)
  if (path.endsWith('.js')) {
    sizes.javascript += body.length
    sizes.javascriptGzip += gzipSync(body).length
  }
  if (path.endsWith('.woff2')) sizes.fonts += body.length
  if (path.endsWith('.br'))
    assert.deepEqual(
      brotliDecompressSync(body),
      await readFile(path.slice(0, -3)),
    )
  if (path.endsWith('.gz'))
    assert.deepEqual(gunzipSync(body), await readFile(path.slice(0, -3)))
}
const pages = {}
for (const file of [
  'index.html',
  'about/index.html',
  'support/index.html',
  'privacy/index.html',
  'terms/index.html',
  'websites/index.html',
]) {
  const html = await readFile(join(root, file), 'utf8')
  const pending = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(
    (match) => match[1],
  )
  const seen = new Set()
  while (pending.length) {
    const path = pending.pop()
    if (!path || seen.has(path) || !path.startsWith('/assets/')) continue
    seen.add(path)
    const body = await readFile(join(root, path), 'utf8')
    for (const match of body.matchAll(
      /(?:from\s*|import\s*)["'](\.\/[^"']+\.js)["']/g,
    ))
      pending.push('/assets/' + match[1].slice(2))
  }
  let javascript = 0,
    gzip = 0,
    brotli = 0
  for (const path of seen) {
    const body = await readFile(join(root, path))
    javascript += body.length
    gzip += gzipSync(body).length
    brotli += brotliCompressSync(body).length
  }
  pages[file] = { javascript, gzip, brotli, staticHeading: /<h1\b/.test(html) }
}
console.log(JSON.stringify({ root, sizes, pages }, null, 2))

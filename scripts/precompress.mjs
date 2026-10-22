import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { brotliCompress, constants, gzip } from 'node:zlib'
import { promisify } from 'node:util'

const root = resolve(process.env.ECNIVS_BUILD_DIRECTORY ?? 'dist')
if (root === '/' || root === process.cwd())
  throw new Error('Compression requires a separate build directory')
const br = promisify(brotliCompress),
  gz = promisify(gzip)
const files = []
async function inventory(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name)
    if (item.isSymbolicLink())
      throw new Error('Build output must not contain symlinks')
    if (item.isDirectory()) await inventory(path)
    else if (
      item.isFile() &&
      /\.(html|css|js|svg|json|xml|txt)$/.test(item.name)
    )
      files.push(path)
  }
}
await inventory(root)
let saved = 0
for (let index = 0; index < files.length; index += 4) {
  await Promise.all(
    files.slice(index, index + 4).map(async (path) => {
      const source = await readFile(path)
      for (const [suffix, compress] of [
        [
          'br',
          (value) =>
            br(value, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }),
        ],
        ['gz', (value) => gz(value, { level: 9 })],
      ]) {
        const destination = path + '.' + suffix
        if (source.length >= 1024) {
          const compressed = await compress(source)
          if (compressed.length < source.length) {
            await writeFile(destination, compressed)
            saved++
            continue
          }
        }
        await unlink(destination).catch((error) => {
          if (error.code !== 'ENOENT') throw error
        })
      }
    }),
  )
}
console.log(`Prepared ${saved} compressed static files.`)

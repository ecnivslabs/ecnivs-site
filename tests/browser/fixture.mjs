import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { openSync, closeSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { join, resolve, extname, sep } from 'node:path'

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
}

export async function buildFixture(root, temporary, evidence, configured) {
  const npm = process.env.npm_execpath
  if (!npm) throw new Error('Run browser checks with npm run test:browser')
  const directory = join(temporary, configured ? 'configured' : 'unconfigured')
  const log = openSync(
    join(
      evidence,
      configured ? 'configured-build.log' : 'unconfigured-build.log',
    ),
    'w',
  )
  try {
    const child = spawn(process.execPath, [npm, 'run', 'build'], {
      cwd: root,
      stdio: ['ignore', log, log],
      env: {
        ...globalThis.process.env,
        ECNIVS_BUILD_DIRECTORY: directory,
        VITE_INQUIRY_ENDPOINT: configured ? '/__test/contact' : '',
        VITE_ANALYTICS_SCRIPT_URL: '',
        VITE_ANALYTICS_DOMAIN: '',
      },
    })
    await new Promise((resolve, reject) => {
      child.once('error', reject)
      child.once('exit', (code) =>
        code === 0
          ? resolve()
          : reject(new Error(`Browser fixture build failed: ${code}`)),
      )
    })
  } finally {
    closeSync(log)
  }
  return directory
}

export async function serveFixture(directory) {
  const deliveries = []
  let status = 503
  let hold = false
  const releases = new Set()
  const server = createServer(async (request, response) => {
    try {
      const path = new URL(request.url, 'http://127.0.0.1').pathname
      if (path === '/__test/contact' && request.method === 'POST') {
        const chunks = []
        for await (const chunk of request) chunks.push(chunk)
        deliveries.push(JSON.parse(Buffer.concat(chunks).toString()))
        if (hold) await new Promise((resolve) => releases.add(resolve))
        response.writeHead(status, { 'content-type': 'application/json' })
        response.end(
          JSON.stringify({ accepted: status === 200, synthetic: true }),
        )
        return
      }
      if (request.method !== 'GET') {
        response.writeHead(405)
        response.end()
        return
      }
      let file = resolve(directory, '.' + decodeURIComponent(path))
      if (file !== directory && !file.startsWith(directory + sep)) {
        response.writeHead(403)
        response.end()
        return
      }
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
      response.writeHead(200, {
        'content-type': types[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      })
      response.end(await readFile(file))
    } catch {
      if (!response.headersSent) response.writeHead(404)
      response.end()
    }
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    deliveries,
    setDelivery(code, pending = false) {
      status = code
      hold = pending
    },
    release() {
      hold = false
      for (const resolve of releases) resolve()
      releases.clear()
    },
    async close() {
      for (const resolve of releases) resolve()
      server.closeAllConnections()
      await new Promise((resolve) => server.close(resolve))
    },
  }
}

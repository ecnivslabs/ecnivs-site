import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

export function mountPage(page: ReactNode) {
  const container = document.getElementById('root')
  if (!container) throw new Error('Page mount is missing')
  const content = <StrictMode>{page}</StrictMode>
  if (container.hasChildNodes()) hydrateRoot(container, content)
  else createRoot(container).render(content)
}

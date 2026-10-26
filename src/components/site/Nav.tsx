import { YoutubeLogo } from '@phosphor-icons/react'
import { SOCIAL } from '@/data/social'
import { Logomark } from './Logomark'

export function Nav() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="/" aria-label="ecnivs home">
          <Logomark className="h-9 w-9" />
        </a>
        <nav className="site-header-links" aria-label="Main navigation">
          <a href="#videos">Videos</a>
          <a href="#releases">Software</a>
          <a href="/sites/" className="site-websites-link">
            Sites
          </a>
          <a
            className="site-youtube"
            href={SOCIAL.youtube}
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeLogo size={18} aria-hidden="true" />
            <span className="site-youtube-label">YouTube</span>
            <span className="site-youtube-accessible">ecnivs on YouTube</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

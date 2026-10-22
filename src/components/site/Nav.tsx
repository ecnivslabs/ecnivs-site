import { YoutubeLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { SOCIAL } from '@/data/social'
import { Wordmark } from './Wordmark'

export function Nav() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="/" aria-label="ecnivs home">
          <Wordmark />
        </a>
        <nav className="site-header-links" aria-label="Main navigation">
          <a href="/websites/" className="site-websites-link">
            Websites
          </a>
          <Button asChild>
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer">
              <YoutubeLogo size={18} aria-hidden="true" />
              <span className="site-youtube-label">YouTube</span>
              <span className="site-youtube-accessible">ecnivs on YouTube</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

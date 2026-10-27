import { ArrowDown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Logomark } from './Logomark'

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-layout mx-auto w-full max-w-7xl px-6">
        <div className="hero-copy">
          <p className="hero-eyebrow">ecnivs</p>
          <h1 className="hero-title">
            <span>For the</span>
            <span>terminally</span>
            <span className="hero-payoff">curious</span>
          </h1>
          <div className="hero-bottom">
            <p>
              We make tech videos and build software. We also take on freelance
              projects and contracts.
            </p>
            <div className="hero-actions">
              <Button size="lg" asChild>
                <a href="#videos">
                  Watch the latest <ArrowDown size={18} aria-hidden="true" />
                </a>
              </Button>
              <a href="#releases" className="editorial-link">
                Explore the lab <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-topics" aria-label="What we explore">
              <li>Programming</li>
              <li>Systems</li>
              <li>Tech culture</li>
            </ul>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-signature">
            <Logomark className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

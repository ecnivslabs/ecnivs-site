import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Logomark } from './Logomark'

export function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="top" className="hero-section">
      <div className="hero-layout mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="hero-eyebrow">ecnivs</p>
          <h1 className="hero-title">
            <span>For the</span>
            <span>terminally</span>
            <span className="hero-payoff">curious</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Code, computers, and the occasional rabbit hole. We unpack the
              tech, then build things of our own.
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
        </motion.div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-signature">
            <Logomark className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

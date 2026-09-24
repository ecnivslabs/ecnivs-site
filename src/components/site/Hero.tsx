import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Logomark } from './Logomark'

export function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="top" className="hero-section">
      <div className="hero-art" aria-hidden="true">
        <div className="hero-signature">
          <Logomark className="h-full w-full" />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-heading-row">
            <h1 className="hero-title">
              Independent software.
              <br />
              <span className="font-accent-serif">Built to be used.</span>
            </h1>
          </div>
          <div className="hero-bottom">
            <p>
              We’re ecnivs. We make software for our own work, then put it in
              your hands. Independently built and maintained by a small team.
            </p>
            <div className="hero-actions">
              <Button size="lg" asChild>
                <a href="#releases">
                  Meet our products <ArrowDown size={18} aria-hidden="true" />
                </a>
              </Button>
              <a
                href="https://github.com/ecnivslabs"
                target="_blank"
                rel="noreferrer"
                className="editorial-link"
              >
                Find us on GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

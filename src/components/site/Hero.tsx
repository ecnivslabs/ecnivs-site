import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Magnetic } from './Magnetic'

const EASE = [0.16, 1, 0.3, 1] as const

const HEADLINE_WORDS = ['Independent', 'software,', 'built', 'to', 'last.']

function HeroMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <path
          id="hero-arc"
          d="M 4.892 8.777 A 6.5 6.5 0 0 1 17.108 13.223"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <linearGradient id="hero-arc-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent-highlight))" />
        </linearGradient>
      </defs>
      <use href="#hero-arc" stroke="hsl(var(--foreground) / 0.7)" />
      <use
        href="#hero-arc"
        transform="rotate(180 16 16)"
        stroke="url(#hero-arc-accent)"
      />
    </svg>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 18])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 z-0 bg-background pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute rounded-full opacity-70"
          style={{
            top: 'clamp(-260px, -14vw, -120px)',
            right: 'clamp(-220px, -8vw, -60px)',
            height: 'clamp(520px, 40vw, 860px)',
            width: 'clamp(520px, 40vw, 860px)',
            background:
              'radial-gradient(circle, hsl(var(--accent) / 0.16) 0%, hsl(var(--accent) / 0.05) 45%, hsl(var(--accent) / 0) 72%)',
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 hidden -translate-y-1/2 opacity-55 transform-gpu will-change-transform sm:block"
          style={{
            right: 'clamp(-40px, 3vw, 140px)',
            height: 'clamp(460px, 34vw, 760px)',
            width: 'clamp(460px, 34vw, 760px)',
            ...(reduceMotion
              ? undefined
              : { scale: markScale, rotate: markRotate }),
          }}
        >
          <HeroMark />
        </motion.div>
        <div className="grain-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono-brand text-xs tracking-wide text-muted-foreground uppercase">
              ecnivs &middot; software company
            </span>
          </motion.div>

          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                key={word}
                className="mr-[0.28em] inline-block overflow-hidden"
              >
                <motion.span
                  initial={reduceMotion ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + index * 0.05,
                    ease: EASE,
                  }}
                  className={
                    word === 'Independent'
                      ? 'font-accent-serif accent-serif-text inline-block font-normal'
                      : 'inline-block'
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We build the tools we wish existed, starting with a programming
            language and a coding agent, and we use them ourselves every day.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Magnetic strength={0.3}>
              <Button size="lg" asChild>
                <a href="#releases">See our releases</a>
              </Button>
            </Magnetic>
            <a
              href="https://github.com/ecnivslabs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ecnivs on GitHub
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

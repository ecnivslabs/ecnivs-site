import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2>
            Small team.
            <br />
            <span className="font-accent-serif">Close to the work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <p>
            The people who design our products also write the code, use it, and
            fix what breaks. There’s no handoff between the idea and the work.
          </p>
          <p>
            We keep the team small and the feedback close. If something gets in
            your way, we want to know about it.
          </p>
          <a href="/company/" className="editorial-link">
            More about ecnivs <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

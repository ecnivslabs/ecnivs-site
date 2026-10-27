import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="section-label">This is ecnivs</p>
          <h2>
            One brand
            <br />
            Many rabbit holes
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <p>
            ecnivs is our corner of the internet for understanding tech and
            making things with it. Programming languages, systems, experiments:
            if it gets us curious, it belongs here.
          </p>
          <p>
            Watch a breakdown. Try a project. Ask a better question. There’s
            always another rabbit hole.
          </p>
          <a href="/about/" className="editorial-link">
            Meet ecnivs <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

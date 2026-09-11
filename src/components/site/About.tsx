import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="border-t border-border/60 py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            About
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We build the software{' '}
            <span className="font-accent-serif accent-serif-text italic">
              we use ourselves.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            We start every project the same way: build the thing we wish already
            existed, run it ourselves in production, and only then decide
            whether it's worth sharing. So far that's produced a systems
            language and a coding agent, both things we run ourselves every day.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            That is still how we work. A small team, no separation between the
            people who design a system and the people who run it, and nothing
            shipped that we would not depend on ourselves.
          </p>
          <a
            href="/company/"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            More about ecnivs
          </a>
        </Reveal>
      </div>
    </section>
  )
}

import {
  ArrowDown,
  ArrowUpRight,
  GithubLogo,
  InstagramLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PageLayout, PageSection } from './PageLayout'
import { SOCIAL } from '@/data/social'

export function AboutPage() {
  return (
    <PageLayout
      title="About ecnivs"
      subtitle="For the terminally curious"
      variant="about"
      intro={
        <>
          <p>
            One person, a lot of questions, and a corner of the internet to
            explore them.
          </p>
          <p>
            I’m Vince Hika Swu, the person behind ecnivs. I make videos about
            code, computers, and the ideas that make me want to dig deeper.
            Sometimes that curiosity turns into something you can use.
          </p>
          <div className="about-actions">
            <Button size="lg" asChild>
              <a href="/#videos">
                Watch the videos <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Button>
            <a href="#the-lab" className="editorial-link">
              Explore the lab <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </>
      }
      media={
        <figure className="about-portrait">
          <img
            src="/about/portrait.webp"
            width="1254"
            height="1254"
            alt="Portrait of Vince Hika Swu"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>Vince Hika Swu · Creator of ecnivs</figcaption>
        </figure>
      }
    >
      <PageSection title="The videos">
        <p>
          A new programming language. A system that works differently. A piece
          of tech that deserves a closer look. That’s where a video starts.
        </p>
        <p>
          I want you to leave with a clearer picture of how it works, and a
          reason to stay curious about what comes next.
        </p>
        <a
          href={SOCIAL.videos}
          target="_blank"
          rel="noreferrer"
          className="editorial-link"
        >
          Browse the channel <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </PageSection>

      <PageSection title="The lab">
        <p>
          Explaining things is one half of ecnivs. Building them is the other.
          ecnivs labs is where those projects live.
        </p>
        <p>
          There’s{' '}
          <a href="https://olive.ecnivs.com" target="_blank" rel="noreferrer">
            Olive
          </a>
          , a systems programming language;{' '}
          <a href="https://pixie.ecnivs.com" target="_blank" rel="noreferrer">
            Pixie
          </a>
          , an AI coding agent for the terminal; and{' '}
          <a href="https://weft.ecnivs.com" target="_blank" rel="noreferrer">
            Weft
          </a>
          , an ASCII video codec. Different projects, same curiosity about what
          software could do differently.
        </p>
        <a href="/#releases" className="editorial-link">
          Explore the projects <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </PageSection>

      <PageSection title="Say hello">
        <p>
          I also take on freelance projects and contracts, including{' '}
          <a href="/websites/">websites and online stores</a>. For a project,
          video idea or collaboration, write to{' '}
          <a href="mailto:hello@ecnivs.com">hello@ecnivs.com</a>.
        </p>
        <nav className="about-socials" aria-label="Find ecnivs online">
          <a href={SOCIAL.youtube} target="_blank" rel="noreferrer">
            <YoutubeLogo size={20} aria-hidden="true" /> YouTube
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
            <InstagramLogo size={20} aria-hidden="true" /> Instagram
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={SOCIAL.github} target="_blank" rel="noreferrer">
            <GithubLogo size={20} aria-hidden="true" /> GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </PageSection>
    </PageLayout>
  )
}

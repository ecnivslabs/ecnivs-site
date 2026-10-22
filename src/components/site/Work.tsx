import { ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Work() {
  return (
    <section className="work-section" aria-labelledby="work-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="work-layout">
          <div>
            <h2 id="work-title">Work with ecnivs</h2>
            <p>
              Websites, online stores, freelance projects and contracts. Tell us
              what you have in mind.
            </p>
          </div>
          <div className="work-actions">
            <Button variant="ghost" asChild>
              <a href="/sites/">
                Explore websites <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Button>
            <a className="editorial-link" href="#contact">
              Discuss a project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

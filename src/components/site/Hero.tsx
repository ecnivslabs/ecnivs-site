import { useState, useSyncExternalStore } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { VIDEOS, videoUrl } from '@/data/videos'
import { SOCIAL } from '@/data/social'
import { VideoArtwork } from './VideoArtwork'

const subscribeReadiness = () => () => {}

export function Hero() {
  const [selected, setSelected] = useState(0)
  const ready = useSyncExternalStore(
    subscribeReadiness,
    () => true,
    () => false,
  )
  const video = VIDEOS[selected]
  const choose = (step: number) =>
    setSelected((index) => (index + step + VIDEOS.length) % VIDEOS.length)
  return (
    <section id="top" className="hero-section">
      <div className="hero-layout mx-auto w-full max-w-7xl px-6">
        <h1 className="hero-title">ecnivs</h1>
        {video && (
          <figure className="hero-feature">
            <a
              href={videoUrl(video)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              <VideoArtwork key={video.id} video={video} eager />
            </a>
            <figcaption className="hero-feature-caption">
              <span id="hero-video-title" aria-live="polite">
                {video.title}
              </span>
              {VIDEOS.length > 1 && (
                <div
                  className="hero-video-controls"
                  data-ready={ready}
                  role="group"
                  aria-label={`Choose a video, ${selected + 1} of ${VIDEOS.length}`}
                  aria-hidden={!ready}
                >
                  <button
                    type="button"
                    disabled={!ready}
                    aria-label="Previous video"
                    aria-controls="hero-video-title"
                    onClick={() => choose(-1)}
                  >
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={!ready}
                    aria-label="Next video"
                    aria-controls="hero-video-title"
                    onClick={() => choose(1)}
                  >
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                </div>
              )}
            </figcaption>
          </figure>
        )}
        <div className="hero-copy">
          <p className="hero-description">
            Tech videos and software experiments. For the terminally curious.
          </p>
          <div className="hero-actions">
            <Button size="lg" asChild>
              <a
                href={video ? videoUrl(video) : SOCIAL.videos}
                target="_blank"
                rel="noreferrer"
              >
                {selected === 0 ? 'Watch the latest' : 'Watch this video'}{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Button>
            <a href="#releases" className="editorial-link">
              Explore the software <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

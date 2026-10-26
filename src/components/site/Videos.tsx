import { useSyncExternalStore } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import {
  VIDEOS,
  VIDEOS_UPDATED_AT,
  formatDuration,
  videoUrl,
  type Video,
} from '@/data/videos'
import { SOCIAL } from '@/data/social'
import { Reveal } from './Reveal'
import { VideoArtwork } from './VideoArtwork'

function VideoCard({ video }: { video: Video }) {
  return (
    <a
      className="video-card"
      href={videoUrl(video)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${video.title} on YouTube`}
    >
      <div className="video-image">
        <VideoArtwork video={video} />
        <span className="video-duration">{formatDuration(video.duration)}</span>
      </div>
      <div className="video-details">
        <h3>
          {video.title} <ArrowUpRight size={18} aria-hidden="true" />
        </h3>
      </div>
    </a>
  )
}

const subscribeFreshness = () => () => {}

export function Videos() {
  const remaining = VIDEOS.slice(1)
  const stale = useSyncExternalStore(
    subscribeFreshness,
    () => Date.now() - Date.parse(VIDEOS_UPDATED_AT) > 24 * 60 * 60 * 1000,
    () => false,
  )
  return (
    <section
      id="videos"
      className="videos-section"
      aria-labelledby="videos-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="section-intro">
          <div>
            <h2 id="videos-title">More videos</h2>
          </div>
          <a
            href={SOCIAL.videos}
            target="_blank"
            rel="noreferrer"
            className="editorial-link"
          >
            Browse the channel <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        {remaining.length > 0 ? (
          <div className="video-grid">
            {remaining.map((video, index) => (
              <Reveal key={video.id} delay={(index % 2) * 0.08}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="video-empty">
            {VIDEOS.length
              ? 'Explore the channel for more videos.'
              : 'New videos will appear here when they’re published. Explore the channel on YouTube.'}
          </p>
        )}
        {stale && VIDEOS.length > 0 && (
          <p className="video-freshness">
            Visit the channel for the newest uploads.
          </p>
        )}
      </div>
    </section>
  )
}

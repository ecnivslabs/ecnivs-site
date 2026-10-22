import { useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, YoutubeLogo, InstagramLogo } from '@phosphor-icons/react'
import {
  VIDEOS,
  VIDEOS_UPDATED_AT,
  formatDuration,
  videoUrl,
  type Video,
} from '@/data/videos'
import { SOCIAL } from '@/data/social'

function VideoCard({ video, latest }: { video: Video; latest: boolean }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <a
      className={latest ? 'video-card video-card-latest' : 'video-card'}
      href={videoUrl(video)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${video.title} on YouTube`}
    >
      <div className="video-image">
        {!imageFailed ? (
          <img
            src={video.thumbnail}
            alt=""
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="video-image-fallback" aria-hidden="true">
            <YoutubeLogo size={48} />
          </div>
        )}
        <span className="video-duration">{formatDuration(video.duration)}</span>
      </div>
      <div className="video-details">
        {latest && <p className="video-kicker">Newest upload</p>}
        <h3>{video.title}</h3>
        <span className="video-watch">
          Watch video <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

const subscribeFreshness = () => () => {}

export function Videos() {
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
            <h2 id="videos-title">Latest videos</h2>
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
        <p className="section-description">
          New languages. Weird systems. Big ideas. Press play and get into it.
        </p>
        {VIDEOS.length > 0 ? (
          <div className="video-grid">
            {VIDEOS.map((video, index) => (
              <VideoCard key={video.id} video={video} latest={index === 0} />
            ))}
          </div>
        ) : (
          <p className="video-empty">
            New videos will appear here when they’re published. Explore the
            channel on YouTube.
          </p>
        )}
        {stale && VIDEOS.length > 0 && (
          <p className="video-freshness">
            Visit the channel for the newest uploads.
          </p>
        )}
        <div className="social-strip">
          <p>Find us in your feed.</p>
          <div>
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer">
              <YoutubeLogo size={22} aria-hidden="true" /> Watch on YouTube{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
              <InstagramLogo size={22} aria-hidden="true" /> Follow on Instagram{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

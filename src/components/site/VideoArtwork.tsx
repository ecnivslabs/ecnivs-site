import { useCallback, useState } from 'react'
import { YoutubeLogo } from '@phosphor-icons/react'
import type { Video } from '@/data/videos'

export function VideoArtwork({
  video,
  eager = false,
}: {
  video: Video
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const imageReady = useCallback((image: HTMLImageElement | null) => {
    // A thumbnail can fail before hydration attaches its error handler.
    if (image?.complete && image.naturalWidth === 0) setFailed(true)
  }, [])
  if (failed)
    return (
      <div className="video-image-fallback" aria-hidden="true">
        <YoutubeLogo size={36} />
        <span>Watch on YouTube</span>
      </div>
    )
  return (
    <img
      ref={imageReady}
      src={video.thumbnail}
      alt=""
      width="720"
      height="405"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

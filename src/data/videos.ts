import feed from './youtube.json' with { type: 'json' }

export type Video = {
  id: string
  title: string
  duration: number
  thumbnail: string
}

export const VIDEOS: Video[] = feed.videos
export const VIDEOS_UPDATED_AT = feed.updatedAt

export function videoUrl(video: Video): string {
  return `https://www.youtube.com/watch?v=${video.id}`
}

export function formatDuration(duration: number): string {
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor(duration / 60)
  if (minutes < 60) return `${minutes}:${seconds}`
  return `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}:${seconds}`
}

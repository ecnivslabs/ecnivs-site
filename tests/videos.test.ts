import assert from 'node:assert/strict'
import { test } from 'node:test'
import { VIDEOS, formatDuration, videoUrl } from '../src/data/videos.ts'

test('duration labels cover short videos and hour-long releases', () => {
  for (const [seconds, expected] of [
    [95, '1:35'],
    [120, '2:00'],
    [530, '8:50'],
    [3600, '1:00:00'],
    [3661, '1:01:01'],
  ] as const) {
    assert.equal(formatDuration(seconds), expected)
  }
})

test('release links use verified IDs and open regular YouTube watch pages', () => {
  for (const video of VIDEOS) {
    assert.match(video.id, /^[\w-]{11}$/)
    assert.equal(videoUrl(video), `https://www.youtube.com/watch?v=${video.id}`)
    assert.ok(video.title.length > 0)
    assert.ok(video.duration > 0)
  }
})

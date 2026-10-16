import json
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path
from unittest.mock import patch

from refresh_youtube import CHANNEL_ID, CHANNEL_URL, build_feed, refresh, validate_feed


def video(index=0, **overrides):
    return {
        'id': f'video{index:06d}', 'title': f'Video {index}', 'duration': 95,
        'thumbnails': [{'url': f'https://i.ytimg.com/vi/video{index:06d}/hq720.jpg', 'width': 720}],
        **overrides,
    }


def playlist(entries):
    return {'channel_id': CHANNEL_ID, 'webpage_url': CHANNEL_URL, 'entries': entries}


class YouTubeFeedTests(unittest.TestCase):
    def test_keeps_short_landscape_long_form_videos(self):
        feed = build_feed(playlist([video(duration=95), video(1, duration=120)]))
        self.assertEqual([item['duration'] for item in feed['videos']], [95, 120])

    def test_limits_releases_preserving_channel_order(self):
        feed = build_feed(playlist([video(i) for i in range(12)]))
        self.assertEqual([item['id'] for item in feed['videos']], [f'video{i:06d}' for i in range(5)])

    def test_excludes_live_upcoming_members_and_unavailable(self):
        entries = [None, video(live_status='is_live'), video(1, live_status='is_upcoming'),
                   video(2, availability='subscriber_only'), video(3, duration=None), video(4)]
        self.assertEqual([item['id'] for item in build_feed(playlist(entries))['videos']], ['video000004'])

    def test_deduplicates_uploads(self):
        self.assertEqual(len(build_feed(playlist([video(), video()]))['videos']), 1)

    def test_picks_largest_trusted_thumbnail(self):
        thumbnails = [{'url': 'https://example.com/thumbnail.jpg', 'width': 4000},
                      {'url': 'https://i.ytimg.com/small.jpg', 'width': 360},
                      {'url': 'https://i.ytimg.com/large.jpg', 'width': 720}]
        self.assertEqual(build_feed(playlist([video(thumbnails=thumbnails)]))['videos'][0]['thumbnail'],
                         'https://i.ytimg.com/large.jpg')

    def test_rejects_shorts_tab_and_wrong_channel(self):
        for change in ({'webpage_url': CHANNEL_URL.replace('/videos', '/shorts')}, {'channel_id': 'other'}):
            with self.subTest(change=change), self.assertRaises(ValueError):
                build_feed({**playlist([video()]), **change})

    def test_empty_channel_is_valid(self):
        self.assertEqual(build_feed(playlist([]))['videos'], [])

    def test_invalid_response_does_not_become_empty_feed(self):
        for entries in (None, [video(duration=float('nan'))], [video(id='invalid')], [video(title='')]):
            with self.subTest(entries=entries), self.assertRaises(ValueError):
                build_feed(playlist(entries))

    def test_validates_saved_feed_before_fallback(self):
        feed = build_feed(playlist([video()]))
        for key, value in [('id', 'javascript:bad'), ('thumbnail', 'http://i.ytimg.com/x'), ('duration', -1)]:
            invalid = deepcopy(feed)
            invalid['videos'][0][key] = value
            with self.subTest(key=key), self.assertRaises(ValueError):
                validate_feed(invalid)

    def test_refresh_replaces_feed_atomically(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'youtube.json'
            with patch('refresh_youtube.fetch_playlist', return_value=playlist([video()])):
                self.assertTrue(refresh(path))
            self.assertEqual(json.loads(path.read_text())['videos'][0]['id'], 'video000000')
            self.assertFalse(path.with_suffix('.json.tmp').exists())

    def test_refresh_failure_preserves_verified_feed(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'youtube.json'
            saved = json.dumps(build_feed(playlist([video()])))
            path.write_text(saved)
            with patch('refresh_youtube.fetch_playlist', side_effect=RuntimeError('YouTube unavailable')):
                self.assertFalse(refresh(path))
            self.assertEqual(path.read_text(), saved)

    def test_refresh_failure_without_valid_fallback_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'youtube.json'
            with patch('refresh_youtube.fetch_playlist', side_effect=RuntimeError('YouTube unavailable')):
                with self.assertRaises(RuntimeError):
                    refresh(path)
            path.write_text('{}')
            with patch('refresh_youtube.fetch_playlist', side_effect=RuntimeError('YouTube unavailable')):
                with self.assertRaises(RuntimeError):
                    refresh(path)


if __name__ == '__main__':
    unittest.main()

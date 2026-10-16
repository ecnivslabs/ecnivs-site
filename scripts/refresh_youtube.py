import json
import math
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

CHANNEL_ID = "UCrro_lGCbY6UwieTBWorYHg"
CHANNEL_URL = "https://www.youtube.com/@ecnivs/videos"
FEED_PATH = Path(__file__).resolve().parents[1] / "src/data/youtube.json"
VIDEO_LIMIT = 5


def valid_thumbnail(url):
    if not isinstance(url, str):
        return False
    parsed = urlparse(url)
    return parsed.scheme == "https" and parsed.hostname == "i.ytimg.com"


def validate_feed(feed):
    if not isinstance(feed, dict):
        raise ValueError("Invalid YouTube feed")
    if feed.get("channelId") != CHANNEL_ID or feed.get("channelUrl") != CHANNEL_URL:
        raise ValueError("YouTube feed belongs to a different channel")
    updated = datetime.fromisoformat(feed["updatedAt"])
    if updated.tzinfo is None:
        raise ValueError("YouTube feed update time requires a timezone")
    videos = feed.get("videos")
    if not isinstance(videos, list) or len(videos) > VIDEO_LIMIT:
        raise ValueError("Invalid YouTube video list")
    seen = set()
    for video in videos:
        video_id = video["id"]
        duration = video["duration"]
        if not isinstance(video_id, str) or not re.fullmatch(r"[\w-]{11}", video_id, re.ASCII):
            raise ValueError("Invalid YouTube video ID")
        if video_id in seen:
            raise ValueError("Duplicate YouTube video")
        seen.add(video_id)
        if not isinstance(video["title"], str) or not video["title"].strip():
            raise ValueError("Missing YouTube video title")
        if type(duration) not in (int, float) or not math.isfinite(duration) or duration <= 0:
            raise ValueError("Invalid YouTube video duration")
        if not valid_thumbnail(video["thumbnail"]):
            raise ValueError("Invalid YouTube thumbnail URL")
    return feed


def build_feed(playlist):
    if not isinstance(playlist, dict) or playlist.get("channel_id") != CHANNEL_ID:
        raise ValueError("YouTube returned an unexpected channel")
    if playlist.get("webpage_url") != CHANNEL_URL:
        raise ValueError("YouTube returned a different channel tab")
    entries = playlist.get("entries")
    if not isinstance(entries, list):
        raise ValueError("YouTube did not return a video list")
    videos = []
    seen = set()
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        if entry.get("live_status") in ("is_live", "is_upcoming", "post_live"):
            continue
        if entry.get("availability") not in (None, "public"):
            continue
        video_id, duration, title = entry.get("id"), entry.get("duration"), entry.get("title")
        if not isinstance(video_id, str) or not re.fullmatch(r"[\w-]{11}", video_id, re.ASCII):
            continue
        if video_id in seen or not isinstance(title, str) or not title.strip():
            continue
        if type(duration) not in (int, float) or not math.isfinite(duration) or duration <= 0:
            continue
        thumbnails = [
            thumb for thumb in (entry.get("thumbnails") or [])
            if isinstance(thumb, dict) and valid_thumbnail(thumb.get("url"))
        ]
        if not thumbnails:
            continue
        thumbnail = max(thumbnails, key=lambda thumb: thumb.get("width") or 0)
        videos.append({"id": video_id, "title": title.strip(), "duration": round(duration), "thumbnail": thumbnail["url"]})
        seen.add(video_id)
        if len(videos) == VIDEO_LIMIT:
            break
    if entries and not videos:
        raise ValueError("YouTube returned uploads but none could be verified")
    return validate_feed({
        "channelId": CHANNEL_ID,
        "channelUrl": CHANNEL_URL,
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "videos": videos,
    })


def fetch_playlist():
    from yt_dlp import YoutubeDL
    from yt_dlp.utils import DownloadError

    # The Videos tab excludes Shorts, including short landscape uploads that are long-form.
    with YoutubeDL({
        "extract_flat": True, "skip_download": True, "playlistend": 24,
        "socket_timeout": 20, "retries": 2, "extractor_retries": 2,
        "quiet": True, "cachedir": False,
    }) as youtube:
        try:
            return youtube.extract_info(CHANNEL_URL, download=False)
        except DownloadError as error:
            raise RuntimeError(f"YouTube metadata extraction failed: {error}") from error


def refresh(path=FEED_PATH):
    try:
        feed = build_feed(fetch_playlist())
    except (RuntimeError, ValueError, KeyError, TypeError, ImportError, OSError) as error:
        # Keep the last verified feed when YouTube blocks a scheduled refresh.
        try:
            validate_feed(json.loads(path.read_text(encoding="utf-8")))
        except (OSError, ValueError, KeyError, TypeError) as fallback_error:
            raise RuntimeError("YouTube refresh failed and no valid saved feed is available") from fallback_error
        print(f"YouTube refresh failed: {error}. Keeping the saved feed.", file=sys.stderr)
        return False
    temporary = path.with_suffix(".json.tmp")
    try:
        temporary.write_text(json.dumps(feed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)
    print(f"Updated {len(feed['videos'])} long-form YouTube releases.")
    return True


if __name__ == "__main__":
    try:
        refresh()
    except (RuntimeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)

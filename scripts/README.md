# YouTube releases

The site shows the latest six public uploads from the ecnivs Videos tab, preserving YouTube's newest-first order. Shorts are excluded by selecting the Videos tab, rather than guessing from duration. A two-minute landscape video is still a regular release.

Install the metadata extractor with `python3 -m pip install -r scripts/requirements.txt`, then run `npm run refresh:videos`. This only fetches public metadata. No video downloads, API key, or browser-side proxy are needed. Local development and builds use the saved feed without requiring network access.

The existing GitHub Pages workflow refreshes releases before deployment and runs every six hours. Scheduled refreshes become active after the changes reach the repository's default branch. The workflow caches the last verified feed without creating commits. A failed refresh keeps that feed and emits a diagnostic. A missing or invalid fallback fails the refresh. The site directs visitors to the channel if the feed is more than 24 hours old.

Run `npm run test:videos`, `npm run lint`, and `npm run build` to verify changes. Keep the pinned extractor current when YouTube changes its metadata format.

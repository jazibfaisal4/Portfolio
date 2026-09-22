"""Public GitHub repos for the portfolio, cached in memory."""
from __future__ import annotations

import logging
import time
from typing import Any

import httpx

log = logging.getLogger("portfolio.github")

_TTL_SECONDS = 3600
_cache: dict[str, tuple[float, list[dict[str, Any]]]] = {}


async def fetch_repos(username: str, limit: int = 6) -> list[dict[str, Any]]:
    now = time.monotonic()
    cached = _cache.get(username)
    if cached and now - cached[0] < _TTL_SECONDS:
        return cached[1][:limit]
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(10.0)) as client:
            resp = await client.get(
                f"https://api.github.com/users/{username}/repos",
                params={"sort": "pushed", "per_page": 30},
                headers={
                    "Accept": "application/vnd.github+json",
                    "User-Agent": "portfolio-backend",
                },
            )
        resp.raise_for_status()
        repos = [
            {
                "name": r["name"],
                "description": r.get("description"),
                "language": r.get("language"),
                "url": r["html_url"],
                "stars": r.get("stargazers_count", 0),
                "pushed_at": r.get("pushed_at"),
            }
            for r in resp.json()
            if not r.get("fork") and not r.get("archived")
        ]
        _cache[username] = (now, repos)
        return repos[:limit]
    except (httpx.HTTPError, ValueError, KeyError) as exc:
        log.warning("GitHub fetch failed: %s", exc)
        return cached[1][:limit] if cached else []

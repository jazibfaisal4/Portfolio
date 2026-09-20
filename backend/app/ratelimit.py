"""In-memory sliding-window rate limiter.

Best effort only: state lives in one process, so it resets on restart and is
not shared between instances. Fine for a portfolio; use Redis for more.
"""
from __future__ import annotations

import threading
import time
from collections import deque


class SlidingWindowLimiter:
    def __init__(self, max_keys: int = 10_000) -> None:
        self._hits: dict[str, deque[float]] = {}
        self._lock = threading.Lock()
        self._max_keys = max_keys

    def check(
        self, key: str, limit: int, window_s: float, now: float | None = None
    ) -> tuple[bool, int]:
        """Record a hit if allowed. Returns (allowed, retry_after_seconds)."""
        now = time.monotonic() if now is None else now
        with self._lock:
            hits = self._hits.setdefault(key, deque())
            cutoff = now - window_s
            while hits and hits[0] <= cutoff:
                hits.popleft()
            if len(hits) >= limit:
                retry = int(hits[0] + window_s - now) + 1
                return False, max(retry, 1)
            hits.append(now)
            if len(self._hits) > self._max_keys:
                self._purge(cutoff)
            return True, 0

    def _purge(self, cutoff: float) -> None:
        for key in [k for k, v in self._hits.items() if not v or v[-1] <= cutoff]:
            del self._hits[key]

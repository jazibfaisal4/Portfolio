"""Repairs names that a model splits with stray whitespace while streaming.

Example: some models emit "Jaz" + special space + "ib". After character
normalization that shows as "Jaz ib". This holds back a small tail of the stream
so a term split across chunks can be joined before it is sent to the browser.
"""
from __future__ import annotations

import re

PROTECTED_TERMS = (
    "Jazib",
    "Faisal",
    "PureLogics",
    "LiveKit",
    "ElevenLabs",
    "PostgreSQL",
    "Whisper",
    "Sequelize",
)


def _compile(term: str) -> tuple[re.Pattern[str], str]:
    # Allow at most one stray space between any two letters of the term.
    body = " ?".join(re.escape(ch) for ch in term)
    return re.compile(rf"(?<![A-Za-z]){body}(?![A-Za-z])"), term


_PATTERNS = [_compile(t) for t in PROTECTED_TERMS]


def repair(text: str) -> str:
    for pattern, term in _PATTERNS:
        text = pattern.sub(term, text)
    return text


class StreamCleaner:
    """Feed raw pieces, emit repaired text. Call flush() when the stream ends."""

    def __init__(self, hold: int = 24) -> None:
        self._buf = ""
        self._hold = hold  # longer than any protected term plus its gaps

    def feed(self, piece: str) -> str:
        self._buf = repair(self._buf + piece)
        if len(self._buf) <= self._hold:
            return ""
        out, self._buf = self._buf[: -self._hold], self._buf[-self._hold :]
        return out

    def flush(self) -> str:
        out, self._buf = repair(self._buf), ""
        return out

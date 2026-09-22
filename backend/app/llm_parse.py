"""Parsing of provider streaming (SSE) lines. Pure functions, easy to test."""
from __future__ import annotations

import json
from typing import Any

# Some models emit typographic spaces, non-breaking hyphens and zero-width characters.
# Many fonts lack glyphs for them, so "January 2026" can render as "January2026".
# Normalize to plain ASCII equivalents before the text leaves the backend.
_TRANSLATE = {
    **dict.fromkeys(
        map(
            ord,
            "\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009"
            "\u200a\u202f\u205f\u3000",
        ),
        " ",
    ),
    0x2010: "-",
    0x2011: "-",
    **dict.fromkeys(map(ord, "\u200b\u2060\ufeff"), None),
}


def normalize_piece(text: str) -> str:
    return text.translate(_TRANSLATE)


def _payload(line: str) -> dict[str, Any] | None:
    line = line.strip()
    if not line.startswith("data:"):
        return None
    body = line[5:].strip()
    if not body or body == "[DONE]":
        return None
    try:
        obj = json.loads(body)
    except json.JSONDecodeError:
        return None
    return obj if isinstance(obj, dict) else None


def parse_gemini_sse_line(line: str) -> str | None:
    obj = _payload(line)
    if not obj:
        return None
    candidates = obj.get("candidates") or [{}]
    parts = ((candidates[0].get("content") or {}).get("parts")) or []
    text = "".join(
        p.get("text", "") for p in parts if isinstance(p, dict) and not p.get("thought")
    )
    text = normalize_piece(text)
    return text or None


def parse_openai_sse_line(line: str) -> str | None:
    obj = _payload(line)
    if not obj:
        return None
    choices = obj.get("choices") or [{}]
    text = (choices[0].get("delta") or {}).get("content")
    return normalize_piece(text) if text else None

"""Parsing of provider streaming (SSE) lines. Pure functions, easy to test."""
from __future__ import annotations

import json
from typing import Any


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
    return text or None


def parse_openai_sse_line(line: str) -> str | None:
    obj = _payload(line)
    if not obj:
        return None
    choices = obj.get("choices") or [{}]
    text = (choices[0].get("delta") or {}).get("content")
    return text or None

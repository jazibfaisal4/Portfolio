"""Input cleaning helpers."""
from __future__ import annotations

import re
from collections.abc import Mapping, Sequence
from typing import Any

_CONTROL = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
_SPACES = re.compile(r"[ \t]+")
_NEWLINES = re.compile(r"[\r\n]+")
_EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def clean_text(text: str | None, max_len: int) -> str:
    text = _CONTROL.sub("", text or "")
    text = _SPACES.sub(" ", text).strip()
    return text[:max_len]


def one_line(text: str | None, max_len: int) -> str:
    """Single-line text for email headers (blocks header injection)."""
    text = _NEWLINES.sub(" ", clean_text(text, max_len * 2))
    return text.strip()[:max_len]


def is_valid_email(value: str | None) -> bool:
    return bool(value and len(value) <= 200 and _EMAIL.match(value.strip()))


def sanitize_history(
    history: Sequence[Mapping[str, Any]] | None,
    max_items: int = 8,
    max_len: int = 500,
) -> list[dict[str, str]]:
    """Keep the last few user/assistant turns, cleaned and length-capped."""
    cleaned: list[dict[str, str]] = []
    for item in list(history or [])[-max_items:]:
        role = item.get("role")
        content = item.get("content")
        if role not in ("user", "assistant") or not isinstance(content, str):
            continue
        text = clean_text(content, max_len)
        if text:
            cleaned.append({"role": role, "content": text})
    while cleaned and cleaned[0]["role"] != "user":
        cleaned.pop(0)
    return cleaned


def client_ip(headers: Mapping[str, str], peer: str | None, trust_proxy: bool) -> str:
    if trust_proxy:
        forwarded = headers.get("x-forwarded-for", "")
        first = forwarded.split(",")[0].strip()
        if first:
            return first
    return peer or "unknown"

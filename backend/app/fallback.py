"""Answer used when no LLM is configured or the provider fails."""
from __future__ import annotations

from collections.abc import Sequence

from .knowledge import Chunk


def answer_from_chunks(results: Sequence[tuple[Chunk, float]], contact_email: str) -> str:
    if not results:
        return (
            "I don't have that in my notes about Jazib. "
            f"You can email him at {contact_email} and he'll reply."
        )
    top = results[0][0]
    text = f"{top.title}: {top.text}"
    related = [c.title for c, _ in results[1:3]]
    if related:
        text += "\n\nRelated: " + ", ".join(related) + "."
    return text

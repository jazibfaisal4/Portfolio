"""Knowledge chunks the assistant is allowed to answer from."""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

DEFAULT_PATH = Path(__file__).resolve().parent.parent / "data" / "knowledge.json"


@dataclass(frozen=True)
class Chunk:
    id: str
    title: str
    text: str
    tags: tuple[str, ...] = ()


def load_chunks(path: Path | str | None = None) -> list[Chunk]:
    raw = json.loads(Path(path or DEFAULT_PATH).read_text(encoding="utf-8"))
    chunks: list[Chunk] = []
    for item in raw:
        chunks.append(
            Chunk(
                id=str(item["id"]),
                title=str(item["title"]),
                text=str(item["text"]),
                tags=tuple(str(t) for t in item.get("tags", [])),
            )
        )
    return chunks

"""Small BM25 retriever over the knowledge chunks (no external calls)."""
from __future__ import annotations

import math
import re
from collections import Counter
from collections.abc import Sequence

from .knowledge import Chunk

K1 = 1.5
B = 0.75

_TOKEN = re.compile(r"[a-z0-9]+")
_STOP = frozenset(
    "a an and are as at be by can did do does for from has have how i in is it its "
    "me my of on or so tell that the their this to was we what when where which "
    "why will with you your about him his he jazib".split()
)

# Query expansion for common shorthand recruiters and visitors use.
SYNONYMS: dict[str, tuple[str, ...]] = {
    "who": ("about", "introduction"),
    "yourself": ("about", "introduction"),
    "introduce": ("about", "introduction"),
    "stt": ("speech", "text", "whisper"),
    "asr": ("speech", "whisper"),
    "tts": ("speech", "elevenlabs"),
    "voice": ("audio", "livekit"),
    "audio": ("voice", "livekit"),
    "db": ("database", "postgresql"),
    "sql": ("postgresql", "mysql"),
    "fyp": ("final", "year", "project"),
    "cv": ("resume",),
    "resume": ("cv",),
    "hire": ("open", "opportunities", "contact"),
    "hiring": ("open", "opportunities", "contact"),
    "job": ("open", "opportunities"),
    "available": ("open", "opportunities"),
    "availability": ("open", "opportunities"),
    "reach": ("contact", "email"),
    "email": ("contact",),
    "llm": ("language", "model"),
    "ml": ("machine", "learning"),
    "frontend": ("react", "next", "tailwind"),
    "backend": ("node", "express", "python", "postgresql"),
    "internship": ("trainee", "purelogics"),
    "experience": ("trainee", "purelogics"),
    "work": ("projects",),
    "open": ("opportunities", "hire", "contact", "availability"),
    "technologies": ("skills", "stack", "python"),
    "technology": ("skills", "stack", "python"),
    "tech": ("skills", "stack", "python"),
    "tools": ("skills", "stack"),
    "languages": ("skills", "python", "typescript"),
    "frameworks": ("skills", "react", "next"),
    "skills": ("stack", "python", "react"),
    "stack": ("skills",),
}


def _stem(token: str) -> str:
    if len(token) > 6 and token.endswith("ing"):
        token = token[:-3]
    elif len(token) > 5 and token.endswith("ed"):
        token = token[:-2]
    if len(token) > 3 and token.endswith("s") and not token.endswith("ss"):
        token = token[:-1]
    return token


def tokenize(text: str) -> list[str]:
    return [_stem(t) for t in _TOKEN.findall(text.lower()) if t not in _STOP]


def expand_query(query: str) -> list[str]:
    seen: dict[str, None] = {}
    for raw in _TOKEN.findall(query.lower()):
        if raw in _STOP:
            continue
        seen[_stem(raw)] = None
        for extra in SYNONYMS.get(raw, ()):
            seen[_stem(extra)] = None
    return list(seen)


class Index:
    def __init__(self, chunks: Sequence[Chunk]) -> None:
        self.chunks = list(chunks)
        # Title and tags are repeated so they weigh more than body text.
        self._docs = [
            tokenize(f"{c.title} {c.title} {' '.join(c.tags)} {' '.join(c.tags)} {c.text}")
            for c in self.chunks
        ]
        self._tf = [Counter(doc) for doc in self._docs]
        n = len(self._docs)
        self._avgdl = (sum(len(d) for d in self._docs) / n) if n else 1.0
        df: Counter[str] = Counter()
        for doc in self._docs:
            df.update(set(doc))
        self._idf = {
            term: math.log(1 + (n - count + 0.5) / (count + 0.5)) for term, count in df.items()
        }

    def get(self, ids: Sequence[str]) -> list[Chunk]:
        by_id = {c.id: c for c in self.chunks}
        return [by_id[i] for i in ids if i in by_id]

    def search(self, query: str, k: int = 4) -> list[tuple[Chunk, float]]:
        terms = expand_query(query)
        scored: list[tuple[float, int]] = []
        for i, tf in enumerate(self._tf):
            dl = len(self._docs[i])
            score = 0.0
            for term in terms:
                freq = tf.get(term, 0)
                if not freq:
                    continue
                norm = freq + K1 * (1 - B + B * dl / self._avgdl)
                score += self._idf.get(term, 0.0) * freq * (K1 + 1) / norm
            if score > 0:
                scored.append((score, i))
        scored.sort(reverse=True)
        return [(self.chunks[i], score) for score, i in scored[:k]]

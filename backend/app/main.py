"""FastAPI app: /api/chat (grounded, streaming), /api/contact."""
from __future__ import annotations

import json
import logging
import time
from collections.abc import AsyncIterator
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field

try:  # optional: loads backend/.env in development
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # pragma: no cover
    pass

from .config import load_settings
from .contact import ContactError, send_contact_email
from .fallback import answer_from_chunks
from .knowledge import load_chunks
from .llm import stream_answer
from .prompts import build_messages, build_system_prompt
from .ratelimit import SlidingWindowLimiter
from .retrieve import Index, expand_query
from .security import clean_text, client_ip, is_valid_email, one_line, sanitize_history

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("portfolio")

S = load_settings()
INDEX = Index(load_chunks())
LIMITER = SlidingWindowLimiter()
MAX_BODY_BYTES = 16 * 1024
EXPOSED = ["X-Sources", "X-Retrieval-Ms", "X-First-Token-Ms", "X-Mode"]

app = FastAPI(
    title="Jazib portfolio backend",
    docs_url=None if S.app_env == "production" else "/docs",
    redoc_url=None,
    openapi_url=None if S.app_env == "production" else "/openapi.json",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=S.allowed_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    expose_headers=EXPOSED,
    max_age=600,
)


@app.middleware("http")
async def limit_body_size(request: Request, call_next):
    length = request.headers.get("content-length")
    if length and length.isdigit() and int(length) > MAX_BODY_BYTES:
        return JSONResponse({"detail": "Request too large."}, status_code=413)
    return await call_next(request)


class HistoryItem(BaseModel):
    role: str = Field(max_length=16)
    content: str = Field(max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[HistoryItem] = Field(default_factory=list, max_length=20)


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(max_length=200)
    subject: str = Field(default="Portfolio inquiry", max_length=150)
    message: str = Field(min_length=10, max_length=4000)
    website: str = Field(default="", max_length=200)  # honeypot: humans leave it empty


def _ip(request: Request) -> str:
    peer = request.client.host if request.client else None
    return client_ip(request.headers, peer, S.trust_proxy)


def _limit(key: str, limit: int, window_s: float, message: str) -> None:
    ok, retry = LIMITER.check(key, limit, window_s)
    if not ok:
        raise HTTPException(429, message, headers={"Retry-After": str(retry)})


@app.get("/api/health")
@app.get("/health")
async def health() -> dict:
    return {
        "status": "ok",
        "llm_ready": S.llm_ready,
        "provider": S.llm_provider,
        "contact_ready": S.contact_ready,
        "chunks": len(INDEX.chunks),
    }


@app.post("/api/chat")
async def chat(req: ChatRequest, request: Request) -> StreamingResponse:
    started = time.perf_counter()
    ip = _ip(request)
    _limit(f"chat:{ip}", S.chat_per_min_per_ip, 60, "Too many questions. Try again in a minute.")
    _limit("chat:global", S.chat_per_min_global, 60, "The assistant is busy. Try again shortly.")

    message = clean_text(req.message, 500)
    if not message:
        raise HTTPException(400, "Please type a question.")
    history = sanitize_history([h.model_dump() for h in req.history])

    t0 = time.perf_counter()
    results = INDEX.search(message, k=4)
    if not results and not expand_query(message):
        # Only filler words (for example "hi"): show the basics instead of nothing.
        results = [(c, 0.0) for c in INDEX.get(["about", "contact"])]
    retrieval_ms = (time.perf_counter() - t0) * 1000
    chunks = [c for c, _ in results]

    llm_stream: AsyncIterator[str] | None = None
    first_piece: str | None = None
    first_token_ms: float | None = None
    if S.llm_ready:
        candidate = stream_answer(
            S, build_system_prompt(chunks), build_messages(history, message)
        ).__aiter__()
        try:
            first_piece = await candidate.__anext__()
            first_token_ms = (time.perf_counter() - started) * 1000
            llm_stream = candidate
        except StopAsyncIteration:
            log.warning("LLM returned no text; using fallback")
        except Exception:
            log.exception("LLM failed before first token; using fallback")
            await candidate.aclose()

    async def body() -> AsyncIterator[str]:
        if llm_stream is not None and first_piece is not None:
            yield first_piece
            try:
                async for piece in llm_stream:
                    yield piece
            except Exception:
                log.exception("LLM stream interrupted")
            return
        yield answer_from_chunks(results, S.public_email)

    headers = {
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        "X-Sources": quote(json.dumps([c.id for c in chunks])),
        "X-Retrieval-Ms": f"{retrieval_ms:.0f}",
        "X-Mode": "llm" if llm_stream is not None else "fallback",
    }
    if first_token_ms is not None:
        headers["X-First-Token-Ms"] = f"{first_token_ms:.0f}"
    return StreamingResponse(body(), media_type="text/plain; charset=utf-8", headers=headers)


@app.post("/api/contact")
async def contact(req: ContactRequest, request: Request) -> dict:
    if req.website.strip():  # honeypot tripped: pretend success
        return {"ok": True}
    _limit(
        f"contact:{_ip(request)}",
        S.contact_per_hour_per_ip,
        3600,
        "Too many messages. Please try again later.",
    )
    if not is_valid_email(req.email):
        raise HTTPException(422, "Please enter a valid email address.")
    name = one_line(req.name, 100)
    subject = one_line(req.subject, 150) or "Portfolio inquiry"
    message = clean_text(req.message, 4000)
    if not name or len(message) < 10:
        raise HTTPException(422, "Please add your name and a message of at least 10 characters.")
    if not S.contact_ready:
        raise HTTPException(503, f"The contact form isn't available. Please email {S.public_email}.")
    try:
        await send_contact_email(S, name, req.email.strip(), subject, message)
    except ContactError:
        raise HTTPException(502, f"Couldn't send your message. Please email {S.public_email}.")
    return {"ok": True}

"""Streaming adapters for Gemini and Groq (httpx, no vendor SDK)."""
from __future__ import annotations

import logging
from collections.abc import AsyncIterator

import httpx

from .config import Settings
from .llm_parse import parse_gemini_sse_line, parse_openai_sse_line

log = logging.getLogger("portfolio.llm")

_TIMEOUT = httpx.Timeout(30.0, connect=10.0)


class LLMError(Exception):
    """Provider failure. Details are logged, never sent to the client."""


async def stream_answer(
    settings: Settings, system: str, messages: list[dict[str, str]]
) -> AsyncIterator[str]:
    if settings.llm_provider == "gemini":
        async for piece in _stream_gemini(settings, system, messages):
            yield piece
    elif settings.llm_provider == "groq":
        async for piece in _stream_groq(settings, system, messages):
            yield piece
    else:
        raise LLMError(f"Unknown LLM_PROVIDER: {settings.llm_provider}")


async def _stream_gemini(
    settings: Settings, system: str, messages: list[dict[str, str]]
) -> AsyncIterator[str]:
    model = settings.ai_model.removeprefix("models/")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:streamGenerateContent"
    body = {
        "systemInstruction": {"parts": [{"text": system}]},
        "contents": [
            {
                "role": "model" if m["role"] == "assistant" else "user",
                "parts": [{"text": m["content"]}],
            }
            for m in messages
        ],
        "generationConfig": {
            "maxOutputTokens": settings.max_output_tokens,
            "temperature": 0.3,
        },
    }
    headers = {"x-goog-api-key": settings.gemini_api_key, "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        async with client.stream(
            "POST", url, params={"alt": "sse"}, headers=headers, json=body
        ) as resp:
            if resp.status_code != 200:
                detail = (await resp.aread())[:300]
                log.error("Gemini HTTP %s: %s", resp.status_code, detail)
                raise LLMError(f"Gemini HTTP {resp.status_code}")
            async for line in resp.aiter_lines():
                piece = parse_gemini_sse_line(line)
                if piece:
                    yield piece


async def _stream_groq(
    settings: Settings, system: str, messages: list[dict[str, str]]
) -> AsyncIterator[str]:
    body = {
        "model": settings.ai_model,
        "messages": [{"role": "system", "content": system}, *messages],
        "stream": True,
        "max_tokens": settings.max_output_tokens,
        "temperature": 0.3,
    }
    headers = {
        "Authorization": f"Bearer {settings.groq_api_key}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        async with client.stream(
            "POST",
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=body,
        ) as resp:
            if resp.status_code != 200:
                detail = (await resp.aread())[:300]
                log.error("Groq HTTP %s: %s", resp.status_code, detail)
                raise LLMError(f"Groq HTTP {resp.status_code}")
            async for line in resp.aiter_lines():
                piece = parse_openai_sse_line(line)
                if piece:
                    yield piece

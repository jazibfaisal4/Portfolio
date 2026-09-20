"""Contact form delivery through Resend's REST API."""
from __future__ import annotations

import logging

import httpx

from .config import Settings

log = logging.getLogger("portfolio.contact")


class ContactError(Exception):
    pass


async def send_contact_email(
    settings: Settings, name: str, email: str, subject: str, message: str
) -> None:
    payload = {
        "from": settings.contact_from_email,
        "to": [settings.contact_to_email],
        "reply_to": email,
        "subject": f"[Portfolio] {subject}",
        "text": f"From: {name} <{email}>\n\n{message}",
    }
    headers = {"Authorization": f"Bearer {settings.resend_api_key}"}
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(15.0)) as client:
            resp = await client.post("https://api.resend.com/emails", json=payload, headers=headers)
    except httpx.HTTPError as exc:
        log.error("Resend request failed: %s", exc)
        raise ContactError("network") from exc
    if resp.status_code >= 300:
        log.error("Resend HTTP %s: %s", resp.status_code, resp.text[:300])
        raise ContactError(f"resend {resp.status_code}")

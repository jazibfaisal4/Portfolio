"""Settings loaded from environment variables (stdlib only)."""
from __future__ import annotations

import os
from dataclasses import dataclass


def _int(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, default))
    except (TypeError, ValueError):
        return default


def _csv(name: str, default: str = "") -> list[str]:
    raw = os.environ.get(name, default)
    return [part.strip() for part in raw.split(",") if part.strip()]


@dataclass(frozen=True)
class Settings:
    app_env: str
    llm_provider: str  # "gemini" or "groq"
    ai_model: str
    gemini_api_key: str
    groq_api_key: str
    max_output_tokens: int
    resend_api_key: str
    contact_to_email: str
    contact_from_email: str
    public_email: str
    allowed_origins: list[str]
    chat_per_min_per_ip: int
    chat_per_min_global: int
    contact_per_hour_per_ip: int
    trust_proxy: bool

    @property
    def llm_ready(self) -> bool:
        if not self.ai_model:
            return False
        if self.llm_provider == "gemini":
            return bool(self.gemini_api_key)
        if self.llm_provider == "groq":
            return bool(self.groq_api_key)
        return False

    @property
    def contact_ready(self) -> bool:
        return bool(self.resend_api_key and self.contact_to_email)


def load_settings() -> Settings:
    return Settings(
        app_env=os.environ.get("APP_ENV", "development"),
        llm_provider=os.environ.get("LLM_PROVIDER", "gemini").strip().lower(),
        ai_model=os.environ.get("AI_MODEL", "").strip(),
        gemini_api_key=os.environ.get("GEMINI_API_KEY", "").strip(),
        groq_api_key=os.environ.get("GROQ_API_KEY", "").strip(),
        max_output_tokens=_int("MAX_OUTPUT_TOKENS", 800),
        resend_api_key=os.environ.get("RESEND_API_KEY", "").strip(),
        contact_to_email=os.environ.get("CONTACT_TO_EMAIL", "").strip(),
        contact_from_email=os.environ.get(
            "CONTACT_FROM_EMAIL", "Portfolio <onboarding@resend.dev>"
        ).strip(),
        public_email=os.environ.get("PUBLIC_EMAIL", "jazibfaisal66@gmail.com").strip(),
        allowed_origins=_csv("ALLOWED_ORIGINS", "http://localhost:3000"),
        chat_per_min_per_ip=_int("CHAT_PER_MIN_PER_IP", 10),
        chat_per_min_global=_int("CHAT_PER_MIN_GLOBAL", 60),
        contact_per_hour_per_ip=_int("CONTACT_PER_HOUR_PER_IP", 5),
        trust_proxy=os.environ.get("TRUST_PROXY", "1") not in ("0", "false", "False"),
    )

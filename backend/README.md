# Portfolio backend (FastAPI)

Small Python service behind the portfolio. It gives the site:

| Endpoint | What it does |
|---|---|
| `POST /api/chat` | Grounded assistant. Retrieves 4 chunks from `data/knowledge.json` (BM25), then streams an answer from Gemini or Groq. Falls back to a plain answer from the chunks if no key is set or the provider fails. |
| `POST /api/contact` | Contact form. Validates, honeypot, rate-limits, sends through Resend. |
| `GET /health` | Shows whether the LLM and contact form are configured. |

## Run locally (PowerShell)

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1      # if blocked: Set-ExecutionPolicy -Scope Process Bypass
pip install -r requirements.txt
copy .env.example .env             # then fill in keys
uvicorn app.main:app --reload --port 8000
```

Open http://127.0.0.1:8000/docs to try the endpoints. Check http://127.0.0.1:8000/health.
With no keys set, `/api/chat` still works in fallback mode (`X-Mode: fallback`).

Then run the frontend from the repo root with `npm run dev`. `next.config.ts` forwards `/api/chat`, `/api/contact` and `/api/health` to `BACKEND_URL` (default `http://127.0.0.1:8000`).

## Keys (both free tiers; check current terms)

- **AI:** create a key in Google AI Studio (`GEMINI_API_KEY`) or Groq (`GROQ_API_KEY`). Set `LLM_PROVIDER` and `AI_MODEL`. Pick the model ID from the provider's current model list; it is left empty on purpose so nothing here goes stale. If answers come back empty or cut short, raise `MAX_OUTPUT_TOKENS` (some models spend tokens on internal reasoning).
- **Contact:** Resend key (`RESEND_API_KEY`) and `CONTACT_TO_EMAIL` (your inbox). Check Resend's docs for sending from the test sender to your own address without a custom domain.

## Response headers of /api/chat (real telemetry for the UI)

`X-Sources` URL-encoded JSON list of chunk ids, `X-Retrieval-Ms`, `X-First-Token-Ms` (only in `llm` mode), `X-Mode` (`llm` or `fallback`). Show these instead of made-up numbers.

## Keep the knowledge honest

`data/knowledge.json` is the only thing the assistant may answer from. Update it whenever facts change. `tests/test_knowledge.py` fails if unverified claims (LangGraph, CrewAI, MCP, Cartesia, TopSkills, "Present", and so on) sneak in. Add a chunk only for things you can explain in an interview.

## Tests

```powershell
python -m unittest discover -s tests -t . -v
```

Covers retrieval, rate limiting, input cleaning, prompt building, provider stream parsing and the knowledge guard. The HTTP layer (FastAPI routes, Gemini/Groq/Resend calls) is not covered by tests: try each once against the real services after you add keys.

## Deploy

Frontend on Vercel, backend anywhere that runs a container or Python app. Options with a free tier (verify current terms and whether a card is required): Render (web service from this `backend` folder using the Dockerfile) or Hugging Face Spaces (Docker Space, set `PORT=7860`). Free instances usually sleep when idle, so the first chat after a quiet period can take a while. Then set:

- Backend env: everything from `.env.example`, plus `APP_ENV=production` and `ALLOWED_ORIGINS=https://<your-vercel-domain>` (only needed if you call the backend directly instead of through the Next rewrite).
- Vercel env: `BACKEND_URL=https://<your-backend-url>`.

Rate limits are per process and in memory: they reset on restart and are not shared between instances. `TRUST_PROXY=1` reads the visitor IP from `X-Forwarded-For`; confirm in your logs that it shows real visitor IPs and not your proxy's. The global cap (`CHAT_PER_MIN_GLOBAL`) protects your free AI quota either way.

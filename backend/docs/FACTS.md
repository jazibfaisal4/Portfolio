# FACTS: the only source for site copy

Every prompt points here. If a fact is not in this file, do not put it on the site. Leave `TODO(jazib)` and list it in the final report.

## Decisions (already filled in)

- BADGES: Library Management System gets "Final year project" (University of Education). The AI Interview System gets "PureLogics final project". Only one project may carry the words "final year".
- SHOW_UNVERIFIED: false
- LOCATION: Lahore, Pakistan
- OPEN_TO: AI/ML Engineer roles, entry level. Location: Lahore. Remote: TODO(jazib)
- UNIVERSITY / GRADUATION_YEAR: University of Education / 2026 (graduated)
- DEGREE: BSCS (TODO(jazib): confirm the exact degree title)
- BACKEND_FRAMEWORK_OF_INTERVIEW_SYSTEM: unknown, do not name one
- DASHBOARD_FRAMEWORK: unknown, do not name one

## Identity

- Name: Jazib Faisal
- Title: AI/ML developer and full-stack developer. Fresh BSCS graduate.
- Email: jazibfaisal66@gmail.com
- GitHub: https://github.com/jazibfaisal4
- LinkedIn: https://www.linkedin.com/in/jazib-faisal-5a8978322/
- Resume: /Jazib_Faisal_Resume.pdf (TODO(jazib): replace the file with the latest one)

## Approved copy (use as written, or shorter)

- Hero pill: "Open to AI/ML opportunities"
- Hero headline: "I build voice-first AI systems and the full-stack products around them."
- Hero subtext: "Fresh BSCS graduate. I'm building a real-time AI interview system: live audio over LiveKit, local Whisper speech-to-text and a recruiter dashboard."
- CTAs: "See my work", "Download resume"
- Contact heading: "Have a role or project in mind?"
- Contact subtext: "Send a message and I'll reply by email."
- Voice: first person on the site ("I built…"), plain verbs, no buzzwords, no "cutting-edge", no "passionate".

## Experience (verified)

- Python & AI/ML Developer Trainee, PureLogics, Lahore, Pakistan. Jun 2026 to Sep 2026 (completed).
- Highlights (use only these): Python, data analysis and ML model development with Pandas, NumPy and Scikit-Learn. Integrating AI endpoints into full-stack applications.
- Never write: "Present", "currently", "TopSkills", "3 months" as a label. Do not put "Bootcamp" in the job title. "Final-month project of my PureLogics training" is fine.

## Education (verified)

- BSCS, University of Education, 2026 (fresh graduate). Final year project: Library Management System.

## Flagship project (verified)

- Name: Adaptive Multimodal AI Interview & Candidate Assessment System
- Status: In progress. 3-person team project, my final-month project in the PureLogics training program (it is not my university final year project).
- My part: the real-time voice interview and the recruiter dashboard. Teammates: JD/CV eligibility matching, and interview question and assessment logic.
- Built and working: real-time audio over LiveKit; a LiveKit Agents worker with custom speech-to-text, LLM and text-to-speech stages; proactive greeting and first question; barge-in (the candidate can interrupt the AI), silence detection, noise suppression, voice-triggered interview end.
- Speech-to-text: OpenAI Whisper (small model), local, CPU. Free, no quota.
- Text-to-speech: ElevenLabs primary, local Meta MMS-TTS fallback.
- Why hybrid: the development laptop has no dedicated GPU, so cloud plus local.
- Language decision: planned Roman Urdu; with the supervisor's approval the whole pipeline moved to English because speech recognition garbled mixed English and Roman Urdu technical terms.
- Data: voice sessions link to real candidate application records. Completed interviews are saved as evaluated results in PostgreSQL (Alembic migrations). Idempotent, eligible candidates only.
- Recruiter dashboard: in progress.
- Stack tags: LiveKit, LiveKit Agents, Whisper, ElevenLabs, PostgreSQL, Alembic, Python.
- Media: TODO(jazib) screenshots (voice screen, dashboard) and an optional 30 to 60 second demo video.
- Never write: latency numbers, "sub-second", "production", "live system", "deployed", Cartesia, GPT-4o, Gemini as the interview model, Pipecat as the current orchestrator.

## Pipeline nodes (hero diagram, all verified)

1. Candidate voice: browser microphone audio streams to the agent in real time over LiveKit. Tags: LiveKit.
2. Speech to text: Whisper (small model) runs locally on CPU. Tags: Whisper, Hugging Face Transformers, Python.
3. Interview logic: a LiveKit Agents worker runs the live conversation (greeting, barge-in, silence detection, ending on voice). Questions and scoring come from services my teammates built. Tags: LiveKit Agents, Python.
4. Text to speech: ElevenLabs is the main voice, with a local Meta MMS-TTS fallback. Tags: ElevenLabs, Meta MMS-TTS.
5. Storage: completed interviews are saved to PostgreSQL and linked to real candidate applications. Tags: PostgreSQL, Alembic.
6. Recruiter dashboard: recruiters review candidates and results. Status: in progress. Tags: none until the framework is confirmed.

## Simulator transcript (label it "Illustrative simulation", no model or latency claims)

- Interviewer: "Tell me about a time you traded speed for accuracy."
- Candidate: "In our voice pipeline I chose local Whisper over a cloud API. It's free and has no quota, but it's slower on a CPU."
- Adaptive follow-up: "What would you change if you had a GPU?"

## Other projects (verified)

- Library Management System, Quaid-e-Azam Library. Native Electron.js desktop app: React.js, Node.js, Express.js, MySQL with Sequelize ORM. Real-time automated book tracking, secure database architecture, native desktop integration. Jan 2026 to Aug 2026. Status: Completed. This was my university final year project (University of Education). Media: TODO(jazib) screenshots. Never write "Deployed" or "SQLite".
- Apple 3D Website: immersive 3D product showcase (Three.js, Framer Motion, Tailwind). Live: https://i-phone-3-d-website-omega.vercel.app/
- Brainwave AI UI: futuristic AI landing page (React, Tailwind, Framer Motion). Live: https://brain-wave-1ymq.vercel.app/

## Skills (verified)

- AI/ML and data: Python, Pandas, NumPy, Scikit-Learn, data analysis, ML model development, Hugging Face Transformers (Whisper).
- Voice AI: LiveKit, LiveKit Agents, Whisper, ElevenLabs.
- Full-stack: Next.js (App Router), React.js, TypeScript, Tailwind CSS, Framer Motion, Zustand.
- Backend and data: Node.js, Express.js, PostgreSQL, MySQL, Sequelize ORM, Prisma, Supabase, REST APIs, Alembic.
- Desktop: Electron.js, desktop UX patterns, state management, offline-first thinking.
- One-line "what I used it for" for each skill must come from the projects above. If there is none, leave the line out.

## UNVERIFIED (store with verified: false, never render while SHOW_UNVERIFIED is false)

PyTorch, LangGraph, CrewAI, MCP, NeMo Guardrails, Chroma, Qdrant, FAISS, advanced RAG, Stable Diffusion, the "Specialized AI Systems" cards (RAG document engine, multi-agent research coordinator, fine-tuned BERT classifier), the repos `voice-eval-interviewer` and `langgraph-multi-agent-researcher`, "Gemini Flash / GPT-4o", Cartesia, FastAPI for the interview system.

## Site-wide honesty rules

- No invented numbers: no latency, memory, cosine score, uptime, version strings, contribution counts.
- Any number shown must be measured live by the site (assistant retrieval time, time to first token) or come from this file.
- Simulators and animated flows are labeled "Illustrative".
- "Updated <Month Year>" in the footer comes from a constant, never a claim of verification.

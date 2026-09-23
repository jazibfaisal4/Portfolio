# DESIGN: flagship portfolio spec

Reference: the PNG exports of Portfolio-UI.pdf in `design-reference/`. Match its look (dark, grid background, mint accent, mono data labels, glass nav, bordered cards). Where this file and the images disagree, this file wins. Content comes only from `docs/FACTS.md`.

## Corrections to the reference

- Remove every invented number (latency, cosine, memory, versions, "active pipelines", contribution graph).
- Mono labels: at least 12px, at least 4.5:1 contrast, and ALL-CAPS only for tags of three words or fewer. Headings and body are sentence case.
- No section index numbers; headings only.
- The AI console is real (see P8). Do not call it a "simulator" or "synthetic".
- No "Secure dispatch", "TLS 1.3 encrypted", "Verified 2026" or version strings.
- Icons in the nav that do nothing are removed.

## Code structure

```
src/
  app/            layout.tsx, page.tsx, not-found.tsx, opengraph-image.tsx, robots.ts, sitemap.ts, globals.css
  components/
    ui/           Container, Section, SectionHeader, Button, Chip, Card, MediaFrame, TagList
    layout/       Navbar, MobileMenu, Footer, Providers, SmoothScroll, ScrollProgress
    motion/       Reveal, Stagger, Magnetic
    sections/     Hero, About, Skills, Projects, AiLab, Experience, Contact
    hero/         PipelineDiagram, PipelineNode, NodePanel, PipelineList
    ai/           AssistantProvider, ChatPanel, ChatMessage, SourceChips, Launcher, MobileSheet
  constants/      profile, pipelineNodes, skills, projects, experience, education, navLinks (re-exported by index.ts)
  hooks/          usePointerFine, useMounted
  lib/            motion.ts, api.ts, cn.ts
```

Prefer CSS breakpoints for layout. Use JS media queries only after mount, with a stable server default, so there is no hydration mismatch.

## Tokens

Sample real values from the reference images. Names:

`bg`, `surface`, `surface-2`, `line`, `text`, `text-dim`, `accent` (mint), `accent-2` (cyan), `live` (used only for small live/status dots), `focus`.

- Every text and background pair passes 4.5:1. Record the ratios in `docs/TOKENS.md`.
- Radii: match the reference (about 8 to 12px on cards, 8px on controls, full on chips). Never above 16px.
- Background: fixed subtle grid plus one soft radial glow, pure CSS, no animation.

## Type scale

| Role | Size | Notes |
|---|---|---|
| display (h1) | clamp(2.25rem, 6.5vw, 4.25rem) | line-height 1.05, tracking -0.03em, `text-balance` |
| h2 | clamp(1.75rem, 4vw, 2.75rem) | line-height 1.1 |
| h3 | 1.25 to 1.5rem | |
| body | 1rem (1.0625rem from lg) | line-height 1.65, max width 68ch |
| small | 0.875rem | |
| label (mono) | 0.75rem minimum | short tags only |

Two families: a geometric sans and a mono, the closest Google fonts to the reference, loaded with `next/font`, `display: swap`, subsets only.

## Layout

- Container: max width 1200px, padding 20px (mobile), 32px (tablet), 40px (desktop).
- Section padding (top and bottom): 64px, 96px, 128px. Grid gaps: 16px, 24px.
- `scroll-margin-top` on every section equals the nav height plus 16px.
- Breakpoints: sm 640, md 768, lg 1024, xl 1280. Never a horizontal scroll at any width from 320px up. Content is capped at 1200px on 1920px screens.

## Sections and responsive behavior

Order and nav links: Home, About, Skills, Projects, AI Lab, Experience, Contact.

| Section | Desktop (1024+) | Tablet (768 to 1023) | Mobile (under 768) |
|---|---|---|---|
| Hero | 2 columns: copy 55%, pipeline diagram 45%. Height about 100dvh minus nav. | Stacked: copy, then diagram as a 2 by 3 grid. | Stacked: copy, then vertical node list. Auto height. Buttons full width. |
| About | Heading left, statement (max 90 words) right, then a row of 3 facts (Fresh BSCS graduate, PureLogics trainee 2026, Built the AI interview system in a team of 3). | Same, facts wrap to 3 cards. | Single column, facts stacked. |
| Skills | Filter tabs (All, AI & ML, Voice AI, Full-stack, Data & backend). 4-column tiles. | 3 columns. | Tabs scroll horizontally with snap. 2 columns. |
| Projects | Flagship card full width: copy and pipeline strip left, "Illustrative simulation" right. Other projects in 3 columns. | Flagship stacked. Others 2 columns. | Everything single column. Simulator is transcript only with a small waveform. Long text expands on tap. |
| AI Lab | Centered console, max width 880px. | Full width. | Full width, height 70dvh, sticky input. The floating launcher opens the same chat as a bottom sheet. |
| Experience | Two columns: experience timeline and education. | Same two columns. | One column. |
| Contact | 2 columns: links and CV card left, form right. | Stacked. | Stacked, inputs full width. |
| Footer | 3 columns. | 2 columns. | 1 column. |

Navbar: desktop is sticky, glass blur that strengthens after 8px of scroll, active-section link with a sliding underline, Resume button. Mobile is a slim top bar (logo, Resume, 44px menu button) opening a full-screen sheet with 48px links, focus trap, Esc to close, body scroll lock, safe-area padding. A 2px scroll progress bar sits under the nav.

## Hero pipeline diagram (interactive AI nodes)

Six nodes from `FACTS.md`, connected by edges.

- Desktop and tablet: nodes are buttons in an SVG/CSS diagram. Hover or keyboard focus highlights the node and its edges and dims the rest (200ms). Arrow keys move focus. Click or Enter opens the detail panel beside the diagram (what I built, tags, status). Esc closes. `aria-pressed` on the active node.
- "Trace a request": one pulse travels the edges node by node (about 3s), labeled "Illustrative flow". With reduced motion it steps through the same nodes as text with no movement.
- Idle: one slow pulse every 8s, paused when off-screen or when the tab is hidden.
- Mobile: a vertical list of the six nodes joined by one thin line. Tap expands the node inline (accordion, one open at a time). "Trace a request" sends a single pulse down the line. No canvas, no parallax.
- The status of node 6 reads "In progress". Nothing on the diagram shows numbers.

## Motion system

Tokens (in `lib/motion.ts`): fast 160ms, base 320ms, slow 640ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`, stagger 60ms, magnetic spring (stiffness 200, damping 18), magnetic pull max 8px.

| Element | Trigger | Effect | Touch devices | Reduced motion |
|---|---|---|---|---|
| Hero entrance | Page load | One 600ms sequence: pill, headline, subtext, CTAs, diagram nodes (60ms stagger) | Same | Final state at once |
| Section headers | Enter view (once) | Fade plus 16px rise | Same | None |
| Card groups | Enter view (once) | Stagger children 60ms, max 12 items per group | Same | None |
| Cards | Hover | Border shifts toward accent, 2px lift, 160ms | Disabled (hover: hover only) | Color change only |
| Primary buttons | Pointer move | Magnetic pull | Disabled (fine pointer only) | Disabled |
| Buttons | Press | Scale 0.98 | Same | None |
| Nav | Scroll | Active underline slides, blur strengthens | Same | Instant |
| Skills filter | Tab change | Layout animation 200ms | Same | None |
| Pipeline | Hover, focus, click, trace | See above | Tap and trace only | Static |
| Waveform | Visible | 24 bars with `scaleY` keyframes | Small, fewer bars | Static bars |
| Chat messages | Appear | Fade 160ms. Streaming text is not animated. | Same | None |
| Smooth scroll | Wheel | Lenis, lerp about 0.1 | Native scrolling | Native scrolling |

Rules: animate only `transform` and `opacity`. Reveal each thing once. No looping decoration except the hero idle pulse and the waveform, and both pause when off-screen. Anchor links use Lenis `scrollTo` with the nav offset when smooth scroll is active, otherwise CSS smooth scrolling. Nested scroll areas (chat messages, mobile menu, code blocks) get `data-lenis-prevent`.

## Responsive and touch rules

- Test widths: 360, 390, 430, 768, 820, 1024, 1280, 1440, 1920. Also mobile landscape.
- All hover styles inside `@media (hover: hover)`. No sticky hover on touch.
- Tap targets at least 44px. Inputs use 16px font (no iOS zoom).
- Use `dvh`, and `env(safe-area-inset-*)` on fixed elements. The keyboard must never cover a chat or form input.
- Images use `next/image` with `sizes`. Videos are lazy with a poster and never autoplay with sound.

## Accessibility

Semantic landmarks, one h1, ordered headings, skip link, visible `:focus-visible` rings, `aria-live="polite"` for chat and node panels, tabs with `role="tablist"` and arrow keys, menu focus trap, alt text on all images, `prefers-reduced-motion` fully respected (content is complete without any animation).

## Performance

Lighthouse mobile 90+ in every category. LCP under 2.5s, CLS under 0.1. Lazy-load with `next/dynamic`: the AI Lab, the simulator, the mobile menu. No canvas or WebGL. Two font families only. Images WebP under 150KB.

## States

- Chat: empty state with 4 suggested questions, plain-language errors (429: "Too many questions. Try again in a minute."), a Stop button while streaming.
- Contact: loading, success, error, and a `mailto:` fallback link.
- Missing images: `MediaFrame` shows a styled "Screenshot coming soon" frame, never a broken image.

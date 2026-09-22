# TOKENS

Sampled from `design-reference/` screenshots (Stitch chrome ignored). CSS variables live in `src/app/globals.css` and are mapped in `tailwind.config.ts`.

## Color

| Token | Hex | Use |
|---|---|---|
| `bg` | `#12181D` | Page field, primary button label |
| `surface` | `#191C21` | Cards and tiles |
| `surface-2` | `#1F2227` | Raised panels, secondary button fill |
| `line` | `#2E343A` | Grid, decorative dividers, default card borders |
| `line-strong` | `#5F7078` | Input borders, secondary button borders |
| `text` | `#E8E6EE` | Headings and primary copy |
| `text-dim` | `#9AAEB4` | Intro, secondary copy |
| `accent` | `#1AD9C5` | Mint: primary fill, tags, hover on ghost |
| `accent-2` | `#06DCE4` | Cyan: highlight words, primary hover fill |
| `live` | `#4EDEA3` | Status dots only — never text |
| `focus` | `#06DCE4` | `:focus-visible` ring |

Radii: 8px controls, 12px cards, full chips, never above 16px.

## Text on background (WCAG 2.1 AA, 4.5:1)

| Foreground | on `bg` | on `surface` | on `surface-2` |
|---|---|---|---|
| `text` | 14.47 | 13.82 | 12.90 |
| `text-dim` | 7.74 | 7.39 | 6.90 |
| `accent` | 10.03 | 9.58 | 8.95 |
| `accent-2` / `focus` | 10.53 | 10.06 | 9.39 |

Primary button: `accent` fill with `bg` label is the same pair as `accent` on `bg` (**10.03:1**). Hover fill `accent-2` with `bg` label is **10.53:1**.

## Non-text tokens

These are not text colors. Ratios are recorded so they are not used as copy by mistake.

| Token | on `bg` | on `surface` | on `surface-2` | Notes |
|---|---|---|---|---|
| `line` | 1.38 | 1.32 | 1.23 | Decorative only |
| `line-strong` | 3.47 | 3.32 | 3.10 | Borders only; below 4.5:1 so never text |
| `surface-2` on `bg` | 1.12 | — | — | Too low for a fill that must read as a control; do not use as a primary button |
| `live` on `bg` | 10.48 | 10.01 | 9.19 | Passes 4.5:1 but still dots-only |

## Type

| Class | Size | Notes |
|---|---|---|
| `text-display` | `clamp(2.25rem, 6.5vw, 4.25rem)` | lh 1.05, tracking -0.03em, `text-wrap: balance` |
| `text-h2` | `clamp(1.75rem, 4vw, 2.75rem)` | lh 1.1 |
| `text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | |
| `text-body` | 1rem (1.0625rem from `lg`) | lh 1.65, max-width 68ch |
| `text-small` | 0.875rem | |
| `text-label` | 0.75rem (12px) | JetBrains Mono; no forced uppercase |

Fonts: Plus Jakarta Sans (`--font-sans`), JetBrains Mono (`--font-mono`).

## Pre-deploy checklist

- [ ] Delete `src/app/design` before deploy. The production `notFound()` guard is not a substitute; the route must not ship.
- [ ] Confirm `/design` is gone from the production sitemap and is not linked in the navbar.
- [ ] No Boutique Studio tokens remain in `tailwind.config.ts` or `globals.css`.
- [ ] No ad-hoc hex colors in components; only token names.
- [ ] `npm run lint` and `npm run build` are clean.

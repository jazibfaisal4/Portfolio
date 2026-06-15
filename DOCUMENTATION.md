# Portfolio Handover Documentation

## 1) Project Overview

This project is a premium personal portfolio for **Jazib Faisal** built with a "Boutique Studio" design direction: dark editorial surfaces, asymmetric Bento composition, glassmorphism accents, and motion-first interactions.

### Tech stack

- **Framework:** Next.js App Router (project currently uses `next@16.x`, architecture is aligned with Next.js 14/15 App Router patterns)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with a custom design-token theme
- **Animation:** Framer Motion (page entrance, in-view reveals, staggered text, magnetic interactions, hover tilt)
- **Assets:** Static files from `public/` and `public/assets/`

### Design goals ("Boutique Studio")

- High-contrast dark visual hierarchy
- "No-line" sectioning through tonal surfaces rather than heavy borders
- Bento grid for technical storytelling (Web vs Desktop specialization)
- Subtle, premium interaction feedback (spring movement, magnetic hover, glass depth)

---

## 2) File Structure Map

```text
Portfolio-Jazib/
├─ public/
│  ├─ Jazib_Faisal_Resume.pdf
│  └─ assets/
│     ├─ apple-3d-website.png
│     ├─ brainwave-ai-ui.png
│     └─ lms-placeholder.svg
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ Contact.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Magnetic.tsx
│  │  ├─ MobileDock.tsx
│  │  ├─ motion.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ PageTransition.tsx
│  │  ├─ Projects.tsx
│  │  └─ Skills.tsx
│  └─ constants/
│     └─ index.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

### Folder purpose

- `src/app`: App Router entry points, metadata, global CSS, page composition.
- `src/components`: Modular UI sections + reusable motion helpers.
- `src/constants`: Centralized content/config (profile text, social links, project data, stack labels).
- `public/assets`: Project images and fallback graphics used by `next/image`.
- `public/`: Direct static files (resume PDF).

---

## 3) Core Component Breakdown

## 3.1 Bento Grid construction (Tailwind Grid)

The Bento sections are primarily implemented in `src/components/Skills.tsx` using responsive grid classes:

- Outer grid: `grid grid-cols-1 md:grid-cols-12 gap-6`
- Card spans:
  - Web Engineering: `md:col-span-7`
  - Desktop Architecture: `md:col-span-5`
- Stack area uses a separate responsive matrix:
  - `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5`

This gives a single-column mobile flow and a multi-column editorial layout on tablet/desktop.

## 3.2 Project cards and constants-driven content

`src/components/Projects.tsx` reads project data from `src/constants/index.ts`:

- `featuredProjects[0..1]` render as standard cards
- `featuredProjects[2]` renders as the larger FYP highlight row
- Each object includes `name`, `description`, `link`, `stack`, `status`, `image`, `imageAlt`

Example mapping:

```ts
const fyp = featuredProjects[2];
const regularProjects = featuredProjects.slice(0, 2);
```

`next/image` is used with `fill` + `sizes` to prevent layout shifts and optimize loading.

## 3.3 Framer Motion implementation

Motion is structured in two layers:

1. **Reusable reveal primitives** in `src/components/motion.tsx`
   - `Reveal`: fade/slide in with spring transition
   - `Stagger`: parent stagger container using `whileInView`
   - `StaggerItem`: child reveal item
2. **Section-specific interactions**
   - Hero split/stagger text animation in `Hero.tsx`
   - Scroll reveals for sections/cards via `whileInView` + `viewport={{ once: true }}`
   - Hover tilt/scale in Bento and project cards
   - Magnetic cursor-follow wrapper in `Magnetic.tsx`
   - Page-load entrance in `PageTransition.tsx`

Example reveal pattern:

```tsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
>
```

---

## 4) Key Logic Notes

## 4.1 Resume link behavior

In `src/components/Navbar.tsx`, the Resume CTA points to the PDF in `public/`:

```tsx
<motion.a
  href="/Jazib_Faisal_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
>
  Resume
</motion.a>
```

- Opens in a new tab
- Uses safe external-link attributes

## 4.2 Gmail link behavior

In `src/components/Contact.tsx`:

```tsx
href="mailto:jazibfaisal66@gmail.com?subject=Inquiry%20from%20Portfolio"
```

- Opens default mail client
- Prefills subject line

## 4.3 Responsive strategy

The codebase follows Tailwind mobile-first breakpoints:

- Base: mobile defaults (`<640px`)
- `sm:` `>=640px`
- `md:` `>=768px`
- `lg:` `>=1024px`

Examples:

- Navbar menu hidden on mobile, shown at `md`
- Project/Bento grids expand at `md` and `lg`
- Spacing/typography scale up with `sm`, `md`, `lg` modifiers

---

## 5) Styling System Notes

`tailwind.config.ts` defines the design system from the Stitch concept:

- Surface layers (`surface`, `surface-container-low`, `surface-container-high`, etc.)
- Accent colors (`primary-container`, `primary`)
- Editorial typography:
  - `font-headline`: Space Grotesk
  - `font-body` / `font-label`: Inter
- Premium effects:
  - `shadow-glass`
  - `shadow-electric-glow`
  - `backdrop-blur-glass`, `backdrop-blur-dock`

Global base rules live in `src/app/globals.css` (dark background, text color, `bento-glow` utility).

---

## 6) Deployment & Maintenance

## 6.1 Updating portfolio content

Primary content source: `src/constants/index.ts`

Update these sections to maintain the site:

- `personalInfo`: name, title, intro, focus
- `socials`: GitHub/LinkedIn links
- `featuredProjects`: card text, links, stack tags, image path, alt text
- `skillGroups`: web/desktop skill chips

When adding a project image:

1. Place file in `public/assets/`
2. Set `image: "/assets/your-file-name.ext"` in constants
3. Add descriptive `imageAlt`

## 6.2 Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## 6.3 Vercel deployment flow

This is a standard Next.js static/server-render capable app:

1. Push repository to Git provider
2. Import project in Vercel
3. Build command: `npm run build`
4. Output handled automatically by Next.js integration

Recommended pre-deploy check: run `npm run lint && npm run build` locally.

---

## 7) Handover Notes

- Architecture is intentionally **content-driven** (`constants`) and **componentized** (`src/components`) for fast iteration.
- Motion is centralized through reusable wrappers so behavior can be tuned globally.
- Asset paths are normalized to `public/assets` to avoid import ambiguity.
- Resume and contact flows are production-ready via direct PDF + mailto handling.

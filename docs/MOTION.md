# MOTION

Tokens: `src/lib/motion.ts`. Animate only `transform` and `opacity`. Reveal once. No looping decoration except the hero idle pulse and the waveform (pause both off-screen).

## Tokens

- Duration: fast 160ms, base 320ms, slow 640ms, hero 600ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger: 60ms, max 12 children per group
- Magnetic: spring stiffness 200, damping 18, max pull 8px

## Components

- `Reveal`: fade + 16px rise, `viewport.once`, margin `-10%`
- `Stagger` / `StaggerItem`: 60ms stagger, same reveal
- `Magnetic`: fine pointer only (`(hover: hover) and (pointer: fine)`). Off for reduced motion. Springs back on leave.

JS media queries run after mount. Server default for `usePointerFine` is `false`. Hover styles stay in `@media (hover: hover)` / `hover-ok:`. Tap targets 44px.

## Smooth scroll

Lenis (`lerp` 0.1) only when the pointer is fine **and** the user has not requested reduced motion. Touch keeps native scrolling. `scrollTo(target, offset)` uses Lenis when active, otherwise CSS smooth (instant if reduced). Default offset is `-1 * --section-offset`. Call `setSmoothScrollPaused(true)` while the mobile menu is open.

Nested scroll (chat messages, mobile menu, code blocks) **must** set `data-lenis-prevent` so Lenis ignores wheel/touch inside that node.

## Late-mount content

Content that mounts after page load (tab switches, expanded panels, chat messages) must animate with `animate=`, or be remounted with a `key`. Never rely on `whileInView` for content that mounts late.

## Reduced motion

`MotionConfig reducedMotion="user"`. Global CSS removes keyframes and sets `transition-duration: 0.01ms`. Color/border changes still apply. Content is complete with no animation. Hero lands on its final state at once.

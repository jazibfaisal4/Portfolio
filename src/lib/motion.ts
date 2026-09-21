export const durationMs = {
  fast: 160,
  base: 320,
  slow: 640,
  hero: 600,
} as const;

export const duration = {
  fast: durationMs.fast / 1000,
  base: durationMs.base / 1000,
  slow: durationMs.slow / 1000,
  hero: durationMs.hero / 1000,
} as const;

export const easing = [0.16, 1, 0.3, 1] as const;

export const easingCss = "cubic-bezier(0.16, 1, 0.3, 1)";

export const staggerDelay = 0.06;

export const staggerMaxItems = 12;

export const magneticSpring = {
  stiffness: 200,
  damping: 18,
} as const;

export const magneticPullMax = 8;

export const revealOffset = 16;

export const revealViewport = {
  once: true,
  margin: "-10%",
} as const;

export const lenisLerp = 0.1;

export const tween = {
  fast: { duration: duration.fast, ease: easing },
  base: { duration: duration.base, ease: easing },
  slow: { duration: duration.slow, ease: easing },
  hero: { duration: duration.hero, ease: easing },
} as const;

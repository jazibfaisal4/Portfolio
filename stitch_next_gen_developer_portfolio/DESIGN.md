# Design System Document

## 1. Overview & Creative North Star: "The Digital Architect"
The design system is a high-end, editorial-inspired framework crafted for a sophisticated technical portfolio. Moving away from the "template-heavy" look of typical developer sites, this system adopts the **Creative North Star: The Digital Architect.** 

The aesthetic represents the intersection of robust engineering (Electron.js/Next.js) and boutique design. It utilizes a **Bento Grid** philosophy—organizing complex data into clean, compartmentalized "cells"—but disrupts the rigidity through intentional asymmetry, overlapping glass layers, and high-contrast typography scales. The goal is to make code feel like a premium physical product.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones, punctuated by the high-energy "Electric Blue" to signify technical precision.

### Surface Hierarchy & Nesting
To achieve depth without clutter, we utilize a "Nested Surface" logic. Instead of drawing boxes, we shift the environment.
- **Base Layer:** `surface` (#131313) for the main viewport.
- **Sectional Layer:** `surface-container-low` (#1c1b1b) for major content areas.
- **Component Layer:** `surface-container-high` (#2a2a2a) for bento grid cells and cards.
- **Elevated Layer:** `surface-container-highest` (#353534) for interactive elements or modals.

### The Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` card sitting on a `surface` background creates a natural edge through tonal contrast alone.
*   **The "Glass & Gradient" Rule:** Floating elements (modals, navigation bars, or hover-state cards) must use Glassmorphism. Apply `surface-container-high` at 60% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Use a linear gradient from `primary_container` (#0070F3) to `primary` (#AEC6FF) at a 45-degree angle for primary CTA backgrounds to provide a "glow" that feels liquid rather than flat.

---

## 3. Typography
The typography system relies on the tension between the technical precision of **Space Grotesk** and the neutral readability of **Inter**.

*   **Display & Headlines (Space Grotesk):** Use `display-lg` and `headline-lg` to create editorial impact. These should be treated as graphic elements. Tighten letter-spacing by -2% for a "locked-in" professional feel.
*   **Body & Labels (Inter):** Use `body-md` for general content. The contrast between the bold, wide headings and the clean, tall x-height of Inter conveys an image of a "Specialist"—someone who understands both the big picture and the minute details.
*   **Brand Voice:** Headlines should use `on_surface` (#E5E2E1), while secondary descriptions should drop to `on_surface_variant` (#C1C6D7) to maintain a clear visual hierarchy.

---

## 4. Elevation & Depth
Depth is not an effect; it is a structural necessity.

*   **The Layering Principle:** Stack `surface-container` tiers. Place a `surface-container-lowest` card inside a `surface-container-low` section to create a "recessed" look, or vice-versa to create "lift."
*   **Ambient Shadows:** For floating glass elements, use a shadow with a blur radius of `40px`, spread of `-10px`, and an opacity of `8%`. The shadow color must be derived from `primary_container` (blue-tinted) rather than pure black to simulate the way light travels through a glass interface.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border": `outline-variant` (#414754) at 15% opacity. It should be felt, not seen.
*   **Glow Effects:** Use blurred radial gradients of `primary_container` in the background (behind the Bento Grid) to create a sense of "system energy" emanating from behind the content.

---

## 5. Components

### Bento Grid Cells (Cards)
*   **Style:** No borders. Use `surface-container-low`.
*   **Corner Radius:** `xl` (0.75rem) for the outer grid, `lg` (0.5rem) for nested elements.
*   **Interaction:** On hover, shift background to `surface-container-high` and apply a subtle `primary` outer glow.

### Buttons
*   **Primary:** `primary_container` background with `on_primary_container` text. Roundedness: `full`.
*   **Secondary:** `surface-container-highest` background with `on_surface` text.
*   **Tertiary:** Transparent background, `primary` text, no border. On hover, apply a `surface-variant` background at 30% opacity.

### Chips (Tech Stack Tags)
*   **Style:** `surface-container-highest` with a `Ghost Border`. 
*   **Text:** `label-md` using `secondary` (#B9C8DE).
*   **Shape:** `full` (pill shape).

### Input Fields
*   **Style:** `surface-container-lowest` background. 
*   **Focus State:** The "Ghost Border" becomes 100% opaque `primary` with a `2px` outer glow.

### Custom Component: The "Electron Dock"
Since the portfolio specializes in Electron.js, design a navigation dock that mimics a desktop OS. 
*   **Visuals:** Glassmorphic (`surface-container-high` at 50% opacity, 30px blur).
*   **Shape:** `xl` roundedness. 
*   **Placement:** Fixed bottom-center.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use vertical white space (from the Spacing Scale) to separate thoughts.
*   **Do** overlap elements. Let a glass "Project Card" slightly overlap a large "Display" heading to create an editorial, layered feel.
*   **Do** use the `primary` color sparingly. It is "Electric"—it should feel like a spark, not a flood.

### Don't:
*   **Don't** use dividers or horizontal rules. If you need a line, use a 10% opacity `outline-variant` that doesn't touch the edges of the container.
*   **Don't** use pure black (#000000). The `surface-container-lowest` (#0E0E0E) provides more depth and allows for "recessed" layering.
*   **Don't** use standard "drop shadows." If the element isn't floating, it doesn't need a shadow; it needs a tonal shift.
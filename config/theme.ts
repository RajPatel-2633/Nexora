/**
 * Nexora Design System — Central Theme Export
 * Single import for all design tokens
 */

export { colors } from "./colors";
export { typography, fonts, fontWeights, letterSpacing, lineHeights } from "./typography";
export { radius, radiusSemantic } from "./radius";
export { shadows, shadowSemantic } from "./shadows";
export { gradients } from "./gradients";
export { buttonVariants, buttonSizes } from "./buttons";
export { cardVariants, cardIconStyles } from "./cards";
export { spacing, sectionSpacing, sectionGaps, containers, containerDefault } from "./spacing";
export { grid, breakpoints, layouts, gridTemplates, colSpan } from "./grid";
export { duration, easing, stagger, transforms, lenis, scrollTrigger, motionPrinciples } from "./motion";
export { glass, glassPresets, glassRules } from "./glass";

/** Semantic theme aliases for shadcn/ui CSS variable mapping */
export const theme = {
  /** shadcn-compatible HSL values — mapped in tokens.css */
  shadcn: {
    radius: "0.5rem",
    fontFamily: "var(--font-geist-sans)",
  },

  /** Section background presets */
  sections: {
    hero: "dark",
    features: "light",
    integrations: "light",
    benefits: "light",
    stats: "light",
    testimonial: "dark",
    contact: "dark",
    footer: "dark",
  } as const,

  /** Z-index scale */
  zIndex: {
    base: 0,
    dropdown: 50,
    sticky: 100,
    navbar: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
  },
} as const;

export type Theme = typeof theme;

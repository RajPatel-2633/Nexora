/**
 * Nexora Grid System
 * 12-column responsive grid with semantic layout presets
 */

export const grid = {
  columns: 12,
  gutter: {
    mobile: "1rem", // 16px
    tablet: "1.5rem", // 24px
    desktop: "2rem", // 32px
  },
} as const;

/** Breakpoints — align with Tailwind defaults */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/** Semantic layout presets from the mockup */
export const layouts = {
  /** Hero — text left, mockup right (2-col) */
  hero: {
    columns: { mobile: 1, desktop: 2 },
    gap: "clamp(2rem, 5vw, 4rem)",
    align: "center",
  },

  /** Feature grid — 3 columns (Lead, HRMS, Invoicing) */
  features: {
    columns: { mobile: 1, tablet: 2, desktop: 3 },
    gap: "1.5rem",
  },

  /** Why Choose — 5 benefit cards */
  benefits: {
    columns: { mobile: 1, tablet: 2, desktop: 5 },
    gap: "1rem",
  },

  /** Stats row — 4 counters */
  stats: {
    columns: { mobile: 2, desktop: 4 },
    gap: "2rem",
  },

  /** Contact — illustration + form (2-col) */
  contact: {
    columns: { mobile: 1, desktop: 2 },
    gap: "clamp(2rem, 5vw, 4rem)",
    align: "center",
  },

  /** Integration hub — centered radial layout */
  integrations: {
    columns: 1,
    maxWidth: "900px",
    marginX: "auto",
  },

  /** Logo cloud / social proof */
  logoCloud: {
    columns: { mobile: 3, tablet: 4, desktop: 6 },
    gap: "2rem",
    align: "center",
  },

  /** Footer — 4-column link groups */
  footer: {
    columns: { mobile: 1, tablet: 2, desktop: 4 },
    gap: "2rem",
  },
} as const;

/** CSS Grid template utilities (for reference / Tailwind extend) */
export const gridTemplates = {
  hero: "repeat(12, minmax(0, 1fr))",
  features: "repeat(3, minmax(0, 1fr))",
  benefits: "repeat(5, minmax(0, 1fr))",
  stats: "repeat(4, minmax(0, 1fr))",
} as const;

/** Column span helpers */
export const colSpan = {
  full: 12,
  half: 6,
  third: 4,
  twoThirds: 8,
  quarter: 3,
  heroText: { mobile: 12, desktop: 5 },
  heroVisual: { mobile: 12, desktop: 7 },
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type LayoutPreset = keyof typeof layouts;

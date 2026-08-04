/**
 * Nexora Typography Scale
 * Geist Sans (primary) + Geist Mono (labels/overlines)
 * Inspired by Vercel & Linear type systems
 */

export const fonts = {
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, 'SF Mono', monospace",
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const letterSpacing = {
  tighter: "-0.04em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

export const lineHeights = {
  none: "1",
  tight: "1.15",
  snug: "1.25",
  normal: "1.5",
  relaxed: "1.625",
  loose: "1.75",
} as const;

/** Fluid type scale — clamp(min, preferred, max) */
export const typography = {
  /** Hero headline — 48px → 72px */
  display: {
    fontSize: "clamp(3rem, 5vw + 1rem, 4.5rem)",
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tighter,
    fontWeight: fontWeights.bold,
    fontFamily: fonts.sans,
  },

  /** Section headlines — 36px → 48px */
  h1: {
    fontSize: "clamp(2.25rem, 3vw + 1rem, 3rem)",
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeights.bold,
    fontFamily: fonts.sans,
  },

  /** Subsection titles — 28px → 36px */
  h2: {
    fontSize: "clamp(1.75rem, 2vw + 0.75rem, 2.25rem)",
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.sans,
  },

  /** Card titles — 20px → 24px */
  h3: {
    fontSize: "clamp(1.25rem, 1vw + 0.75rem, 1.5rem)",
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.sans,
  },

  /** Feature labels — 18px → 20px */
  h4: {
    fontSize: "clamp(1.125rem, 0.5vw + 0.75rem, 1.25rem)",
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.sans,
  },

  /** Lead paragraph — 18px → 20px */
  lead: {
    fontSize: "clamp(1.125rem, 0.5vw + 0.875rem, 1.25rem)",
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.regular,
    fontFamily: fonts.sans,
  },

  /** Body — 16px */
  body: {
    fontSize: "1rem",
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.regular,
    fontFamily: fonts.sans,
  },

  /** Small body — 14px */
  bodySm: {
    fontSize: "0.875rem",
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.regular,
    fontFamily: fonts.sans,
  },

  /** Captions, metadata — 12px */
  caption: {
    fontSize: "0.75rem",
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
  },

  /** Overline labels — "INTEGRATIONS", "FEATURES" */
  overline: {
    fontSize: "0.75rem",
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.widest,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.mono,
    textTransform: "uppercase" as const,
  },

  /** Stat numbers — 36px → 48px */
  stat: {
    fontSize: "clamp(2.25rem, 2.5vw + 1rem, 3rem)",
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeights.bold,
    fontFamily: fonts.sans,
  },

  /** Button text */
  button: {
    fontSize: "0.875rem",
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
  },

  /** Nav links */
  nav: {
    fontSize: "0.875rem",
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
  },
} as const;

export type TypographyToken = typeof typography;

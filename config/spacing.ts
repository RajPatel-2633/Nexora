/**
 * Nexora Spacing & Section Layout
 * Premium vertical rhythm — generous whitespace
 */

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
} as const;

/** Section vertical padding — responsive */
export const sectionSpacing = {
  /** Compact — inner subsections */
  sm: {
    paddingY: "clamp(3rem, 5vw, 4rem)", // 48–64px
    paddingX: "clamp(1rem, 4vw, 2rem)",
  },

  /** Default — most marketing sections */
  md: {
    paddingY: "clamp(5rem, 8vw, 7rem)", // 80–112px
    paddingX: "clamp(1rem, 4vw, 2rem)",
  },

  /** Large — hero, major feature blocks */
  lg: {
    paddingY: "clamp(6rem, 10vw, 9rem)", // 96–144px
    paddingX: "clamp(1rem, 4vw, 2rem)",
  },

  /** XL — hero top breathing room */
  xl: {
    paddingY: "clamp(8rem, 12vw, 10rem)", // 128–160px
    paddingX: "clamp(1rem, 4vw, 2rem)",
  },
} as const;

/** Gap between elements within sections */
export const sectionGaps = {
  /** Overline → heading */
  overlineToHeading: spacing[4],

  /** Heading → description */
  headingToBody: spacing[6],

  /** Body → CTA buttons */
  bodyToCta: spacing[10],

  /** Between section header and content grid */
  headerToGrid: spacing[16],

  /** Between cards in a grid */
  cardGrid: spacing[6],

  /** Between stacked sections on mobile */
  stackMobile: spacing[8],
} as const;

/** Container max-widths */
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
  full: "100%",
} as const;

/** Default content container — matches mockup */
export const containerDefault = {
  maxWidth: containers["2xl"],
  paddingX: "clamp(1rem, 4vw, 2rem)",
  marginX: "auto",
} as const;

export type SpacingToken = typeof spacing;
export type SectionSpacing = keyof typeof sectionSpacing;

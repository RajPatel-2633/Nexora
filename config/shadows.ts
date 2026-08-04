/**
 * Nexora Shadow System
 * Soft, layered elevation — Stripe-inspired depth without heaviness
 */

export const shadows = {
  none: "none",

  /** Subtle lift — benefit cards, list items */
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",

  /** Default card elevation */
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",

  /** Feature cards, hover resting state */
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",

  /** Elevated cards, dropdowns */
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.06)",

  /** Modals, popovers */
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.06)",

  /** Hero dashboard mockup float */
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.2)",

  /** Primary button glow */
  brand: "0 4px 14px 0 rgba(99, 102, 241, 0.35)",

  /** Brand button hover */
  brandLg: "0 8px 24px 0 rgba(99, 102, 241, 0.45)",

  /** Inner inset — inputs on dark */
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",

  /** Dark section card glow */
  darkGlow: "0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4)",
} as const;

/** Semantic shadow assignments */
export const shadowSemantic = {
  card: shadows.sm,
  cardHover: shadows.md,
  featureCard: shadows.md,
  mockup: shadows["2xl"],
  buttonPrimary: shadows.brand,
  buttonPrimaryHover: shadows.brandLg,
  navbar: "0 1px 0 0 rgba(255, 255, 255, 0.06)",
  dropdown: shadows.lg,
} as const;

export type ShadowToken = typeof shadows;

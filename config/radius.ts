/**
 * Nexora Border Radius
 * Generous rounding — modern enterprise, not playful
 */

export const radius = {
  none: "0",
  xs: "0.25rem", // 4px  — badges, tags
  sm: "0.5rem", // 8px  — buttons, inputs
  md: "0.75rem", // 12px — small cards, dropdowns
  lg: "1rem", // 16px — feature cards, modals
  xl: "1.25rem", // 20px — hero mockup panels
  "2xl": "1.5rem", // 24px — large containers
  "3xl": "2rem", // 32px — dashboard mockup shell
  full: "9999px", // pills, avatars
} as const;

/** Semantic radius assignments */
export const radiusSemantic = {
  button: radius.sm,
  buttonLg: radius.md,
  input: radius.sm,
  card: radius.lg,
  cardSm: radius.md,
  modal: radius.xl,
  mockup: radius["3xl"],
  badge: radius.full,
  avatar: radius.full,
  nav: radius.md,
} as const;

export type RadiusToken = typeof radius;

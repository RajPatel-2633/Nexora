/**
 * Nexora Glassmorphism Rules
 * Frosted glass for navbar, hero mockup, dark section cards
 */

export const glass = {
  /** Blur intensity levels */
  blur: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
  },

  /** Background opacity on dark surfaces */
  background: {
    subtle: "rgba(255, 255, 255, 0.03)",
    light: "rgba(255, 255, 255, 0.06)",
    medium: "rgba(255, 255, 255, 0.08)",
    strong: "rgba(255, 255, 255, 0.12)",
  },

  /** Background opacity on light surfaces */
  backgroundLight: {
    subtle: "rgba(255, 255, 255, 0.6)",
    medium: "rgba(255, 255, 255, 0.75)",
    strong: "rgba(255, 255, 255, 0.85)",
  },

  /** Border styles */
  border: {
    dark: "1px solid rgba(255, 255, 255, 0.08)",
    darkHover: "1px solid rgba(255, 255, 255, 0.16)",
    light: "1px solid rgba(0, 0, 0, 0.06)",
    shimmer: "1px solid transparent", // use with gradient border trick
  },

  /** Saturation boost for backdrop-filter */
  saturation: {
    default: "180%",
    vivid: "200%",
  },
} as const;

/** Pre-composed glass presets */
export const glassPresets = {
  /** Fixed navbar on dark hero */
  navbar: {
    background: glass.background.light,
    backdropFilter: `blur(${glass.blur.lg}) saturate(${glass.saturation.default})`,
    WebkitBackdropFilter: `blur(${glass.blur.lg}) saturate(${glass.saturation.default})`,
    border: glass.border.dark,
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.04) inset",
  },

  /** Hero dashboard mockup outer shell */
  mockupShell: {
    background: glass.background.subtle,
    backdropFilter: `blur(${glass.blur.xl}) saturate(${glass.saturation.default})`,
    WebkitBackdropFilter: `blur(${glass.blur.xl}) saturate(${glass.saturation.default})`,
    border: glass.border.dark,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
  },

  /** Inner mockup panels (sidebar, cards) */
  mockupPanel: {
    background: glass.background.medium,
    backdropFilter: `blur(${glass.blur.md})`,
    WebkitBackdropFilter: `blur(${glass.blur.md})`,
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },

  /** Floating stat/KPI cards inside mockup */
  mockupCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: `blur(${glass.blur.sm})`,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },

  /** Contact form on dark section */
  formPanel: {
    background: glass.background.light,
    backdropFilter: `blur(${glass.blur.xl}) saturate(${glass.saturation.default})`,
    WebkitBackdropFilter: `blur(${glass.blur.xl}) saturate(${glass.saturation.default})`,
    border: glass.border.dark,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },

  /** Testimonial card */
  testimonial: {
    background: glass.background.subtle,
    backdropFilter: `blur(${glass.blur.lg})`,
    WebkitBackdropFilter: `blur(${glass.blur.lg})`,
    border: glass.border.dark,
  },

  /** Generic dark glass card */
  cardDark: {
    background: glass.background.light,
    backdropFilter: `blur(${glass.blur.lg}) saturate(${glass.saturation.default})`,
    WebkitBackdropFilter: `blur(${glass.blur.lg}) saturate(${glass.saturation.default})`,
    border: glass.border.dark,
  },

  /** Generic light glass overlay */
  overlayLight: {
    background: glass.backgroundLight.medium,
    backdropFilter: `blur(${glass.blur.md})`,
    WebkitBackdropFilter: `blur(${glass.blur.md})`,
    border: glass.border.light,
  },
} as const;

/** Usage rules — when and how to apply glass */
export const glassRules = {
  /** Only use on elements with visual content behind them */
  requiresBackdrop: true,

  /** Max 2 nested glass layers — avoid blur stacking performance hit */
  maxNesting: 2,

  /** Always pair with subtle border for edge definition */
  alwaysBorder: true,

  /** Fallback for browsers without backdrop-filter */
  fallback: {
    background: "rgba(15, 17, 23, 0.92)",
    note: "solid dark background when backdrop-filter unsupported",
  },

  /** Do NOT use glass on */
  avoid: [
    "Large full-width light sections (use solid white/gray instead)",
    "Body text containers (readability)",
    "Mobile low-end devices — consider @supports fallback",
  ],

  /** Recommended use cases from mockup */
  useCases: [
    "Fixed navbar over hero",
    "Dashboard mockup shell in hero",
    "Contact form panel on dark section",
    "Testimonial quote card",
    "Dropdown menus (Phase 2)",
    "Modal overlays (Phase 2)",
  ],
} as const;

export type GlassPreset = keyof typeof glassPresets;

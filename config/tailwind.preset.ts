/**
 * Tailwind CSS Preset Reference
 * Wire this into tailwind.config.ts when Next.js is scaffolded
 *
 * Usage:
 *   import nexoraPreset from "./config/tailwind.preset";
 *   export default { presets: [nexoraPreset], ... }
 */

import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { breakpoints } from "./grid";

/** Tailwind theme extension object */
export const tailwindThemeExtend = {
  colors: {
    nexora: {
      brand: colors.brand,
      dark: colors.dark,
      light: colors.light,
      violet: colors.violet,
      blue: colors.blue,
      leads: colors.domain.leads,
      hrms: colors.domain.hrms,
      invoicing: colors.domain.invoicing,
      analytics: colors.domain.analytics,
      ai: colors.domain.ai,
    },
  },
  borderRadius: {
    "nexora-xs": radius.xs,
    "nexora-sm": radius.sm,
    "nexora-md": radius.md,
    "nexora-lg": radius.lg,
    "nexora-xl": radius.xl,
    "nexora-2xl": radius["2xl"],
    "nexora-3xl": radius["3xl"],
  },
  boxShadow: {
    "nexora-xs": shadows.xs,
    "nexora-sm": shadows.sm,
    "nexora-md": shadows.md,
    "nexora-lg": shadows.lg,
    "nexora-xl": shadows.xl,
    "nexora-2xl": shadows["2xl"],
    "nexora-brand": shadows.brand,
    "nexora-brand-lg": shadows.brandLg,
    "nexora-dark-glow": shadows.darkGlow,
  },
  spacing,
  screens: breakpoints,
  maxWidth: {
    nexora: "1400px",
  },
  transitionTimingFunction: {
    "nexora-default": "cubic-bezier(0.25, 0.1, 0.25, 1)",
    "nexora-enter": "cubic-bezier(0, 0, 0.2, 1)",
    "nexora-emphasis": "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  transitionDuration: {
    "nexora-fast": "200ms",
    "nexora-normal": "350ms",
    "nexora-slow": "500ms",
  },
} as const;

export default tailwindThemeExtend;

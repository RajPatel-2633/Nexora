/**
 * Nexora Color Palette
 * Dark hero → light sections → dark footer flow (Vercel × Linear × Stripe)
 */

export const colors = {
  /** Deep midnight — hero, footer, contact sections */
  dark: {
    950: "#030014",
    900: "#050508",
    850: "#0B0D17",
    800: "#0F1117",
    700: "#151821",
    600: "#1C2030",
    500: "#252A3D",
    400: "#3D4460",
    300: "#5C6380",
    200: "#8B92AB",
    100: "#C4C9D9",
    50: "#E8EBF2",
  },

  /** Clean light surfaces — feature grids, integrations */
  light: {
    950: "#F9FAFB",
    900: "#FFFFFF",
    800: "#F3F4F6",
    700: "#E5E7EB",
    600: "#D1D5DB",
    500: "#9CA3AF",
    400: "#6B7280",
    300: "#4B5563",
    200: "#374151",
    100: "#1F2937",
    50: "#111827",
  },

  /** Primary brand — CTAs, active states, glow accents */
  brand: {
    950: "#1E1B4B",
    900: "#312E81",
    800: "#3730A3",
    700: "#4338CA",
    600: "#4F46E5",
    500: "#6366F1",
    400: "#818CF8",
    300: "#A5B4FC",
    200: "#C7D2FE",
    100: "#E0E7FF",
    50: "#EEF2FF",
  },

  /** Secondary violet — gradients, AI highlights */
  violet: {
    600: "#7C3AED",
    500: "#8B5CF6",
    400: "#A78BFA",
  },

  /** Soft blue — chart accents, secondary gradients */
  blue: {
    600: "#2563EB",
    500: "#3B82F6",
    400: "#60A5FA",
    300: "#93C5FD",
  },

  /** Domain accents — feature cards (Leads, HRMS, Invoicing) */
  domain: {
    leads: {
      DEFAULT: "#3B82F6",
      light: "#DBEAFE",
      dark: "#1D4ED8",
    },
    hrms: {
      DEFAULT: "#10B981",
      light: "#D1FAE5",
      dark: "#059669",
    },
    invoicing: {
      DEFAULT: "#8B5CF6",
      light: "#EDE9FE",
      dark: "#7C3AED",
    },
    analytics: {
      DEFAULT: "#F59E0B",
      light: "#FEF3C7",
      dark: "#D97706",
    },
    ai: {
      DEFAULT: "#6366F1",
      light: "#EEF2FF",
      dark: "#4338CA",
    },
  },

  /** Semantic */
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  /** Text — context-aware */
  text: {
    onDark: {
      primary: "#FFFFFF",
      secondary: "#E5E7EB",
      muted: "#9CA3AF",
      subtle: "#6B7280",
    },
    onLight: {
      primary: "#111827",
      secondary: "#374151",
      muted: "#4B5563",
      subtle: "#6B7280",
    },
  },

  /** Borders */
  border: {
    onDark: "rgba(255, 255, 255, 0.08)",
    onDarkHover: "rgba(255, 255, 255, 0.16)",
    onLight: "#E5E7EB",
    onLightHover: "#D1D5DB",
    focus: "#6366F1",
  },
} as const;

export type ColorToken = typeof colors;

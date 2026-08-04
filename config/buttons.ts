/**
 * Nexora Button Variants
 * Token specs only — component implementation comes later
 */

import { colors } from "./colors";
import { radiusSemantic } from "./radius";
import { shadows, shadowSemantic } from "./shadows";
import { gradients } from "./gradients";

export const buttonSizes = {
  sm: {
    height: "2rem", // 32px
    paddingX: "0.875rem",
    paddingY: "0.375rem",
    fontSize: "0.8125rem",
    gap: "0.375rem",
    iconSize: "0.875rem",
  },
  md: {
    height: "2.5rem", // 40px
    paddingX: "1.25rem",
    paddingY: "0.5rem",
    fontSize: "0.875rem",
    gap: "0.5rem",
    iconSize: "1rem",
  },
  lg: {
    height: "3rem", // 48px
    paddingX: "1.75rem",
    paddingY: "0.75rem",
    fontSize: "0.9375rem",
    gap: "0.5rem",
    iconSize: "1.125rem",
  },
  xl: {
    height: "3.5rem", // 56px
    paddingX: "2rem",
    paddingY: "0.875rem",
    fontSize: "1rem",
    gap: "0.625rem",
    iconSize: "1.25rem",
  },
} as const;

export const buttonVariants = {
  /** Solid indigo — primary CTAs ("Get Started", "Request Demo") */
  primary: {
    background: gradients.buttonPrimary,
    color: colors.text.onDark.primary,
    border: "1px solid transparent",
    borderRadius: radiusSemantic.button,
    boxShadow: shadowSemantic.buttonPrimary,
    hover: {
      background: gradients.buttonPrimaryHover,
      boxShadow: shadowSemantic.buttonPrimaryHover,
      transform: "translateY(-1px)",
    },
    active: {
      transform: "translateY(0)",
      boxShadow: shadows.brand,
    },
    focus: {
      outline: "2px solid rgba(99, 102, 241, 0.5)",
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.5",
      cursor: "not-allowed",
      transform: "none",
    },
  },

  /** Ghost on dark — hero secondary ("Watch Demo") */
  secondaryDark: {
    background: "transparent",
    color: colors.text.onDark.primary,
    border: `1px solid ${colors.border.onDarkHover}`,
    borderRadius: radiusSemantic.button,
    boxShadow: shadows.none,
    hover: {
      background: "rgba(255, 255, 255, 0.06)",
      borderColor: "rgba(255, 255, 255, 0.24)",
    },
    active: {
      background: "rgba(255, 255, 255, 0.1)",
    },
    focus: {
      outline: "2px solid rgba(255, 255, 255, 0.3)",
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.4",
    },
  },

  /** Outline on light — secondary on white sections */
  secondaryLight: {
    background: colors.light[900],
    color: colors.text.onLight.primary,
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radiusSemantic.button,
    boxShadow: shadows.xs,
    hover: {
      background: colors.light[950],
      borderColor: colors.border.onLightHover,
      boxShadow: shadows.sm,
    },
    active: {
      background: colors.light[800],
    },
    focus: {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.5",
    },
  },

  /** Glass on dark — navbar CTA, floating actions */
  glass: {
    background: "rgba(255, 255, 255, 0.06)",
    color: colors.text.onDark.primary,
    border: `1px solid ${colors.border.onDark}`,
    borderRadius: radiusSemantic.button,
    backdropFilter: "blur(12px)",
    boxShadow: shadows.none,
    hover: {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: colors.border.onDarkHover,
    },
    active: {
      background: "rgba(255, 255, 255, 0.14)",
    },
    focus: {
      outline: "2px solid rgba(255, 255, 255, 0.2)",
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.4",
    },
  },

  /** Text link — nav, inline actions */
  ghost: {
    background: "transparent",
    color: colors.text.onDark.secondary,
    border: "none",
    borderRadius: radiusSemantic.button,
    boxShadow: shadows.none,
    hover: {
      color: colors.text.onDark.primary,
      background: "rgba(255, 255, 255, 0.04)",
    },
    active: {
      color: colors.text.onDark.primary,
    },
    focus: {
      outline: "2px solid rgba(255, 255, 255, 0.2)",
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.4",
    },
  },

  /** Destructive — delete, remove (dashboard Phase 2) */
  destructive: {
    background: colors.semantic.error,
    color: colors.text.onDark.primary,
    border: "1px solid transparent",
    borderRadius: radiusSemantic.button,
    boxShadow: "0 4px 14px 0 rgba(239, 68, 68, 0.3)",
    hover: {
      background: "#DC2626",
      transform: "translateY(-1px)",
    },
    active: {
      transform: "translateY(0)",
    },
    focus: {
      outline: "2px solid rgba(239, 68, 68, 0.5)",
      outlineOffset: "2px",
    },
    disabled: {
      opacity: "0.5",
    },
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

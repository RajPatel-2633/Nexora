/**
 * Nexora Card Styles
 * Token specs for feature, benefit, stat, and glass cards
 */

import { colors } from "./colors";
import { radius, radiusSemantic } from "./radius";
import { shadows, shadowSemantic } from "./shadows";

export const cardVariants = {
  /** Feature grid cards — Lead Management, HRMS, Invoicing */
  feature: {
    background: colors.light[900],
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radiusSemantic.card,
    padding: "2rem",
    boxShadow: shadowSemantic.featureCard,
    hover: {
      boxShadow: shadowSemantic.cardHover,
      borderColor: colors.border.onLightHover,
      transform: "translateY(-2px)",
    },
    transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
  },

  /** "Why Choose" benefit cards — icon + title + description */
  benefit: {
    background: colors.light[900],
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radiusSemantic.cardSm,
    padding: "1.5rem",
    boxShadow: shadows.xs,
    hover: {
      boxShadow: shadows.sm,
      borderColor: colors.border.onLightHover,
    },
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
  },

  /** Stat counter cards — "2,500+ Happy Customers" */
  stat: {
    background: "transparent",
    border: "none",
    borderRadius: radiusSemantic.cardSm,
    padding: "1.5rem 1rem",
    boxShadow: shadows.none,
    textAlign: "center" as const,
  },

  /** Integration hub satellite nodes */
  integration: {
    background: colors.light[900],
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radius.full,
    padding: "1rem",
    boxShadow: shadows.sm,
    size: "4.5rem",
    hover: {
      boxShadow: shadows.md,
      borderColor: colors.brand[300],
      transform: "scale(1.05)",
    },
    transition: "all 0.3s ease",
  },

  /** Hero dashboard mockup shell — glass on dark */
  mockup: {
    background: "rgba(255, 255, 255, 0.03)",
    border: `1px solid ${colors.border.onDark}`,
    borderRadius: radiusSemantic.mockup,
    padding: "0",
    boxShadow: shadowSemantic.mockup,
    backdropFilter: "blur(24px)",
    overflow: "hidden" as const,
  },

  /** Testimonial quote card */
  testimonial: {
    background: "rgba(255, 255, 255, 0.04)",
    border: `1px solid ${colors.border.onDark}`,
    borderRadius: radiusSemantic.card,
    padding: "2.5rem",
    boxShadow: shadows.darkGlow,
    backdropFilter: "blur(16px)",
  },

  /** Contact form container on dark section */
  formDark: {
    background: "rgba(255, 255, 255, 0.04)",
    border: `1px solid ${colors.border.onDark}`,
    borderRadius: radiusSemantic.card,
    padding: "2rem",
    boxShadow: shadows.darkGlow,
    backdropFilter: "blur(20px)",
  },

  /** Pricing tier card (future) */
  pricing: {
    background: colors.light[900],
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radiusSemantic.card,
    padding: "2.5rem 2rem",
    boxShadow: shadowSemantic.card,
    featured: {
      border: `1px solid ${colors.brand[400]}`,
      boxShadow: `${shadows.md}, 0 0 0 1px rgba(99, 102, 241, 0.1)`,
    },
  },

  /** Dashboard app card (Phase 2) */
  dashboard: {
    background: colors.light[900],
    border: `1px solid ${colors.border.onLight}`,
    borderRadius: radiusSemantic.cardSm,
    padding: "1.25rem",
    boxShadow: shadows.xs,
    hover: {
      boxShadow: shadows.sm,
    },
  },
} as const;

/** Icon container inside feature/benefit cards */
export const cardIconStyles = {
  feature: {
    size: "3rem",
    borderRadius: radius.md,
    padding: "0.75rem",
    background: colors.brand[50],
    color: colors.brand[600],
  },
  benefit: {
    size: "2.5rem",
    borderRadius: radius.sm,
    padding: "0.625rem",
    background: colors.light[950],
    color: colors.brand[600],
  },
  domain: {
    leads: { background: colors.domain.leads.light, color: colors.domain.leads.DEFAULT },
    hrms: { background: colors.domain.hrms.light, color: colors.domain.hrms.DEFAULT },
    invoicing: { background: colors.domain.invoicing.light, color: colors.domain.invoicing.DEFAULT },
    analytics: { background: colors.domain.analytics.light, color: colors.domain.analytics.DEFAULT },
    ai: { background: colors.domain.ai.light, color: colors.domain.ai.DEFAULT },
  },
} as const;

export type CardVariant = keyof typeof cardVariants;

/**
 * Nexora Gradients
 * Radial glows for hero, linear text gradients, section transitions
 */

export const gradients = {
  /** Hero headline — white → soft purple-blue */
  textHero: "linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 50%, #A5B4FC 100%)",

  /** Accent text on light backgrounds */
  textBrand: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",

  /** Primary CTA background */
  buttonPrimary:
    "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)",

  /** Primary CTA hover */
  buttonPrimaryHover:
    "linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)",

  /** Hero background — deep midnight base */
  heroBackground:
    "linear-gradient(180deg, #050508 0%, #0B0D17 40%, #0F1117 100%)",

  /** Hero → light section transition (bottom fade) */
  heroToLight:
    "linear-gradient(180deg, transparent 0%, #FFFFFF 100%)",

  /** Light → dark footer transition */
  lightToDark:
    "linear-gradient(180deg, #FFFFFF 0%, #050508 100%)",

  /** Radial glow — behind dashboard mockup (purple) */
  glowPurple:
    "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",

  /** Radial glow — secondary blue accent */
  glowBlue:
    "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",

  /** Combined hero ambient glow */
  heroAmbient: `
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
  `,

  /** Glass border shimmer on dark */
  glassBorder:
    "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)",

  /** Integration hub connector pulse */
  connectorPulse:
    "linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.6) 50%, transparent 100%)",

  /** Testimonial / contact dark section */
  sectionDark:
    "linear-gradient(180deg, #0B0D17 0%, #050508 100%)",

  /** Subtle light section wash */
  sectionLight:
    "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)",

  /** Stat number accent */
  statAccent:
    "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
} as const;

export type GradientToken = typeof gradients;

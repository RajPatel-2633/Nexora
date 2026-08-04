/**
 * Nexora Motion Guidelines
 * GSAP + Framer Motion + Lenis — premium, restrained motion
 */

/** Duration tokens (seconds) */
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.7,
  slowest: 1.0,
  /** Hero entrance sequence total */
  heroSequence: 1.4,
  /** Scroll-triggered reveal */
  scrollReveal: 0.6,
  /** Integration line draw */
  lineDraw: 1.2,
} as const;

/** Easing curves — Stripe/Vercel feel: snappy enter, gentle exit */
export const easing = {
  /** Default — smooth deceleration */
  default: [0.25, 0.1, 0.25, 1.0] as const,

  /** Enter — elements appearing */
  enter: [0.0, 0.0, 0.2, 1.0] as const,

  /** Exit — elements leaving */
  exit: [0.4, 0.0, 1.0, 1.0] as const,

  /** Emphasis — hero, CTAs */
  emphasis: [0.22, 1.0, 0.36, 1.0] as const,

  /** Spring-like overshoot (Framer Motion) */
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },

  /** Gentle spring — cards, floating elements */
  springGentle: { type: "spring" as const, stiffness: 200, damping: 25 },

  /** GSAP Power curves */
  gsap: {
    smooth: "power2.out",
    snappy: "power3.out",
    bounce: "back.out(1.2)",
    elastic: "elastic.out(1, 0.5)",
  },
} as const;

/** Stagger delays */
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
  /** Hero text word/line stagger */
  hero: 0.1,
  /** Feature card grid */
  cards: 0.1,
  /** Integration hub nodes */
  hub: 0.15,
} as const;

/** Transform presets */
export const transforms = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  /** Dashboard mockup float */
  mockupFloat: {
    initial: { opacity: 0, y: 60, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
  /** Card 3D tilt on scroll (subtle) */
  cardTilt: {
    rest: { rotateX: 0, rotateY: 0 },
    hover: { rotateX: 2, rotateY: -2 },
  },
} as const;

/** Lenis smooth scroll config */
export const lenis = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 2.0,
} as const;

/** GSAP ScrollTrigger defaults */
export const scrollTrigger = {
  start: "top 85%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
  /** Scrub for parallax elements */
  scrubSmooth: 1.5,
  /** Pin duration for integration hub */
  pinSpacing: true,
} as const;

/** Motion principles — documented rules for implementation */
export const motionPrinciples = {
  /** Never animate layout-shifting properties on scroll (width, height) */
  avoidLayoutShift: true,

  /** Respect user preference */
  reducedMotion: {
    fallback: "instant opacity fade or no animation",
    mediaQuery: "(prefers-reduced-motion: reduce)",
  },

  /** Hero sequence order */
  heroSequence: [
    "overline label",
    "headline words (stagger)",
    "subheadline",
    "CTA buttons",
    "trust badges",
    "dashboard mockup (scale + fade)",
    "background glow (parallax)",
  ],

  /** Scroll reveal — one animation per viewport entry */
  scrollReveal: {
    trigger: "when 15% of element is visible",
    animation: "fadeUp with 24px Y offset",
    duration: duration.scrollReveal,
    stagger: "children with 0.08s delay",
  },

  /** Hover — micro-interactions only */
  hover: {
    buttons: "translateY(-1px) + shadow increase, 200ms",
    cards: "translateY(-2px) + shadow increase, 300ms",
    links: "color transition, 150ms",
  },

  /** Performance */
  performance: {
    useTransform: "prefer transform + opacity over top/left",
    willChange: "only during active animation, remove after",
    gsapScrollTrigger: "batch similar elements, use once: true where possible",
  },
} as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type TransformPreset = keyof typeof transforms;

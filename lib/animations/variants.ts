/**
 * Framer Motion Variants
 * Reusable animation presets — maps to config/motion.ts
 */

import type { Variants } from "framer-motion";
import { duration, easing, stagger } from "../../config/motion";

const enterTransition = {
  duration: duration.normal,
  ease: easing.enter,
};

const scrollTransition = {
  duration: duration.scrollReveal,
  ease: easing.emphasis,
};

/** Fade up — default scroll reveal */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: scrollTransition,
  },
};

/** Fade in — subtle appearance */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: enterTransition,
  },
};

/** Scale in — cards, modals */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...enterTransition, duration: duration.slow },
  },
};

/** Stagger container — wraps children with fadeUp */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

/** Hero text stagger — slower, more dramatic */
export const heroStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.hero,
      delayChildren: 0.2,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.emphasis,
    },
  },
};

/** Dashboard mockup entrance */
export const mockupVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slower,
      ease: easing.emphasis,
      delay: 0.4,
    },
  },
};

/** Slide from left — hero text column */
export const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: scrollTransition,
  },
};

/** Slide from right — hero visual column */
export const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: scrollTransition,
  },
};

/** Integration hub node pop */
export const hubNodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.emphasis,
    },
  },
};

/** Card hover — use with whileHover */
export const cardHover = {
  y: -2,
  transition: { duration: duration.fast, ease: easing.enter },
};

/** Button hover */
export const buttonHover = {
  y: -1,
  transition: { duration: duration.fast, ease: easing.enter },
};

/** Floating card — gentle bob */
export const floatingCardVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/** Trust badge stagger */
export const trustStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
};

export const trustItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.emphasis },
  },
};

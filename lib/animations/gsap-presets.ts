/**
 * GSAP Animation Presets
 * Timeline factories and ScrollTrigger configs
 */

import { duration, scrollTrigger, easing } from "../../config/motion";

/** GSAP default ease strings */
export const gsapEasing = {
  smooth: easing.gsap.smooth,
  snappy: easing.gsap.snappy,
  bounce: easing.gsap.bounce,
  elastic: easing.gsap.elastic,
} as const;

/** ScrollTrigger preset for section reveals */
export const sectionRevealScrollTrigger = {
  start: scrollTrigger.start,
  end: scrollTrigger.end,
  toggleActions: scrollTrigger.toggleActions,
} as const;

/** Hero glow parallax scrub config */
export const heroGlowParallax = {
  y: -80,
  ease: gsapEasing.smooth,
  scrollTrigger: {
    trigger: ".section-hero",
    start: "top top",
    end: "bottom top",
    scrub: scrollTrigger.scrubSmooth,
  },
} as const;

/** Integration hub line draw animation config */
export const integrationLineDraw = {
  duration: duration.lineDraw,
  ease: gsapEasing.smooth,
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: ".integrations-hub",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
} as const;

/** Floating mockup subtle Y oscillation */
export const mockupFloat = {
  y: -8,
  duration: 3,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
} as const;

/** Stagger fade-up for card grids */
export const cardGridStagger = {
  opacity: 1,
  y: 0,
  duration: duration.scrollReveal,
  ease: gsapEasing.snappy,
  stagger: 0.1,
  scrollTrigger: sectionRevealScrollTrigger,
} as const;

/** Navbar background opacity on scroll */
export const navbarScrollFade = {
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(16px)",
  scrollTrigger: {
    trigger: "body",
    start: "100px top",
    end: "200px top",
    scrub: true,
  },
} as const;

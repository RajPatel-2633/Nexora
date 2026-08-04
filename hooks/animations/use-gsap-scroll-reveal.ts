"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealOptions = {
  y?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

/**
 * GSAP ScrollTrigger reveal — fade + slide on scroll.
 */
export function useGsapScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    opacity = 0,
    scale = 1,
    duration = 0.8,
    start = "top 85%",
    once = true,
  } = options;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(el, { opacity, y, scale });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, y, opacity, scale, duration, start, once, reducedMotion]);
}

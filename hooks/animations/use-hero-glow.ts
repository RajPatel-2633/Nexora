"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Pulsing radial glow behind hero dashboard — GSAP opacity/scale loop.
 */
export function useHeroGlow(ref: React.RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, {
      opacity: 0.7,
      scale: 1.08,
      duration: 4,
      ease: "sine.inOut",
    }).to(el, {
      opacity: 0.45,
      scale: 0.95,
      duration: 4,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [ref, reducedMotion]);
}

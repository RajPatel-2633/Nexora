"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";

type FloatingConfig = {
  y?: number;
  duration?: number;
  delay?: number;
  rotation?: number;
};

/**
 * GSAP infinite float — dashboard shell and stat cards.
 */
export function useFloatingAnimation(
  ref: React.RefObject<HTMLElement | null>,
  config: FloatingConfig = {}
) {
  const { y = 10, duration = 3, delay = 0, rotation = 0 } = config;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const tween = gsap.to(el, {
      y: -y,
      rotation: rotation,
      duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay,
    });

    return () => {
      tween.kill();
    };
  }, [ref, y, duration, delay, rotation, reducedMotion]);
}

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";
import { useIsTouchDevice } from "./use-media-query";

type ParallaxLayer = {
  ref: React.RefObject<HTMLElement | null>;
  depth: number;
};

type UseMouseParallaxOptions = {
  intensity?: number;
  enabled?: boolean;
};

/**
 * GSAP mouse parallax — subtle 3D tilt on dashboard mockup.
 * Disabled on touch devices and reduced-motion preference.
 */
export function useMouseParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  layers: ParallaxLayer[],
  options: UseMouseParallaxOptions = {}
) {
  const { intensity = 1, enabled = true } = options;
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled || reducedMotion || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = ((e.clientX - centerX) / rect.width) * intensity;
      const normY = ((e.clientY - centerY) / rect.height) * intensity;

      layers.forEach(({ ref, depth }) => {
        const el = ref.current;
        if (!el) return;

        const x = normX * depth * 20;
        const y = normY * depth * 12;
        const rotateY = normX * depth * 4;
        const rotateX = -normY * depth * 3;

        gsap.to(el, {
          x,
          y,
          rotateY,
          rotateX,
          transformPerspective: 1200,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleLeave = () => {
      layers.forEach(({ ref }) => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef, layers, intensity, enabled, reducedMotion, isTouch]);
}

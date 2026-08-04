"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { NAVBAR_SCROLL_THRESHOLD } from "@/config/navigation";

export type NavbarScrollState = {
  isScrolled: boolean;
  scrollProgress: number;
};

/**
 * GSAP-powered scroll hook for Linear-style navbar transitions.
 * Interpolates height, blur, and opacity with smooth easing.
 */
export function useNavbarScroll() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [state, setState] = useState<NavbarScrollState>({
    isScrolled: false,
    scrollProgress: 0,
  });

  const applyProgress = useCallback((progress: number) => {
    const nav = navRef.current;
    const inner = innerRef.current;
    if (!nav || !inner) return;

    const p = gsap.utils.clamp(0, 1, progress);
    const height = gsap.utils.interpolate(80, 64, p);
    const bgOpacity = gsap.utils.interpolate(0, 0.72, p);
    const blur = gsap.utils.interpolate(0, 16, p);
    const borderOpacity = gsap.utils.interpolate(0, 0.08, p);
    const shadowOpacity = gsap.utils.interpolate(0, 0.06, p);

    nav.style.height = `${height}px`;
    nav.style.backgroundColor = `rgba(5, 5, 8, ${bgOpacity})`;
    nav.style.backdropFilter =
      p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
    (nav.style as any).webkitBackdropFilter =
      p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
    nav.style.boxShadow = `0 1px 0 0 rgba(255, 255, 255, ${shadowOpacity}) inset`;
    nav.style.borderBottom = `1px solid rgba(255, 255, 255, ${borderOpacity})`;

    inner.style.transform = `scale(${gsap.utils.interpolate(1, 0.98, p)})`;
  }, []);

  useEffect(() => {
    applyProgress(0);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const target = gsap.utils.clamp(
        0,
        1,
        scrollY / (NAVBAR_SCROLL_THRESHOLD * 4)
      );

      tweenRef.current?.kill();
      tweenRef.current = gsap.to(progressRef.current, {
        value: target,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => applyProgress(progressRef.current.value),
      });

      setState({
        isScrolled: scrollY > NAVBAR_SCROLL_THRESHOLD,
        scrollProgress: target,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tweenRef.current?.kill();
    };
  }, [applyProgress]);

  return { navRef, innerRef, ...state };
}

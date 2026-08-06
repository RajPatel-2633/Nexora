"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { NAVBAR_SCROLL_THRESHOLD } from "@/config/navigation";

export type NavbarScrollState = {
  isScrolled: boolean;
  scrollProgress: number;
};

/**
 * GSAP-powered scroll hook for Linear/Stripe/Vercel navbar transitions.
 * Decouples the morphing glass background card from the anchored navigation content.
 * Content stays anchored in a stable 1240px centered grid without horizontal shifting.
 * Glass Backdrop: Animates from 0% opacity (attached top, 8px radius) to floating glass card (10px margin, 22px radius, 1240px max-width, 20px blur).
 */
export function useNavbarScroll(mobileOpen: boolean = false) {
  const navRef = useRef<HTMLElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [state, setState] = useState<NavbarScrollState>({
    isScrolled: false,
    scrollProgress: 0,
  });

  const applyProgress = useCallback((progress: number) => {
    const nav = navRef.current;
    const glass = glassRef.current;
    if (!nav || !glass) return;

    if (mobileOpen) {
      // Force transparent header when mobile menu is open
      nav.style.height = "68px";
      glass.style.height = "68px";
      glass.style.width = "100%";
      glass.style.maxWidth = "100%";
      glass.style.marginTop = "0px";
      glass.style.backgroundColor = "transparent";
      glass.style.backdropFilter = "none";
      (glass.style as any).webkitBackdropFilter = "none";
      glass.style.border = "none";
      glass.style.boxShadow = "none";
      return;
    }

    const p = gsap.utils.clamp(0, 1, progress);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    
    if (isMobile) {
      // Mobile behavior: standard sticky header
      const height = gsap.utils.interpolate(68, 60, p);
      const bgOpacity = gsap.utils.interpolate(0, 0.90, p);
      const blur = gsap.utils.interpolate(0, 16, p);
      const borderOpacity = gsap.utils.interpolate(0, 0.08, p);

      nav.style.height = `${height}px`;
      glass.style.height = `${height}px`;
      glass.style.width = "100%";
      glass.style.maxWidth = "100%";
      glass.style.marginTop = "0px";
      glass.style.borderRadius = "0px";
      glass.style.backgroundColor = `rgba(10, 12, 20, ${bgOpacity})`;
      glass.style.backdropFilter = p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
      (glass.style as any).webkitBackdropFilter = p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
      glass.style.borderBottom = `1px solid rgba(255, 255, 255, ${borderOpacity})`;
      glass.style.boxShadow = "none";
    } else {
      // Desktop behavior: Full-width glass navbar header spanning 100% screen width
      const navHeight = 68;
      const bgOpacity = gsap.utils.interpolate(0, 0.75, p);
      const blur = gsap.utils.interpolate(0, 20, p);
      const borderOpacity = gsap.utils.interpolate(0, 0.08, p);
      const shadowOpacity = gsap.utils.interpolate(0, 0.12, p);

      nav.style.height = `${navHeight}px`;

      glass.style.height = `${navHeight}px`;
      glass.style.width = "100%";
      glass.style.maxWidth = "100%";
      glass.style.marginTop = "0px";
      glass.style.transform = "none";
      glass.style.backgroundColor = `rgba(10, 12, 20, ${bgOpacity})`;
      glass.style.backdropFilter = p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
      (glass.style as any).webkitBackdropFilter = p > 0.01 ? `blur(${blur}px) saturate(180%)` : "none";
      glass.style.borderRadius = "0px";
      glass.style.border = "none";
      glass.style.borderBottom = `1px solid rgba(255, 255, 255, ${borderOpacity})`;
      glass.style.boxShadow = p > 0.01 
        ? `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})` 
        : "none";
    }
  }, [mobileOpen]);

  useEffect(() => {
    applyProgress(progressRef.current.value);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Progressive 80px scroll range
      const target = gsap.utils.clamp(0, 1, scrollY / 80);

      tweenRef.current?.kill();
      tweenRef.current = gsap.to(progressRef.current, {
        value: target,
        duration: 0.35,
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
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      tweenRef.current?.kill();
    };
  }, [applyProgress, mobileOpen]);

  return { navRef, glassRef, ...state };
}

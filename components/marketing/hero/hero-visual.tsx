"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { HeroDashboardMockup } from "./hero-dashboard-mockup";
import { HeroFloatingCards } from "./hero-floating-cards";
import { HeroNotifications } from "./hero-notifications";
import { useMouseParallax } from "@/hooks/animations/use-mouse-parallax";
import { useFloatingAnimation } from "@/hooks/animations/use-floating-animation";
import { useGsapScrollReveal } from "@/hooks/animations/use-gsap-scroll-reveal";
import { mockupVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function HeroVisual({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useFloatingAnimation(floatRef, { y: 12, duration: 4, delay: 0.5 });
  useGsapScrollReveal(containerRef, { y: 60, scale: 0.95 });
  useMouseParallax(containerRef, [
    { ref: mockupRef, depth: 0.6 },
    { ref: glowRef, depth: 0.3 },
  ]);

  useEffect(() => {
    if (!parallaxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        y: 150,
        opacity: 0.2,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom -50%",
          scrub: true,
        }
      });
    }, parallaxRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative z-10 mx-auto w-full max-w-[640px] lg:max-w-none", className)}
    >
      <div ref={parallaxRef} className="relative w-full h-full">
      <div
        ref={glowRef}
        className="absolute inset-0 -z-10 scale-110 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div ref={floatRef}>
        <motion.div
          ref={mockupRef}
          className="relative"
          variants={mockupVariants}
          initial="hidden"
          animate="visible"
          style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        >
          <HeroDashboardMockup />
          <HeroFloatingCards />
          <HeroNotifications />
        </motion.div>
      </div>
      </div>
    </div>
  );
}

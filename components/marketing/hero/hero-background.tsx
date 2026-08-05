"use client";

import { useRef, useEffect } from "react";
import { useHeroGlow } from "@/hooks/animations/use-hero-glow";
import { useParticles } from "@/hooks/animations/use-particles";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export function HeroBackground({ className }: { className?: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useHeroGlow(glowRef);
  useHeroGlow(glowSecondaryRef);
  useParticles(canvasRef);

  useEffect(() => {
    const g1 = glowRef.current;
    const g2 = glowSecondaryRef.current;
    if (!g1 || !g2) return;

    // Slow drifting movement for gradient blobs
    const drift1 = gsap.to(g1, {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      duration: 10,
      repeat: -1,
      repeatRefresh: true,
      ease: "sine.inOut",
    });

    const drift2 = gsap.to(g2, {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      duration: 12,
      repeat: -1,
      repeatRefresh: true,
      ease: "sine.inOut",
    });

    return () => {
      drift1.kill();
      drift2.kill();
    };
  }, []);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-60"
      />

      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)",
        }}
      />

      <div
        ref={glowSecondaryRef}
        className="absolute right-0 top-1/4 h-[400px] w-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

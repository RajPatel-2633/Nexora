"use client";

import { useRef } from "react";
import { useHeroGlow } from "@/hooks/animations/use-hero-glow";
import { useParticles } from "@/hooks/animations/use-particles";
import { cn } from "@/lib/utils";

export function HeroBackground({ className }: { className?: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useHeroGlow(glowRef);
  useParticles(canvasRef);

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

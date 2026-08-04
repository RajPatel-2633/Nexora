"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";
import { useIsMobile } from "./use-media-query";

type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
};

type UseParticlesOptions = {
  count?: number;
  color?: string;
  maxRadius?: number;
};

/**
 * Canvas particle field for hero background — lightweight, mobile-scaled.
 */
export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseParticlesOptions = {}
) {
  const { color = "rgba(129, 140, 248, 0.4)", maxRadius = 2 } = options;
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 25 : 55;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const w = canvas.parentElement?.clientWidth ?? 800;
      const h = canvas.parentElement?.clientHeight ?? 600;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * maxRadius + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      const w = canvas.parentElement?.clientWidth ?? 800;
      const h = canvas.parentElement?.clientHeight ?? 600;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, color, maxRadius, reducedMotion, isMobile]);
}

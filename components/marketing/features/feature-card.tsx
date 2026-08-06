"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { MOTION_TOKENS } from "@/lib/animations/motion-tokens";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  colorVariant: "blue" | "green" | "purple";
  actionText?: string;
  actionHref?: string;
  children?: React.ReactNode;
  className?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.18)",
    iconBg: "bg-blue-500",
    cta: "text-blue-600 dark:text-blue-400 group-hover:text-blue-500",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.18)",
    iconBg: "bg-emerald-500",
    cta: "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500",
  },
  purple: {
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-500/30",
    glow: "rgba(139, 92, 246, 0.18)",
    iconBg: "bg-violet-500",
    cta: "text-violet-600 dark:text-violet-400 group-hover:text-violet-500",
  },
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  features,
  colorVariant,
  actionText = "Explore Module",
  actionHref = "#features",
  children,
  className,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[colorVariant];

  const [isFocused, setIsFocused] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  // Mouse position for tilt and dynamic gradient glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 350, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const rX = ((mouseYPos / height) - 0.5) * -8;
    const rY = ((mouseXPos / width) - 0.5) * 8;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const backgroundGradient = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${colors.glow}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      whileHover={MOTION_TOKENS.feature.hover}
      transition={MOTION_TOKENS.spring.cardHover}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 md:p-8 outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        "hover:shadow-2xl hover:border-transparent",
        isFocused && "shadow-2xl border-transparent",
        className
      )}
    >
      {/* Dynamic Radial Gradient Glow Following Cursor */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          isFocused && "opacity-100"
        )}
        style={{ background: backgroundGradient }}
      />

      {/* Border Highlight Effect */}
      <div
        className={cn(
          "absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl border-2",
          colors.border,
          isFocused && "opacity-100"
        )}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Slot */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:scale-105",
              colors.iconBg
            )}
          >
            <Icon className="size-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>{title}</h3>
        </div>

        {/* Description Slot */}
        <p className="mb-6 text-muted-foreground text-sm md:text-base leading-relaxed max-w-[38ch]">
          {description}
        </p>

        {/* Feature List Slot */}
        <ul className="mb-8 space-y-3 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full",
                  colors.bg
                )}
              >
                <Check className={cn("size-3.5 font-bold", colors.text)} />
              </div>
              <span className="text-sm font-normal text-foreground/85">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Production Dashboard Widget Slot */}
        {children && (
          <div className="mt-auto mb-6 overflow-hidden rounded-2xl border bg-background/60 shadow-inner backdrop-blur-sm">
            {children}
          </div>
        )}

        {/* Actions Slot */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <a
            href={actionHref}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-300 hover:gap-2.5",
              colors.cta
            )}
          >
            {actionText} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Nexora Module
          </span>
        </div>
      </div>
    </motion.div>
  );
}

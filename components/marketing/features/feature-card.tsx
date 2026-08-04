"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  colorVariant: "blue" | "green" | "purple";
  children?: React.ReactNode;
  className?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
    glow: "rgba(59, 130, 246, 0.15)",
    iconBg: "bg-blue-500",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    glow: "rgba(16, 185, 129, 0.15)",
    iconBg: "bg-emerald-500",
  },
  purple: {
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-500/20",
    glow: "rgba(139, 92, 246, 0.15)",
    iconBg: "bg-violet-500",
  },
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  features,
  colorVariant,
  children,
  className,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[colorVariant];

  // Mouse position for tilt and glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Calculate rotation (-5deg to 5deg max)
    const rX = ((mouseYPos / height) - 0.5) * -10;
    const rY = ((mouseXPos / width) - 0.5) * 10;
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseEnter = () => {
    // Keep for future use if needed
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const backgroundGradient = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${colors.glow}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 md:p-8",
        "hover:shadow-xl hover:border-transparent",
        className
      )}
    >
      {/* Animated Gradient Glow on Hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: backgroundGradient }}
      />
      
      {/* Border gradient effect */}
      <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl border-2", colors.border)} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex items-center gap-4">
          <div className={cn("flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm", colors.iconBg)}>
            <Icon className="size-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
        </div>

        <p className="mb-6 text-muted-foreground">{description}</p>

        <ul className="mb-8 space-y-3 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={cn("mt-1 flex size-5 shrink-0 items-center justify-center rounded-full", colors.bg)}>
                <Check className={cn("size-3.5 font-bold", colors.text)} />
              </div>
              <span className="text-sm font-medium text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Mini Preview Section */}
        {children && (
          <div className="mt-auto overflow-hidden rounded-xl border bg-background/50 shadow-inner">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/domain/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  pulseCta?: boolean;
  prefersReducedMotion?: boolean;
}

export function PricingCard({
  plan,
  isYearly,
  pulseCta,
  prefersReducedMotion,
}: PricingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const billingPeriod = isYearly ? "/year" : "/month";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative h-full flex flex-col justify-between rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 overflow-hidden group select-none",
        plan.highlighted
          ? "border-2 border-brand-500/60 bg-brand-950/40 shadow-2xl shadow-brand-500/15 z-20"
          : "border border-white/10 bg-white/[0.03] shadow-xl hover:border-white/25 hover:bg-white/[0.05]"
      )}
    >
      {/* 1. Calm Ambient Glow + Hover-Only Spotlight for Professional Plan */}
      {plan.highlighted && (
        <div className="absolute inset-0 bg-brand-500/5 rounded-3xl pointer-events-none" />
      )}

      {/* Hover Spotlight Layer */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, ${plan.glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Top Accent Gradient Line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent",
          plan.highlighted ? "opacity-100 text-brand-400" : "opacity-0 group-hover:opacity-100 text-white/40"
        )}
      />

      {/* Top Header & Badge */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors duration-200">
            {plan.name}
          </h4>

          {/* 6. Subtle Most Popular Badge Pulse */}
          {plan.badge && (
            <motion.div
              animate={{
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-brand-500/25 border border-brand-400/30"
            >
              <Sparkles className="size-3" />
              <span>{plan.badge}</span>
            </motion.div>
          )}
        </div>

        <p className="text-sm text-white/60 min-h-[40px] leading-relaxed mb-6">
          {plan.description}
        </p>

        {/* 2. Price Morphing Animation */}
        <div className="mb-8 flex items-baseline gap-2">
          <div className="relative overflow-hidden h-12 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
              >
                ${price}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-sm font-medium text-white/50">{billingPeriod}</span>
        </div>

        {/* Action Button */}
        <motion.div
          animate={pulseCta ? { scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Button
            variant={plan.highlighted ? "primary" : "glass"}
            className={cn(
              "w-full py-6 text-sm font-bold transition-all duration-300 rounded-xl",
              plan.highlighted
                ? "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
            )}
          >
            {plan.ctaLabel}
          </Button>
        </motion.div>

        {/* 4. Scannable Feature List with "Coming Soon" Badges */}
        <div className="space-y-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
            What&apos;s included:
          </div>

          <ul className="space-y-3" role="list">
            {plan.features.map((feature) => (
              <li
                key={feature.name}
                className={cn(
                  "flex items-center justify-between gap-3 text-sm transition-colors duration-200",
                  feature.included
                    ? "text-white/90 group-hover:text-white"
                    : "text-white/35 line-through decoration-white/20"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {feature.included ? (
                    <Check
                      className={cn(
                        "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                        plan.highlighted ? "text-brand-400" : "text-emerald-400"
                      )}
                    />
                  ) : (
                    <X className="size-4 text-white/25 shrink-0" />
                  )}
                  <span className="truncate">{feature.name}</span>
                </div>

                {/* "Coming Soon" Badge for future AI capabilities */}
                {feature.comingSoon && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

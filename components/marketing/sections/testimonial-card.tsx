"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/domain/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  onHoverStart,
  onHoverEnd,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => {
        onHoverStart?.();
      }}
      onHoverEnd={() => {
        onHoverEnd?.();
      }}
      className={cn(
        "relative w-[300px] sm:w-[350px] md:w-[380px] shrink-0 group select-none",
        testimonial.minHeight,
        className
      )}
    >
      {/* Outer Card Glass Container */}
      <div
        className={cn(
          "relative h-full flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-xl transition-all duration-500 shadow-xl overflow-hidden group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:backdrop-blur-2xl group-hover:shadow-2xl",
        )}
      >
        {/* Subtle Ambient Hover Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br",
            testimonial.cardGradient
          )}
        />

        {/* Animated Glow Accent Line across top of card on hover */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent",
            testimonial.accentColor
          )}
        />

        {/* 7. Large Transparent Quote Icon (5% -> 20% opacity on hover) */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-4 text-7xl font-serif leading-none select-none pointer-events-none text-white/5 group-hover:text-white/20 transition-colors duration-500"
        >
          ❝
        </span>

        {/* Top Header Section: Stars & Content */}
        <div className="relative z-10 pt-4">
          {/* 2. Soft Star Shimmer Rating */}
          <div className="mb-5 flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.7 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="size-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-transform duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium tracking-tight">
            &quot;{testimonial.quote}&quot;
          </p>
        </div>

        {/* Bottom Section: Avatar & Author & Company Logo */}
        <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors duration-500">
          {/* 4. Abstract Gradient Avatar & Author Info */}
          <div className="flex items-center gap-3.5">
            <div
              className={cn(
                "flex size-11 items-center justify-center rounded-full text-xs font-black text-white shadow-lg ring-2 ring-white/15 bg-gradient-to-tr transition-transform duration-300 group-hover:scale-105",
                testimonial.avatarGradient
              )}
            >
              {testimonial.initials}
            </div>

            <div>
              <h4 className="font-bold text-sm md:text-base text-white group-hover:text-brand-300 transition-colors duration-200">
                {testimonial.name}
              </h4>
              <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-200">
                {testimonial.role}
              </p>
            </div>
          </div>

          {/* 5. Company Badge (Fades in & brightens on hover) */}
          <div className="text-right">
            <span
              className={cn(
                "text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 text-white/25 group-hover:text-white/90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              )}
            >
              {testimonial.company}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

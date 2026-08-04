"use client";

import { motion } from "framer-motion";
import { partnerLogos } from "@/features/marketing/hero-data";
import { cn } from "@/lib/utils";

export function HeroLogoCloud({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("mt-12 border-t border-white/[0.06] pt-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <p className="text-caption text-on-dark-muted mb-5 text-center lg:text-left">
        Integrates with tools you already use
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start lg:gap-8">
        {partnerLogos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-80"
            title={logo.name}
          >
            <span
              className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-bold text-white/70"
              style={logo.color ? { color: logo.color } : undefined}
            >
              {logo.abbr}
            </span>
            <span className="hidden text-xs font-medium text-white/50 sm:inline">
              {logo.name}
            </span>
          </div>
        ))}
        <span className="text-caption text-white/40">and 50+ more</span>
      </div>
    </motion.div>
  );
}

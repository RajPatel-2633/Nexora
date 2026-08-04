"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/features/marketing/hero-data";
import {
  trustStaggerVariants,
  trustItemVariants,
} from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

const avatarColors = ["#6366F1", "#8B5CF6", "#3B82F6"];

export function HeroTrustBadges({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("flex items-center gap-4", className)}
      variants={trustStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex -space-x-2.5">
        {heroContent.trust.avatars.map((initials, i) => (
          <motion.div
            key={initials}
            variants={trustItemVariants}
            className="flex size-9 items-center justify-center rounded-full border-2 border-[#050508] text-xs font-semibold text-white"
            style={{ backgroundColor: avatarColors[i] }}
            aria-hidden="true"
          >
            {initials}
          </motion.div>
        ))}
      </div>
      <motion.p
        variants={trustItemVariants}
        className="text-body-sm text-on-dark-muted"
      >
        Trusted by{" "}
        <span className="font-semibold text-white">
          {heroContent.trust.count}
        </span>{" "}
        businesses worldwide
      </motion.p>
    </motion.div>
  );
}

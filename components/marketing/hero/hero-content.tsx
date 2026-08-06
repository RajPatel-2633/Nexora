"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { heroContent } from "@/features/marketing/hero-data";
import { HeroCtaGroup } from "./hero-cta-group";
import { HeroTrustBadges } from "./hero-trust-badges";
import {
  heroStaggerVariants,
  heroItemVariants,
} from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

const AnimatedWord = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={heroItemVariants}
          className="inline-block mr-[0.25em] font-semibold"
          style={{ fontWeight: 600 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export function HeroContent({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative z-10", className)}
      variants={heroStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={heroItemVariants}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 section-label text-white/80 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-[#818CF8]" aria-hidden="true" />
          {heroContent.badge}
        </span>
      </motion.div>

      <h1
        id="hero-heading"
        className="display-xl font-semibold mt-4 max-w-xl text-balance"
        style={{ fontWeight: 600 }}
      >
        <AnimatedWord text={heroContent.heading.line1} className="block text-white" />
        <AnimatedWord text={heroContent.heading.line2} className="block text-white" />
        <AnimatedWord text={heroContent.heading.gradient} className="text-gradient-hero mt-1 block" />
      </h1>

      <motion.p
        className="body-lg text-slate-400 mt-7 max-w-lg"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }}
      >
        {heroContent.description}
      </motion.p>

      <motion.div variants={heroItemVariants} className="mt-8">
        <HeroCtaGroup />
      </motion.div>

      <motion.div variants={heroItemVariants} className="mt-8">
        <HeroTrustBadges />
      </motion.div>
    </motion.div>
  );
}

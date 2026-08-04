"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/features/marketing/hero-data";
import { buttonHover } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

export function HeroCtaGroup({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
        <Button asChild variant="primary" size="lg" className="group">
          <Link href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>

      <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
        <Button asChild variant="secondaryDark" size="lg" className="group">
          <Link href={heroContent.secondaryCta.href}>
            <Play className="size-4 fill-current" />
            {heroContent.secondaryCta.label}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

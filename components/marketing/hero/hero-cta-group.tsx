"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/features/marketing/hero-data";
import { buttonHover } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export function HeroCtaGroup({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <MagneticWrapper strength={0.3}>
        <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
          <Button asChild variant="primary" size="lg" className="group">
            <Link href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>
      </MagneticWrapper>

      <MagneticWrapper strength={0.2}>
        <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
          <Button asChild variant="secondaryDark" size="lg" className="group">
            <Link href={heroContent.secondaryCta.href}>
              <Play className="size-4 fill-current" />
              {heroContent.secondaryCta.label}
            </Link>
          </Button>
        </motion.div>
      </MagneticWrapper>
    </div>
  );
}

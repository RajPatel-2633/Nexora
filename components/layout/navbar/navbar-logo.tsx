"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavConfig } from "@/config/navigation";

type NavbarLogoProps = {
  logo: NavConfig["logo"];
  isScrolled?: boolean;
  className?: string;
};

export function NavbarLogo({ logo, isScrolled = false, className }: NavbarLogoProps) {
  return (
    <Link
      href={logo.href}
      className={cn(
        "group relative flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-nexora-brand-500/50",
        className
      )}
      aria-label={`${logo.label} — Home`}
    >
      <motion.span
        className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4338CA] shadow-[0_4px_14px_0_rgba(99,102,241,0.35)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Sparkles className="size-4 text-white" aria-hidden="true" />
      </motion.span>
      <motion.span
        className={cn(
          "text-nav font-semibold tracking-tight text-white transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-95"
        )}
        whileHover={{ opacity: 1 }}
      >
        {logo.label}
      </motion.span>
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type NavbarMobileToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export function NavbarMobileToggle({
  isOpen,
  onToggle,
  className,
}: NavbarMobileToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-lg",
        "text-white/80 outline-none transition-colors",
        "hover:bg-white/[0.06] hover:text-white",
        "focus-visible:ring-2 focus-visible:ring-nexora-brand-500/50",
        "lg:hidden",
        className
      )}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={isOpen ? { rotate: 90, opacity: 0.7 } : { rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Menu className="size-5" aria-hidden="true" />
      </motion.span>
    </motion.button>
  );
}

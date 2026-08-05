"use client";

import { motion } from "framer-motion";
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
  const lineVariants = {
    closed: { rotate: 0, y: 0, opacity: 1 },
    opened: (custom: number) => {
      if (custom === 1) return { rotate: 45, y: 6 };
      if (custom === 2) return { opacity: 0 };
      return { rotate: -45, y: -6 };
    },
  };

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-lg z-[300]",
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
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <motion.path
          d="M0 1H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={lineVariants}
          custom={1}
          animate={isOpen ? "opened" : "closed"}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 7H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={lineVariants}
          custom={2}
          animate={isOpen ? "opened" : "closed"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 13H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={lineVariants}
          custom={3}
          animate={isOpen ? "opened" : "closed"}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
      </svg>
    </motion.button>
  );
}

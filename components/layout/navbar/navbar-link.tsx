"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavLinkActive } from "@/hooks/ui/use-active-section";
import type { NavLink } from "@/config/navigation";

type NavbarLinkProps = {
  link: NavLink;
  activeSection: string;
  onNavigate?: () => void;
  className?: string;
};

export function NavbarLink({
  link,
  activeSection,
  onNavigate,
  className,
}: NavbarLinkProps) {
  const isActive = useNavLinkActive(link.href, activeSection);

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={cn(
        "group relative px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-nexora-brand-500/50 rounded-md",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.span
        className={cn(
          "text-nav relative z-10 block transition-colors duration-200",
          isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
        )}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {link.label}
      </motion.span>

      {/* Active indicator — Linear-style pill underline */}
      <motion.span
        className="absolute bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-nexora-brand-500"
        initial={false}
        animate={{
          width: isActive ? "60%" : "0%",
          opacity: isActive ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        aria-hidden="true"
      />

      {/* Hover indicator */}
      {!isActive && (
        <motion.span
          className="absolute bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-white/30"
          initial={{ width: "0%", opacity: 0 }}
          whileHover={{ width: "40%", opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

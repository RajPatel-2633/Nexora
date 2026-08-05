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
        "group relative px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-lg transition-colors border-none",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={cn(
          "relative z-10 block transition-colors duration-200",
          isActive ? "text-white font-semibold" : "text-white/65 group-hover:text-white"
        )}
      >
        {link.label}
      </span>

      {/* Active Navigation Indicator — Animated sliding capsule */}
      {isActive && (
        <motion.span
          layoutId="activeNavLinkIndicator"
          className="absolute inset-0 bg-white/10 rounded-lg -z-0"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          aria-hidden="true"
        />
      )}

      {/* Hover background pill */}
      {!isActive && (
        <motion.span
          className="absolute inset-0 bg-white/[0.06] rounded-lg -z-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

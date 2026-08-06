"use client";

import Link from "next/link";
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
        "relative px-3.5 py-2 text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-lg transition-colors border-none",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={cn(
          "relative z-10 block transition-colors duration-200",
          isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
        )}
      >
        {link.label}
      </span>
    </Link>
  );
}

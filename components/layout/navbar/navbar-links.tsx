"use client";

import { cn } from "@/lib/utils";
import { NavbarLink } from "./navbar-link";
import type { NavLink } from "@/config/navigation";

type NavbarLinksProps = {
  links: NavLink[];
  activeSection: string;
  className?: string;
};

export function NavbarLinks({ links, activeSection, className }: NavbarLinksProps) {
  return (
    <ul className={cn("flex items-center gap-8 lg:gap-10", className)} role="list">
      {links.map((link) => (
        <li key={link.href}>
          <NavbarLink link={link} activeSection={activeSection} />
        </li>
      ))}
    </ul>
  );
}

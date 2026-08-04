"use client";

import { NavbarLink } from "./navbar-link";
import type { NavLink } from "@/config/navigation";

type NavbarLinksProps = {
  links: NavLink[];
  activeSection: string;
  className?: string;
};

export function NavbarLinks({ links, activeSection, className }: NavbarLinksProps) {
  return (
    <ul className={className} role="list">
      {links.map((link) => (
        <li key={link.href}>
          <NavbarLink link={link} activeSection={activeSection} />
        </li>
      ))}
    </ul>
  );
}

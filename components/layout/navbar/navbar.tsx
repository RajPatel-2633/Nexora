"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { navigation } from "@/config/navigation";
import { theme } from "@/config/theme";
import { useNavbarScroll } from "@/hooks/ui/use-navbar-scroll";
import { useActiveSection } from "@/hooks/ui/use-active-section";
import { NavbarLogo } from "./navbar-logo";
import { NavbarLinks } from "./navbar-links";
import { NavbarCta } from "./navbar-cta";
import { NavbarMobileToggle } from "./navbar-mobile-toggle";
import { NavbarMobileMenu } from "./navbar-mobile-menu";

export type NavbarProps = {
  /** Override default navigation config */
  navConfig?: typeof navigation;
  className?: string;
};

export function Navbar({ navConfig = navigation, className }: NavbarProps) {
  const { navRef, innerRef, isScrolled } = useNavbarScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(
    () =>
      navConfig.links
        .filter((l) => l.isSection && l.href.startsWith("#"))
        .map((l) => l.href.slice(1)),
    [navConfig.links]
  );

  const activeSection = useActiveSection(sectionIds);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-nexora-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-[200]",
          "will-change-[height,backdrop-filter,background-color]",
          "transition-[border-color] duration-300",
          className
        )}
        style={{ height: 80, zIndex: theme.zIndex.navbar }}
      >
        <div
          ref={innerRef}
          className="nexora-container flex h-full items-center justify-between"
          style={{ transformOrigin: "center top" }}
        >
          <NavbarLogo logo={navConfig.logo} isScrolled={isScrolled} />

          <nav
            className="hidden lg:block"
            aria-label="Primary navigation"
          >
            <NavbarLinks
              links={navConfig.links}
              activeSection={activeSection}
              className="flex items-center gap-1"
            />
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <NavbarCta
                label={navConfig.cta.label}
                href={navConfig.cta.href}
              />
            </div>

            <NavbarMobileToggle
              isOpen={mobileOpen}
              onToggle={toggleMobile}
            />
          </div>
        </div>
      </header>

      <NavbarMobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        navigation={navConfig}
        activeSection={activeSection}
      />

      {/* Spacer to offset fixed navbar */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}

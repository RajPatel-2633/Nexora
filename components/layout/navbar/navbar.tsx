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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navRef, glassRef, isScrolled } = useNavbarScroll(mobileOpen);

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

      {/* 1. Full-Width Header */}
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 w-full pointer-events-none",
          "will-change-[height]",
          className
        )}
        style={{ zIndex: mobileOpen ? 250 : theme.zIndex.navbar }}
      >
        {/* Decoupled Glass Backdrop Card — Animates independently underneath from 0% opacity to floating glass card */}
        <div
          ref={glassRef}
          className="absolute inset-x-0 top-0 mx-auto pointer-events-none transition-all"
        />

        {/* Stable Content Grid — Anchored centered max-w-[1240px]. Navigation items NEVER shift horizontally while scrolling */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 h-[68px] flex items-center justify-between pointer-events-auto">
          <NavbarLogo logo={navConfig.logo} isScrolled={isScrolled} />

          <nav
            className="hidden lg:block"
            aria-label="Primary navigation"
          >
            <NavbarLinks
              links={navConfig.links}
              activeSection={activeSection}
            />
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <NavbarCta
                label={navConfig.cta.label}
                href={navConfig.cta.href}
                isScrolled={isScrolled}
              />
            </div>

            <NavbarMobileToggle
              isOpen={mobileOpen}
              onToggle={toggleMobile}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <NavbarMobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        navigation={navConfig}
        activeSection={activeSection}
      />
    </>
  );
}

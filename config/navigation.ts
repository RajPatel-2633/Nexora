/**
 * Nexora Navigation Configuration
 * Single source of truth for navbar links
 */

export type NavLink = {
  label: string;
  href: string;
  /** Match hash sections on landing page */
  isSection?: boolean;
};

export type NavConfig = {
  logo: {
    label: string;
    href: string;
  };
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
};

export const navigation: NavConfig = {
  logo: {
    label: "Nexora",
    href: "/",
  },
  links: [
    { label: "Features", href: "#features", isSection: true },
    { label: "Integrations", href: "#integrations", isSection: true },
    { label: "Pricing", href: "#pricing", isSection: true },
    { label: "About", href: "#about", isSection: true },
  ],
  cta: {
    label: "Get Started",
    href: "#contact",
  },
};

/** Scroll threshold before navbar transitions (px) */
export const NAVBAR_SCROLL_THRESHOLD = 24;

/** Navbar height tokens for GSAP shrink animation */
export const NAVBAR_HEIGHT = {
  expanded: 80,
  collapsed: 64,
} as const;

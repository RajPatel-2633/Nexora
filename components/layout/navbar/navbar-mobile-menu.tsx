"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarCta } from "./navbar-cta";
import { isNavLinkActive } from "@/hooks/ui/use-active-section";
import type { NavConfig } from "@/config/navigation";

type NavbarMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavConfig;
  activeSection: string;
};

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      when: "beforeChildren",
    },
  },
};

const listVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 20, scale: 0.95 },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 28 },
  },
};

export function NavbarMobileMenu({
  isOpen,
  onClose,
  navigation,
  activeSection,
}: NavbarMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-[199] bg-black/40 backdrop-blur-md lg:hidden w-screen h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Fullscreen Mobile Menu Panel */}
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "fixed inset-0 z-[201] lg:hidden w-screen h-[100dvh]",
              "bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-6"
            )}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Center Navigation Links */}
            <motion.nav
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center justify-center flex-grow"
              aria-label="Mobile primary"
            >
              <ul className="flex flex-col gap-6 items-center w-full" role="list">
                {navigation.links.map((link) => {
                  const isActive = isNavLinkActive(link.href, activeSection);
                  
                  return (
                    <motion.li key={link.href} variants={itemVariants} className="w-full text-center">
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "relative inline-block text-3xl font-bold tracking-tight py-2 text-center transition-colors duration-300",
                          isActive ? "text-brand-400" : "text-white/70 hover:text-white"
                        )}
                      >
                        {link.label}
                        {/* Dot indicator for active page */}
                        {isActive && (
                          <motion.span
                            layoutId="mobileActiveDot"
                            className="absolute -right-4 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-brand-500"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            {/* Bottom Actions */}
            <motion.div
              className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto border-t border-white/5 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <NavbarCta
                label={navigation.cta.label}
                href={navigation.cta.href}
                onNavigate={onClose}
                className="w-full text-center"
              />
              
              <Link
                href="/login"
                className="text-white/50 text-sm tracking-wide hover:text-white/80 transition-colors"
                onClick={onClose}
              >
                Sign in to Nexora
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

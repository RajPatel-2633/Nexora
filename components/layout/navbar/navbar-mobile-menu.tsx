"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarLink } from "./navbar-link";
import { NavbarCta } from "./navbar-cta";
import type { NavConfig } from "@/config/navigation";

type NavbarMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavConfig;
  activeSection: string;
};

import { Variants } from "framer-motion";

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as const },
  },
};

const listVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function NavbarMobileMenu({
  isOpen,
  onClose,
  navigation,
  activeSection,
}: NavbarMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "fixed inset-x-0 top-[80px] z-[201] lg:hidden",
              "border-b border-white/10 bg-[#050508]/95 backdrop-blur-xl"
            )}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="nexora-container py-6">
              <div className="mb-4 flex justify-end">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-white/70 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-nexora-brand-500/50"
                  aria-label="Close navigation menu"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <motion.nav
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
                aria-label="Mobile primary"
              >
                <ul className="flex flex-col gap-1" role="list">
                  {navigation.links.map((link) => (
                    <motion.li key={link.href} variants={itemVariants}>
                      <NavbarLink
                        link={link}
                        activeSection={activeSection}
                        onNavigate={onClose}
                        className="block py-3 text-base"
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <motion.div
                className="mt-8 border-t border-white/10 pt-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <NavbarCta
                  label={navigation.cta.label}
                  href={navigation.cta.href}
                  onNavigate={onClose}
                  className="w-full justify-center"
                />
              </motion.div>

              <motion.p
                className="text-caption text-on-dark-muted mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/login"
                  className="text-white/50 underline-offset-4 hover:text-white/80 hover:underline"
                  onClick={onClose}
                >
                  Sign in
                </Link>
                {" · "}
                Enterprise-ready AI CRM
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavbarCtaProps = {
  label: string;
  href: string;
  onNavigate?: () => void;
  className?: string;
};

export function NavbarCta({ label, href, onNavigate, className }: NavbarCtaProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Button
        asChild
        variant="primary"
        size="sm"
        className={cn(
          "group relative overflow-hidden text-sm font-semibold transition-all duration-300 shadow-md shadow-brand-500/20 h-10 px-5 rounded-lg",
          className
        )}
      >
        <Link href={href} onClick={onNavigate}>
          {/* Glossy Gradient Sweep */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <span className="relative z-10 flex items-center gap-1.5">
            {label}
            <ArrowRight
              className="size-3.5 transition-transform duration-300 ease-[0.22,1,0.36,1] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>
      </Button>
    </motion.div>
  );
}

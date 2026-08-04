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
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      <Button asChild variant="primary" size="md" className={cn("group", className)}>
        <Link href={href} onClick={onNavigate}>
          {label}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Button>
    </motion.div>
  );
}

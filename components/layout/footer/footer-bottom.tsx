"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function FooterBottom() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/40">
      <div>
        © {new Date().getFullYear()} Nexora CRM Inc. All rights reserved. Built for modern enterprise teams.
      </div>

      {/* 9. Small Elegant Back to Top Button */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <span>Back to Top</span>
        <ArrowUp className="size-3 text-brand-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </motion.button>
    </div>
  );
}

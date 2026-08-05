"use client";

import { motion } from "framer-motion";
import { FooterCTA } from "./footer/footer-cta";
import { FooterBrand } from "./footer/footer-brand";
import { FooterLinks } from "./footer/footer-links";
import { FooterBottom } from "./footer/footer-bottom";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden bg-[#030014] text-white pt-16 pb-8 border-t border-white/10"
    >
      {/* 8. Calm Ambient Background Gradient (18s slow motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/3 size-[500px] bg-brand-600/15 rounded-full blur-[140px] -translate-y-1/2"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-1/4 size-[550px] bg-violet-600/15 rounded-full blur-[160px] translate-y-1/2"
        />
      </div>

      <div className="nexora-container relative z-10">
        {/* 1. Final Conclusion CTA Banner */}
        <FooterCTA />

        {/* Multi-Column Main Links Grid */}
        <nav aria-label="Footer navigation" className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 pb-16">
          <FooterBrand />
          <FooterLinks />
        </nav>

        {/* Bottom Bar & Back to Top Link */}
        <FooterBottom />
      </div>
    </footer>
  );
}

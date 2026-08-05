"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-2xl text-center overflow-hidden group shadow-2xl"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-3xl opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="size-3.5" />
          <span>Start Scaling Today</span>
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          Ready to unify every part of your business?
        </h3>

        <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
          From lead generation to HR, invoicing, and AI-powered automation—Nexora brings everything together in one intelligent workspace.
        </p>

        <div className="flex justify-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#contact"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/25 transition-all duration-300 hover:brightness-110"
            >
              <span>Book a Demo</span>
              <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

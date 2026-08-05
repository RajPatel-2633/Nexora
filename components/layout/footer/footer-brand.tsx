"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hexagon, Mail } from "lucide-react";
import { SocialLinks } from "./social-links";

export function FooterBrand() {
  return (
    <div className="space-y-6 max-w-sm">
      {/* Nexora Logo */}
      <Link href="/" className="inline-flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg">
        <motion.div
          whileHover={{ scale: 1.06, rotate: 6 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/25"
        >
          <Hexagon className="size-6 fill-white/20" />
        </motion.div>
        <span className="text-2xl font-black tracking-tight text-white group-hover:text-brand-300 transition-colors">
          Nexora
        </span>
      </Link>

      <p className="text-sm text-white/60 leading-relaxed">
        The all-in-one platform unifying sales CRM, HRMS, and invoicing into one intelligent workspace.
      </p>

      {/* 3. Status Badge: Platform Preview */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/70">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
        </span>
        <span>Platform Preview</span>
      </div>

      {/* 2 & 6. Direct Contact Support Callout (No Newsletter) */}
      <div className="pt-2">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Questions?</div>
        <a
          href="mailto:hello@nexora.ai"
          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-400 transition-colors group"
        >
          <Mail className="size-4 text-brand-400" />
          <span>hello@nexora.ai</span>
        </a>
      </div>

      {/* Social Links Suite */}
      <div className="pt-2">
        <SocialLinks />
      </div>
    </div>
  );
}

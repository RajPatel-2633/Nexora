"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hexagon, Mail, Check, Copy } from "lucide-react";
import { SocialLinks } from "./social-links";

export function FooterBrand() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@nexora.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xs">
      {/* Nexora Logo (24px mb-6) */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/25"
          >
            <Hexagon className="size-6 fill-white/20" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
            Nexora
          </span>
        </Link>
      </div>

      {/* Description Copy (32px mb-8) */}
      <p className="footer-description mb-8">
        The all-in-one platform unifying sales CRM, HRMS, and invoicing into one intelligent workspace.
      </p>

      {/* Status Badge: CRM Platform (40px mb-10) */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-slate-400 opacity-90">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span>CRM Platform</span>
        </div>
      </div>

      {/* Direct Contact Support Callout (16px mb-4 for label, 32px mb-8 for link) */}
      <div className="mb-8">
        <div className="footer-label mb-2">Questions?</div>
        <div className="flex items-center gap-2">
          <a
            href="mailto:hello@nexora.ai"
            className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-brand-300 transition-colors group"
          >
            <Mail className="size-4 text-brand-400" />
            <span>hello@nexora.ai</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            aria-label="Copy email address"
            className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <Check className="size-3" /> Copied!
              </span>
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Social Links Suite */}
      <div>
        <SocialLinks />
      </div>
    </div>
  );
}

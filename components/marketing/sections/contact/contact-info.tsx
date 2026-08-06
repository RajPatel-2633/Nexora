"use client";

import { motion } from "framer-motion";
import { Check, Mail, Phone, Sparkles } from "lucide-react";

const benefits = [
  "Full platform walkthrough",
  "Custom use-case discussion",
  "No commitment, just value",
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 mb-6 section-label text-brand-300">
          <Sparkles className="size-3.5" />
          <span>Get a Demo</span>
        </div>

        {/* High-Conversion Headline & Subtext */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
          Ready to transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-violet-400">business?</span>
        </h2>

        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg">
          Book a personalized demo and discover how Nexora can streamline sales, HR, invoicing, and business operations—all from one intelligent workspace.
        </p>
      </div>

      {/* Benefits Check List */}
      <ul className="space-y-3.5" role="list">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="flex size-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 shrink-0">
              <Check className="size-3 font-bold" />
            </div>
            <span className="text-white/85 text-sm md:text-base font-medium">{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Subtle Flat Contact Links */}
      <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs font-medium text-white/60">
        <a
          href="mailto:hello@nexora.com"
          className="flex items-center gap-2 hover:text-white transition-colors duration-200"
        >
          <Mail className="size-3.5 text-brand-400" />
          <span>hello@nexora.com</span>
        </a>

        <span className="size-1 rounded-full bg-white/20 hidden sm:inline-block" />

        <a
          href="tel:+18001234567"
          className="flex items-center gap-2 hover:text-white transition-colors duration-200"
        >
          <Phone className="size-3.5 text-purple-400" />
          <span>+1 (800) 123-4567</span>
        </a>
      </div>
    </motion.div>
  );
}

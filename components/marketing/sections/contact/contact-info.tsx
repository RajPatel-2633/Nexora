"use client";

import { motion } from "framer-motion";
import { Check, Mail, Phone, Sparkles } from "lucide-react";
import { DemoSchedulerCard } from "./demo-scheduler-card";

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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 mb-6 backdrop-blur-md text-brand-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="size-3.5" />
          <span>Get a Demo</span>
        </div>

        {/* 10. High-Conversion Headline & Subtext */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
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

      {/* Demo Scheduling Card */}
      <DemoSchedulerCard />

      {/* 5. Glass Contact Cards with Subtle Hover Rotation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.a
          href="mailto:hello@nexora.com"
          whileHover={{ y: -3 }}
          className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg"
        >
          <motion.div
            whileHover={{ rotate: 12 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20"
          >
            <Mail className="size-5" />
          </motion.div>
          <div>
            <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-0.5">Email Us</div>
            <div className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">hello@nexora.com</div>
          </div>
        </motion.a>

        <motion.a
          href="tel:+18001234567"
          whileHover={{ y: -3 }}
          className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg"
        >
          <motion.div
            whileHover={{ rotate: 12 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20"
          >
            <Phone className="size-5" />
          </motion.div>
          <div>
            <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-0.5">Call Us</div>
            <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">+1 (800) 123-4567</div>
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
}

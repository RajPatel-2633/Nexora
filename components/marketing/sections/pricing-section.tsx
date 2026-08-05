"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, CheckCircle2, Lock, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingCard } from "./pricing-card";
import type { PricingPlan } from "@/types/domain/pricing";

// 3. Realistic B2B SaaS Pricing Plans
const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams and startups building their foundation.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    highlighted: false,
    ctaLabel: "Start Free Trial",
    ctaVariant: "glass",
    gradient: "from-blue-500/10 to-transparent",
    glowColor: "rgba(59,130,246,0.12)",
    borderHoverColor: "border-blue-500/30",
    features: [
      { name: "Up to 5 team members", included: true },
      { name: "Lead & Contact Management", included: true },
      { name: "Attendance & HRMS Sync", included: true },
      { name: "Invoicing (Up to 50/mo)", included: true },
      { name: "Standard Integrations", included: true },
      { name: "Email Support", included: true },
      { name: "AI Insights", included: true, comingSoon: true },
      { name: "Dedicated Success Manager", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Everything required to accelerate sales pipelines and automate operations.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    highlighted: true,
    badge: "Most Popular",
    ctaLabel: "Get Started Now",
    ctaVariant: "primary",
    gradient: "from-brand-500/20 via-purple-500/10 to-transparent",
    glowColor: "rgba(99,102,241,0.22)",
    borderHoverColor: "border-brand-500/60",
    features: [
      { name: "Up to 25 team members", included: true },
      { name: "Advanced Lead Automation", included: true },
      { name: "Full HRMS & Automated Payroll", included: true },
      { name: "Unlimited Invoicing", included: true },
      { name: "All Platform Integrations", included: true },
      { name: "Priority Chat & Email Support", included: true },
      { name: "Predictive Lead Scoring", included: true, comingSoon: true },
      { name: "AI Automated Workflows", included: true, comingSoon: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Enterprise SLA, custom integrations, and dedicated B2B support.",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    highlighted: false,
    ctaLabel: "Contact Enterprise Sales",
    ctaVariant: "glass",
    gradient: "from-purple-500/10 to-transparent",
    glowColor: "rgba(168,85,247,0.12)",
    borderHoverColor: "border-purple-500/30",
    features: [
      { name: "Unlimited team members", included: true },
      { name: "Custom Workflows & SLA", included: true },
      { name: "Full HRMS & Dedicated Payroll Engine", included: true },
      { name: "Dedicated Success Manager", included: true },
      { name: "SSO / SAML & Custom API Access", included: true },
      { name: "24/7 Priority Support & Phone Line", included: true },
      { name: "Custom AI Agents & Models", included: true, comingSoon: true },
      { name: "On-Premise Deployment Option", included: true },
    ],
  },
];

// 5. Trust Indicators Below Cards
const trustIndicators = [
  { id: "1", label: "No credit card required", icon: CheckCircle2, color: "text-emerald-400" },
  { id: "2", label: "Cancel anytime", icon: Zap, color: "text-brand-400" },
  { id: "3", label: "Enterprise-grade security", icon: ShieldCheck, color: "text-purple-400" },
  { id: "4", label: "99.9% uptime", icon: Clock, color: "text-blue-400" },
  { id: "5", label: "GDPR-ready", icon: Lock, color: "text-amber-400" },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [pulseCta, setPulseCta] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Accessibility check for reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  const handleToggleBilling = (yearly: boolean) => {
    setIsYearly(yearly);
    setPulseCta(true);
    setTimeout(() => setPulseCta(false), 400);
  };

  return (
    <section id="pricing" className="section-dark section-md relative overflow-hidden bg-brand-950 text-white">
      {/* Ambient Background Radial Glows */}
      <div className="absolute top-1/3 -left-40 size-96 rounded-full bg-brand-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 size-96 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      <div className="nexora-container relative z-10">
        {/* 10. Contextual Framing Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="size-3.5" />
            <span>Simple pricing that scales with your business</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-h2 text-white mb-4"
          >
            Transparent plans for teams of all sizes
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 font-normal"
          >
            Start free. Upgrade as your team grows.
          </motion.p>
        </div>

        {/* 2. Premium Animated Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mb-14 md:mb-16"
        >
          <div
            role="switch"
            aria-checked={isYearly}
            aria-label="Billing frequency toggle"
            className="relative flex items-center gap-2 bg-white/[0.05] p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner"
          >
            <button
              type="button"
              onClick={() => handleToggleBilling(false)}
              className={cn(
                "relative z-10 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                !isYearly ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Monthly
              {!isYearly && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-brand-500 rounded-full -z-10 shadow-md shadow-brand-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleToggleBilling(true)}
              className={cn(
                "relative z-10 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-200 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                isYearly ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Yearly
              <span className="bg-brand-400/20 text-brand-300 border border-brand-400/30 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                Save 20%
              </span>
              {isYearly && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-brand-500 rounded-full -z-10 shadow-md shadow-brand-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* 8. Reusable 3-Column Glass Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="h-full"
            >
              <PricingCard
                plan={plan}
                isYearly={isYearly}
                pulseCta={pulseCta}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          ))}
        </div>

        {/* 5. Trust Indicators Bar Below Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-8 border-t border-white/10 max-w-5xl mx-auto text-xs md:text-sm font-semibold text-white/60"
        >
          {trustIndicators.map((indicator) => {
            const IconComponent = indicator.icon;
            return (
              <div key={indicator.id} className="flex items-center gap-2">
                <IconComponent className={cn("size-4", indicator.color)} />
                <span>{indicator.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

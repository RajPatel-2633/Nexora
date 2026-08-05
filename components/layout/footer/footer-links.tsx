"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { FooterColumn } from "@/types/domain/footer";

// 4. Product-Centric Footer Columns Data
const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Sales CRM", href: "#why-choose" },
      { label: "HRMS & Payroll", href: "#why-choose" },
      { label: "Invoicing Engine", href: "#why-choose" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Product Roadmap",
    links: [
      { label: "AI Copilot", href: "#", badge: "Coming Soon", isComingSoon: true },
      { label: "Workflow Automation", href: "#", badge: "Coming Soon", isComingSoon: true },
      { label: "Knowledge Graph", href: "#", badge: "Coming Soon", isComingSoon: true },
      { label: "Predictive Analytics", href: "#", badge: "Coming Soon", isComingSoon: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#", badge: "Hiring" },
      { label: "Blog & Insights", href: "#" },
      { label: "Partners Program", href: "#" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#", external: true },
      { label: "API Reference", href: "#", external: true },
      { label: "Help Center", href: "#" },
      { label: "Community Hub", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security & Compliance", href: "#" },
      { label: "Cookie Settings", href: "#" },
    ],
  },
];

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 flex-grow">
      {footerColumns.map((col) => (
        <div key={col.title} className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white/90">
            {col.title}
          </h4>

          <ul className="space-y-3" role="list">
            {col.links.map((link) => (
              <li key={link.label}>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-1.5 text-xs md:text-sm text-white/60 hover:text-brand-300 transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-brand-400 rounded"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-400 transition-all duration-200 group-hover:w-full" />
                    </span>

                    {link.external && <ArrowUpRight className="size-3 text-white/40 group-hover:text-brand-400 shrink-0" />}

                    {link.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          link.isComingSoon
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

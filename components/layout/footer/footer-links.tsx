"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
  statusText?: string;
  dotColor?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

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
      { label: "Workflow Automation", href: "#", statusText: "Available", dotColor: "bg-emerald-400" },
      { label: "AI Copilot", href: "#", statusText: "Planned", dotColor: "bg-fuchsia-400" },
      { label: "Knowledge Graph", href: "#", statusText: "In Development", dotColor: "bg-violet-400" },
      { label: "Predictive Analytics", href: "#", statusText: "Planned", dotColor: "bg-amber-400" },
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
        <div key={col.title}>
          <h4 className="footer-heading mb-4">
            {col.title}
          </h4>

          <ul className="space-y-2.5" role="list">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="footer-link outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
                >
                  <span className="block">
                    <span className="inline-flex items-center gap-1.5">
                      <span>{link.label}</span>
                      {link.external && (
                        <ArrowUpRight className="size-3 text-slate-500 shrink-0" />
                      )}
                      {link.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                          {link.badge}
                        </span>
                      )}
                    </span>

                    {/* Integrated Subtle Status Indicator */}
                    {link.statusText && (
                      <span className="flex items-center gap-1.5 text-[11px] font-normal text-slate-500 mt-0.5">
                        <span className={cn("size-1.5 rounded-full inline-block shrink-0", link.dotColor)} />
                        <span>{link.statusText}</span>
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

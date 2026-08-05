"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { recentLeads } from "@/features/dashboard/mock-data";
import type { Lead } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface LeadsListCardProps {
  leads?: Lead[];
  aiScores?: Record<string, { priority: "High" | "Medium" | "Low"; riskScore: number }>;
  className?: string;
}

export function LeadsListCard({
  leads = recentLeads,
  aiScores,
  className,
}: LeadsListCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [leads]);

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm flex flex-col transition-all duration-300 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10",
        className
      )}
    >
      {/* Glossy Sweep Overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          New Leads
        </h3>
        <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
          View all <ArrowUpRight className="size-3" />
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        {leads.map((lead, i) => {
          const aiMeta = aiScores?.[String(lead.id)] ?? (lead.priority ? { priority: lead.priority, riskScore: lead.riskScore ?? 0 } : undefined);

          return (
            <div
              key={lead.id}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="flex items-center justify-between group/row"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-xs font-bold transition-transform group-hover/row:scale-105",
                    lead.color
                  )}
                >
                  {lead.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground group-hover/row:text-brand-600 transition-colors flex items-center gap-1.5">
                    {lead.name}
                    {aiMeta?.priority === "High" && (
                      <span title="AI High Priority Lead">
                        <Sparkles className="size-3 text-amber-500" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lead.source} • {lead.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                    lead.status === "Hot"
                      ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-900/20"
                      : lead.status === "New"
                      ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-900/20"
                      : lead.status === "Contacted"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/20"
                      : "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-900/20"
                  )}
                >
                  {lead.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

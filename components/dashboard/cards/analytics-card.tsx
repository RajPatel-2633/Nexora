"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Activity, Sparkles } from "lucide-react";
import { analyticsData } from "@/features/dashboard/mock-data";
import type { AnalyticsData, AIInsight } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface AnalyticsCardProps {
  data?: AnalyticsData;
  aiInsight?: AIInsight;
  className?: string;
}

export function AnalyticsCard({
  data = analyticsData,
  aiInsight,
  className,
}: AnalyticsCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animateValue = (
      ref: React.RefObject<HTMLDivElement | null>,
      endValue: number,
      prefix: string = "",
      suffix: string = ""
    ) => {
      if (!ref.current) return;
      const target = { val: 0 };
      gsap.to(target, {
        val: endValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        onUpdate: () => {
          if (ref.current) {
            let formatted = target.val.toFixed(0);
            if (endValue % 1 !== 0) formatted = target.val.toFixed(1);

            if (endValue > 1000000) {
              formatted = (target.val / 100000).toFixed(2);
            }

            ref.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    };

    const ctx = gsap.context(() => {
      animateValue(revenueRef, data.totalRevenue, "₹", "L");
      animateValue(dealsRef, data.activeDeals);
      animateValue(rateRef, data.conversionRate, "", "%");
      animateValue(leadsRef, data.newLeads);
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  const metrics = [
    { label: "Total Revenue", ref: revenueRef, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Deals", ref: dealsRef, icon: Target, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Conversion Rate", ref: rateRef, icon: Activity, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "New Leads", ref: leadsRef, icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10",
        className
      )}
    >
      {/* Glossy Sweep Overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Analytics Overview
        </h3>
        {aiInsight && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
            <Sparkles className="size-3 text-brand-400" />
            {aiInsight.summary}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/5 bg-background/50 p-4 transition-all hover:bg-background/80 hover:border-white/10"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={cn("flex size-8 items-center justify-center rounded-lg", metric.bg, metric.color)}>
                <metric.icon className="size-4" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
            <div ref={metric.ref} className="text-2xl font-bold text-foreground">
              0
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

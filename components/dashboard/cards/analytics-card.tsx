"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TrendingUp, Users, Target, Activity } from "lucide-react";
import { analyticsData } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  className?: string;
}

export function AnalyticsCard({ className }: AnalyticsCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Number counting animation
    const animateValue = (ref: React.RefObject<HTMLDivElement | null>, endValue: number, prefix: string = "", suffix: string = "") => {
      if (!ref.current) return;
      const target = { val: 0 };
      gsap.to(target, {
        val: endValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        onUpdate: () => {
          if (ref.current) {
            let formatted = target.val.toFixed(0);
            if (endValue % 1 !== 0) formatted = target.val.toFixed(1); // For decimals like 24.8
            
            // Format revenue specifically
            if (endValue > 1000000) {
               formatted = (target.val / 100000).toFixed(2);
            }
            
            ref.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        }
      });
    };

    const ctx = gsap.context(() => {
      animateValue(revenueRef, analyticsData.totalRevenue, "₹", "L");
      animateValue(dealsRef, analyticsData.activeDeals);
      animateValue(rateRef, analyticsData.conversionRate, "", "%");
      animateValue(leadsRef, analyticsData.newLeads);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: "Total Revenue", ref: revenueRef, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Deals", ref: dealsRef, icon: Target, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Conversion Rate", ref: rateRef, icon: Activity, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "New Leads", ref: leadsRef, icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Analytics Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="rounded-xl border border-white/5 bg-background/50 p-4 transition-all hover:bg-background">
            <div className="mb-3 flex items-center justify-between">
              <div className={cn("flex size-8 items-center justify-center rounded-lg", metric.bg, metric.color)}>
                <metric.icon className="size-4" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
            <div ref={metric.ref} className="text-2xl font-bold text-foreground">0</div>
          </div>
        ))}
      </div>
    </div>
  );
}

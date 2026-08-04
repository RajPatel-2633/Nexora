"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { recentLeads } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function LeadsListCard({ className }: { className?: string }) {
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
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm flex flex-col", className)}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">New Leads</h3>
        <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
          View all <ArrowUpRight className="size-3" />
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        {recentLeads.map((lead, i) => (
          <div 
            key={lead.id} 
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-9 items-center justify-center rounded-full text-xs font-bold transition-transform group-hover:scale-105", lead.color)}>
                {lead.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground group-hover:text-brand-600 transition-colors">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.source} • {lead.time}</div>
              </div>
            </div>
            
            <div className="text-right">
              <span className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                lead.status === "Hot" ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-900/20" :
                lead.status === "New" ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-900/20" :
                lead.status === "Contacted" ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/20" :
                "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-900/20"
              )}>
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

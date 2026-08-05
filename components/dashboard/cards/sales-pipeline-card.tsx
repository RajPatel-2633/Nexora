"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Filter, Sparkles } from "lucide-react";
import { pipelineData } from "@/features/dashboard/mock-data";
import type { PipelineStage } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface SalesPipelineCardProps {
  data?: PipelineStage[];
  aiRecommendation?: { stage: string; action: string };
  className?: string;
}

export function SalesPipelineCard({
  data = pipelineData,
  aiRecommendation,
  className,
}: SalesPipelineCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current,
        { width: "0%" },
        {
          width: (i) => `${data[i]?.value ?? 0}%`,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

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

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Sales Pipeline
          </h3>
          {aiRecommendation && (
            <p className="mt-1 flex items-center gap-1 text-[10px] text-brand-400 font-medium">
              <Sparkles className="size-3" /> {aiRecommendation.stage}: {aiRecommendation.action}
            </p>
          )}
        </div>
        <button className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Filter className="size-3" /> Filter
        </button>
      </div>

      <div className="space-y-4">
        {data.map((stage, i) => (
          <div key={i} className="relative">
            <div className="mb-1.5 flex justify-between text-xs font-medium">
              <span className="text-foreground/80">{stage.stage}</span>
              <span className="text-muted-foreground">{stage.count}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/50">
              <div
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className={cn(
                  "h-full rounded-full transition-colors",
                  i === 0 ? "bg-blue-400" :
                  i === 1 ? "bg-indigo-400" :
                  i === 2 ? "bg-violet-400" :
                  i === 3 ? "bg-purple-400" :
                  "bg-emerald-400"
                )}
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

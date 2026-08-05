"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { leadWorkflowFixtures, leadListFixtures } from "@/features/dashboard/fixtures/lead-fixtures";
import { useRevealAnimation } from "@/hooks/animations/use-reveal-animation";
import { cn } from "@/lib/utils";

export interface LeadPipelineWidgetProps {
  variant?: "compact" | "default" | "interactive";
  animated?: boolean;
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
  className?: string;
}

export function LeadPipelineWidget({
  variant = "compact",
  animated = true,
  loading = false,
  empty = false,
  error = false,
  className,
}: LeadPipelineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { fillProgress } = useRevealAnimation();

  useEffect(() => {
    if (!animated || !containerRef.current || loading || empty || error) return;
    fillProgress(barsRef.current, [100, 75, 50, 35], 1.2, containerRef.current);
  }, [animated, fillProgress, loading, empty, error]);

  if (loading) {
    return (
      <div className={cn("p-4 bg-background animate-pulse space-y-3", className)}>
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-10 bg-muted/60 rounded-lg" />
        <div className="h-10 bg-muted/60 rounded-lg" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("p-4 bg-background text-foreground", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block mb-0.5">
            Workflow Demo
          </span>
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            Lead Stage Progression
            <Sparkles className="size-3 text-amber-500" />
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <TrendingUp className="size-3" /> +₹75K Revenue
        </span>
      </div>

      {/* Stage Progression Pipeline */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {leadWorkflowFixtures.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={cn(
              "rounded-lg border p-2 text-center transition-all",
              i === 3
                ? "border-emerald-500/30 bg-emerald-500/10 shadow-sm"
                : "border-border bg-muted/30"
            )}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-[9px] font-bold text-muted-foreground truncate">{stage.name}</span>
              {i === 3 && <CheckCircle2 className="size-3 text-emerald-500" />}
            </div>
            <div className="text-xs font-extrabold text-foreground">{stage.revenue}</div>
            <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className={cn(
                  "h-full rounded-full transition-all",
                  i === 3 ? "bg-emerald-500" : "bg-blue-500"
                )}
                style={{ width: animated ? "0%" : `${100 - i * 20}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lead Rows */}
      <div className="space-y-2">
        {leadListFixtures.slice(0, variant === "compact" ? 2 : 3).map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between rounded-lg border bg-card/60 p-2 text-xs transition-colors hover:bg-card"
          >
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-[10px]">
                {lead.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground">{lead.name}</div>
                <div className="text-[10px] text-muted-foreground">{lead.source}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[9px] font-semibold border border-emerald-500/20">
                {lead.status} ({lead.value})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

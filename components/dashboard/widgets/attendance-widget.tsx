"use client";

import { useEffect, useRef } from "react";
import { UserCheck, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { attendanceFixtures } from "@/features/dashboard/fixtures/attendance-fixtures";
import { useRevealAnimation } from "@/hooks/animations/use-reveal-animation";
import { cn } from "@/lib/utils";

export interface AttendanceWidgetProps {
  variant?: "compact" | "default" | "interactive";
  animated?: boolean;
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
  className?: string;
}

export function AttendanceWidget({
  animated = true,
  loading = false,
  empty = false,
  error = false,
  className,
}: AttendanceWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { growBars } = useRevealAnimation();

  useEffect(() => {
    if (!animated || !containerRef.current || loading || empty || error) return;
    const heights = attendanceFixtures.weeklyGrid.map((d) => d.presentPct);
    growBars(barsRef.current, heights, 1.2, containerRef.current);
  }, [animated, growBars, loading, empty, error]);

  if (loading) {
    return (
      <div className={cn("p-4 bg-background animate-pulse space-y-3", className)}>
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-16 bg-muted/60 rounded-lg" />
      </div>
    );
  }

  const workflowSteps = [
    { label: "Check-in", done: true, icon: Clock },
    { label: "Attendance 82%", done: true, icon: UserCheck },
    { label: "Approved", done: true, icon: CheckCircle2 },
    { label: "Payroll Ready", done: true, icon: ShieldCheck },
  ];

  return (
    <div ref={containerRef} className={cn("p-4 bg-background text-foreground", className)}>
      {/* Header & Workflow Banner */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-0.5">
            HRMS Workflow
          </span>
          <h4 className="text-xs font-semibold text-foreground">Attendance & Payroll Sync</h4>
        </div>
        <span className="text-[10px] font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
          Payroll Ready
        </span>
      </div>

      {/* Workflow Step Chips */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        {workflowSteps.map((step, i) => (
          <div
            key={i}
            className="flex items-center justify-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 py-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400"
          >
            <step.icon className="size-2.5" />
            <span className="truncate">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Weekly Grid & Bar Chart */}
      <div className="rounded-xl border bg-card/60 p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-muted-foreground">Weekly Trend</span>
          <span className="font-bold text-emerald-500">82% Present</span>
        </div>

        <div className="flex items-end gap-2 h-14 pt-2">
          {attendanceFixtures.weeklyGrid.map((item, i) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div className="w-full bg-emerald-500/15 rounded-t-sm overflow-hidden flex items-end h-full">
                <div
                  ref={(el) => {
                    barsRef.current[i] = el;
                  }}
                  className="w-full bg-emerald-500 rounded-t-sm transition-all"
                  style={{ height: animated ? "0%" : `${item.presentPct}%` }}
                />
              </div>
              <span className="text-[9px] font-medium text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

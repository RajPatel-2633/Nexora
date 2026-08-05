"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { attendanceData } from "@/features/dashboard/mock-data";
import type { AttendanceData, AIInsight } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface HRAttendanceCardProps {
  data?: AttendanceData;
  aiInsight?: AIInsight;
  className?: string;
}

export function HRAttendanceCard({
  data = attendanceData,
  aiInsight,
  className,
}: HRAttendanceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current,
        { height: "0%" },
        {
          height: (i) => `${data.weeklyTrend[i] ?? 0}%`,
          duration: 1,
          ease: "back.out(1.2)",
          stagger: 0.05,
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
        "group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm flex flex-col transition-all duration-300 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10",
        className
      )}
    >
      {/* Glossy Sweep Overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Today&apos;s Attendance
        </h3>
        {aiInsight && (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <Sparkles className="size-3" />
            {aiInsight.summary}
          </span>
        )}
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Present</div>
          <div className="text-2xl font-bold text-emerald-500 flex items-baseline gap-1">
            {data.present}% <span className="text-xs text-emerald-500/70 font-medium">(118)</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Absent</div>
          <div className="text-2xl font-bold text-rose-500 flex items-baseline gap-1">
            {data.absent}% <span className="text-xs text-rose-500/70 font-medium">(17)</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Leave</div>
          <div className="text-2xl font-bold text-amber-500 flex items-baseline gap-1">
            {data.leave}% <span className="text-xs text-amber-500/70 font-medium">(9)</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs text-muted-foreground mb-2 font-medium">Weekly Trend</div>
        <div className="flex items-end gap-2 h-20">
          {data.weeklyTrend.map((_, i) => (
            <div key={i} className="flex-1 bg-emerald-500/10 rounded-t-md overflow-hidden flex items-end group/bar">
              <div
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className="w-full bg-emerald-500 rounded-t-md transition-colors group-hover/bar:bg-emerald-400"
                style={{ height: "0%" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </motion.div>
  );
}

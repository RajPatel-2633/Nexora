"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { attendanceData } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function HRAttendanceCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current,
        { height: "0%" },
        {
          height: (i) => `${attendanceData.weeklyTrend[i]}%`,
          duration: 1,
          ease: "back.out(1.2)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm flex flex-col", className)}>
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Today&apos;s Attendance</h3>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Present</div>
          <div className="text-2xl font-bold text-emerald-500 flex items-baseline gap-1">
            {attendanceData.present}% <span className="text-xs text-emerald-500/70 font-medium">(118)</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Absent</div>
          <div className="text-2xl font-bold text-rose-500 flex items-baseline gap-1">
            {attendanceData.absent}% <span className="text-xs text-rose-500/70 font-medium">(17)</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Leave</div>
          <div className="text-2xl font-bold text-amber-500 flex items-baseline gap-1">
            {attendanceData.leave}% <span className="text-xs text-amber-500/70 font-medium">(9)</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs text-muted-foreground mb-2 font-medium">Weekly Trend</div>
        <div className="flex items-end gap-2 h-20">
          {attendanceData.weeklyTrend.map((h, i) => (
            <div key={i} className="flex-1 bg-emerald-500/10 rounded-t-md overflow-hidden flex items-end group">
              <div 
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className="w-full bg-emerald-500 rounded-t-md transition-colors group-hover:bg-emerald-400" 
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
    </div>
  );
}

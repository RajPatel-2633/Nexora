"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Filter } from "lucide-react";
import { pipelineData } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function SalesPipelineCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current,
        { width: "0%" },
        {
          width: (i) => `${pipelineData[i].value}%`,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.15,
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
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sales Pipeline</h3>
        <button className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Filter className="size-3" /> Filter
        </button>
      </div>

      <div className="space-y-4">
        {pipelineData.map((stage, i) => (
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
    </div>
  );
}

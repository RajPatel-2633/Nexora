"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { MoreHorizontal, Sparkles } from "lucide-react";
import { revenueData } from "@/features/dashboard/mock-data";
import type { RevenueDataPoint, AIInsight } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface RevenueChartCardProps {
  data?: RevenueDataPoint[];
  aiInsight?: AIInsight;
  className?: string;
}

export function RevenueChartCard({
  data = revenueData,
  aiInsight,
  className,
}: RevenueChartCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<(SVGCircleElement | null)[]>([]);
  const areaRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current || !areaRef.current) return;

    const length = pathRef.current.getTotalLength();

    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(areaRef.current, { opacity: 0, y: 20 });
    gsap.set(pointsRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .to(
          areaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          pointsRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  const width = 300;
  const height = 120;
  const padding = 10;

  const minVal = Math.min(...data.map((d) => d.revenue));
  const maxVal = Math.max(...data.map((d) => d.revenue));

  const getX = (index: number) => padding + (index * (width - padding * 2)) / (data.length - 1);
  const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);

  const pathData = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.revenue)}`).join(" ");
  const areaPathData = `${pathData} L ${getX(data.length - 1)} ${height} L ${getX(0)} ${height} Z`;

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

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Revenue Overview
          </h3>
          {aiInsight && (
            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Sparkles className="size-3" />
              {aiInsight.summary}
            </span>
          )}
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      <div className="mb-6">
        <div className="text-2xl font-bold text-foreground">₹12.45L</div>
        <div className="text-xs text-emerald-500 font-medium mt-1">+18.4% from last month</div>
      </div>

      <div className="mt-auto h-[120px] w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path ref={areaRef} d={areaPathData} fill="url(#revenue-gradient)" className="transition-all" />

          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((d, i) => (
            <circle
              key={i}
              ref={(el) => {
                pointsRef.current[i] = el;
              }}
              cx={getX(i)}
              cy={getY(d.revenue)}
              r="4"
              fill="#ffffff"
              stroke="#6366f1"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        {data.filter((_, i) => i % 2 === 0).map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </motion.div>
  );
}

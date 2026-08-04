"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoreHorizontal } from "lucide-react";
import { revenueData } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function RevenueChartCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<(SVGCircleElement | null)[]>([]);
  const areaRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current || !areaRef.current) return;

    const length = pathRef.current.getTotalLength();
    
    // Initial setup
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(areaRef.current, { opacity: 0, y: 20 });
    gsap.set(pointsRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(areaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.8")
      .to(pointsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Simple hardcoded SVG generation based on revenueData
  const width = 300;
  const height = 120;
  const padding = 10;
  
  const minVal = Math.min(...revenueData.map(d => d.revenue));
  const maxVal = Math.max(...revenueData.map(d => d.revenue));
  
  const getX = (index: number) => padding + (index * (width - padding * 2)) / (revenueData.length - 1);
  const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);

  const pathData = revenueData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.revenue)}`).join(" ");
  // Close the path for the area gradient
  const areaPathData = `${pathData} L ${getX(revenueData.length - 1)} ${height} L ${getX(0)} ${height} Z`;

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm flex flex-col", className)}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Revenue Overview</h3>
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
          
          <path
            ref={areaRef}
            d={areaPathData}
            fill="url(#revenue-gradient)"
            className="transition-all"
          />
          
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {revenueData.map((d, i) => (
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
      
      {/* X Axis Labels */}
      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        {revenueData.filter((_, i) => i % 2 === 0).map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { HeroDashboardSidebar } from "./hero-dashboard-sidebar";
import { HeroStatCards } from "./hero-stat-cards";
import { HeroPipelineChart } from "./hero-pipeline-chart";
import { HeroRevenueChart } from "./hero-revenue-chart";
import { cn } from "@/lib/utils";

export function HeroDashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F1117]/80 shadow-2xl backdrop-blur-xl lg:rounded-3xl",
        className
      )}
    >
      <HeroDashboardSidebar />

      <div className="min-w-0 flex-1 bg-[#F9FAFB] p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Dashboard</p>
            <p className="text-[9px] text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex size-7 items-center justify-center rounded-full bg-[#6366F1] text-[10px] font-bold text-white">
            A
          </div>
        </div>

        <HeroStatCards className="mb-3" />

        <div className="grid gap-3 lg:grid-cols-2">
          <HeroPipelineChart />
          <HeroRevenueChart />
        </div>
      </div>
    </div>
  );
}

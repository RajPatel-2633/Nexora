"use client";

import { sidebarItems } from "@/features/marketing/hero-data";
import { cn } from "@/lib/utils";

export function HeroDashboardSidebar() {
  return (
    <aside className="hidden w-[52px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0B0D17] py-4 sm:flex lg:w-[180px]">
      <div className="mb-4 flex items-center gap-2 px-3 lg:px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4338CA]">
          <span className="text-[10px] font-bold text-white">N</span>
        </div>
        <span className="hidden text-xs font-semibold text-white lg:inline">
          Nexora
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="Dashboard navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] transition-colors",
                item.active
                  ? "bg-[#6366F1]/20 text-[#A5B4FC]"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white/60"
              )}
              title={item.label}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden truncate lg:inline">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

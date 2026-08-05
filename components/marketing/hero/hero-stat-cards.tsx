"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { heroStats, type HeroStat } from "@/features/marketing/hero-data";
import { scaleInVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

type HeroStatCardsProps = {
  stats?: HeroStat[];
  className?: string;
};

export function HeroStatCards({ stats = heroStats, className }: HeroStatCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3", className)}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="rounded-xl border border-black/[0.06] bg-white p-3 shadow-sm"
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 + i * 0.08 }}
        >
          <p className="text-[10px] font-medium text-gray-500">{stat.label}</p>
          <p className="mt-1 text-lg font-bold tracking-tight text-gray-900">
            {stat.value}
          </p>
          <div
            className={cn(
              "mt-1 flex items-center gap-0.5 text-[10px] font-medium",
              stat.positive ? "text-emerald-600" : "text-red-500"
            )}
          >
            {stat.positive ? (
              <TrendingUp className="size-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="size-3" aria-hidden="true" />
            )}
            {stat.change}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

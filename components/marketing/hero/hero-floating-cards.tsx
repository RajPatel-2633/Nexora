"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { floatingCards } from "@/features/marketing/hero-data";
import { useFloatingAnimation } from "@/hooks/animations/use-floating-animation";
import { cn } from "@/lib/utils";

const positionClasses = {
  "top-right": "absolute -right-3 -top-3 z-20 sm:-right-6 sm:-top-4",
  "bottom-left": "absolute -bottom-3 -left-3 z-20 sm:-bottom-4 sm:-left-6",
};

const icons = {
  conversion: TrendingUp,
  "active-users": Users,
};

type FloatingCardProps = {
  id: string;
  label: string;
  value: string;
  change: string;
  position: keyof typeof positionClasses;
  delay?: number;
};

function FloatingCard({
  id,
  label,
  value,
  change,
  position,
  delay = 0,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = icons[id as keyof typeof icons] ?? TrendingUp;

  useFloatingAnimation(ref, {
    y: position === "top-right" ? 8 : 6,
    duration: 3.5 + delay,
    delay,
    rotation: position === "bottom-left" ? 1 : -1,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        positionClasses[position],
        "w-36 rounded-xl border border-black/[0.06] bg-white p-3 shadow-lg sm:w-40"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delay, duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
          <Icon className="size-3.5 text-[#6366F1]" aria-hidden="true" />
        </div>
        <span className="text-[9px] font-medium text-gray-500">{label}</span>
      </div>
      <p className="mt-1.5 text-base font-bold text-gray-900">{value}</p>
      <p className="text-[9px] font-medium text-emerald-600">{change}</p>
    </motion.div>
  );
}

export function HeroFloatingCards() {
  return (
    <>
      {floatingCards.map((card, i) => (
        <FloatingCard key={card.id} {...card} delay={i * 0.5} />
      ))}
    </>
  );
}

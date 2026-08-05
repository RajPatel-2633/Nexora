"use client";

import { motion } from "framer-motion";
import { Bell, UserPlus, Trophy } from "lucide-react";
import { notifications, type Notification } from "@/features/marketing/hero-data";
import { cn } from "@/lib/utils";

const iconMap = {
  lead: UserPlus,
  deal: Trophy,
  invoice: Bell,
};

const colorMap = {
  lead: "bg-blue-50 text-blue-600",
  deal: "bg-emerald-50 text-emerald-600",
  invoice: "bg-violet-50 text-violet-600",
};

type HeroNotificationsProps = {
  data?: Notification[];
  className?: string;
};

export function HeroNotifications({ data = notifications, className }: HeroNotificationsProps) {
  return (
    <motion.div
      className={cn(
        "absolute -right-2 top-16 z-20 w-56 rounded-xl border border-black/[0.06] bg-white p-3 shadow-lg sm:-right-4 sm:w-64",
        className
      )}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-0.5, 0.5, -0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-900">
          Notifications
        </span>
        <span className="flex size-4 items-center justify-center rounded-full bg-[#6366F1] text-[9px] font-bold text-white">
          {data.length}
        </span>
      </div>
      <div className="space-y-2">
        {data.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <div
              key={n.title}
              className="flex gap-2.5 rounded-lg bg-gray-50/80 p-2"
            >
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg",
                  colorMap[n.type]
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-gray-900">
                  {n.title}
                </p>
                <p className="truncate text-[9px] text-gray-500">{n.message}</p>
                <p className="mt-0.5 text-[8px] text-gray-400">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      </motion.div>
    </motion.div>
  );
}

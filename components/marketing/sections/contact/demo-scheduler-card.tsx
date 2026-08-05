"use client";

import { motion } from "framer-motion";
import { Calendar, Video, Clock } from "lucide-react";

export function DemoSchedulerCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg group hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Next Available Slot
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          <Clock className="size-3 text-brand-400" />
          <span>30 min Demo</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="size-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Tomorrow, 2:30 PM EST</div>
            <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
              <Video className="size-3 text-purple-400" />
              <span>Google Meet Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

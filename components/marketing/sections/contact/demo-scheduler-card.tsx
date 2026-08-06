"use client";

import { motion } from "framer-motion";
import { Calendar, Video, Clock } from "lucide-react";

export function DemoSchedulerCard() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="p-3.5 px-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 backdrop-blur-md shadow-sm mb-5 group hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-400">
            Available for a demo
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-white/60 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
          <Clock className="size-3 text-brand-400" />
          <span>30 min Demo</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="size-4" />
          </div>
          <div>
            <div className="text-xs md:text-sm font-semibold text-white">Tomorrow • 2:30 PM EST</div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5 mt-0.5">
              <Video className="size-3 text-purple-400" />
              <span>Google Meet Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

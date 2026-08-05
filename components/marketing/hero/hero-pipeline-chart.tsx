"use client";

import { motion } from "framer-motion";
import { pipelineStages, type PipelineStage } from "@/features/marketing/hero-data";
import { fadeUpVariants } from "@/lib/animations/variants";

type HeroPipelineChartProps = {
  stages?: PipelineStage[];
};

export function HeroPipelineChart({ stages = pipelineStages }: HeroPipelineChartProps) {
  return (
    <motion.div
      className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm"
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.7 }}
    >
      <h3 className="text-xs font-semibold text-gray-900">Sales Pipeline</h3>
      <div className="mt-3 space-y-2">
        {stages.map((stage) => (
          <div key={stage.label} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-[10px] text-gray-500">
              {stage.label}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-gray-100">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-[#6366F1] to-[#818CF8]"
                initial={{ width: 0 }}
                animate={{ width: `${stage.width}%` }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-[10px] font-medium text-gray-700">
              {stage.count}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

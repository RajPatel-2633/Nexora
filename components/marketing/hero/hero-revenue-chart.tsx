"use client";

import { motion } from "framer-motion";
import { revenueData } from "@/features/marketing/hero-data";
import { fadeUpVariants } from "@/lib/animations/variants";

function buildPath(data: typeof revenueData, width: number, height: number) {
  const max = Math.max(...data.map((d) => d.value));
  const padding = 8;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * innerW,
    y: padding + innerH - (d.value / max) * innerH,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return { line, area, points };
}

export function HeroRevenueChart() {
  const w = 280;
  const h = 120;
  const { line, area, points } = buildPath(revenueData, w, h);

  return (
    <motion.div
      className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm"
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.75 }}
    >
      <h3 className="text-xs font-semibold text-gray-900">Revenue Overview</h3>
      <div className="mt-2">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-auto w-full"
          aria-label="Revenue chart showing upward trend from March to August"
          role="img"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#revenueGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={revenueData[i].month}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#6366F1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.05 }}
            />
          ))}
        </svg>
        <div className="mt-1 flex justify-between px-1">
          {revenueData.map((d) => (
            <span key={d.month} className="text-[9px] text-gray-400">
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

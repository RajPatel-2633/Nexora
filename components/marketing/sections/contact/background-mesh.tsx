"use client";

import { motion } from "framer-motion";

export function BackgroundMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Calm Ambient Radial Blobs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 size-[550px] bg-brand-600/20 rounded-full blur-[140px] -translate-y-1/3"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/4 size-[600px] bg-violet-600/15 rounded-full blur-[160px] translate-y-1/3"
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}

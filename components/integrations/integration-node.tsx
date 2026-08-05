"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import type { ConnectionType } from "@/features/integrations/integrations-config";
import { cn } from "@/lib/utils";

export type IntegrationNodeProps = {
  id: string;
  name: string;
  logo: React.ReactNode;
  brandColor: string;
  connectionType: ConnectionType | string;
  position?: { top: string; left: string } | { x: number; y: number };
  description: string;
  isFeatured?: boolean;
  href?: string;
  isConnected?: boolean;
  variant?: "orbital" | "card"; // Orbital for landing hero/showcase, card for CRM management
  onHoverChange?: (isHovered: boolean) => void;
  className?: string;
};

export function IntegrationNode({
  id,
  name,
  logo,
  brandColor,
  connectionType,
  position,
  description,
  isFeatured,
  href = "#",
  isConnected = false,
  variant = "orbital",
  onHoverChange,
  className,
}: IntegrationNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  // Orbital Display Variant (Used in Marketing Landing Page Orbit)
  if (variant === "orbital") {
    const styleObj = position
      ? "top" in position
        ? { top: position.top, left: position.left }
        : { left: `${position.x}%`, top: `${position.y}%` }
      : undefined;

    return (
      <motion.div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          isHovered ? "z-50" : "z-20",
          className
        )}
        style={styleObj}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3.5 + (id.length % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: (id.length % 5) * 0.4,
        }}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative flex flex-col items-center justify-center cursor-pointer"
        >
          {/* Dynamic Brand Glow Field on Hover */}
          <div
            className="absolute inset-0 -m-3 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40"
            style={{ backgroundColor: brandColor }}
          />

          {/* Featured Ribbon Halo */}
          {isFeatured && (
            <span
              className="absolute -top-1 -right-1 z-30 size-3.5 rounded-full ring-4 ring-background"
              style={{ backgroundColor: brandColor }}
            />
          )}

          {/* Main Icon Card Container */}
          <motion.div
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="relative flex size-14 md:size-16 items-center justify-center rounded-2xl border border-white/10 bg-card/90 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:shadow-2xl"
            style={{
              boxShadow: isHovered
                ? `0 12px 30px -6px ${brandColor}40`
                : "0 4px 20px -2px rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {logo}
            </div>
          </motion.div>

          {/* Hover Tooltip Card (Positioned ABOVE logo) */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : -8,
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute bottom-full mb-3 z-50 w-48 rounded-xl border border-white/15 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">{name}</span>
              <span
                className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                style={{
                  color: brandColor,
                  borderColor: `${brandColor}40`,
                  backgroundColor: `${brandColor}15`,
                }}
              >
                {connectionType}
              </span>
            </div>
            <p className="text-[10px] text-slate-300 leading-tight">{description}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Dashboard Management Card Variant (Used inside /app/(dashboard)/integrations)
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-card/80 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-background shadow-md transition-transform group-hover:scale-105"
              style={{ color: brandColor }}
            >
              {logo}
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground flex items-center gap-1.5">
                {name}
                {isConnected && <CheckCircle2 className="size-4 text-emerald-500" />}
              </h4>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border inline-block mt-0.5"
                style={{
                  color: brandColor,
                  borderColor: `${brandColor}40`,
                  backgroundColor: `${brandColor}15`,
                }}
              >
                {connectionType}
              </span>
            </div>
          </div>

          {isFeatured && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Zap className="size-3" /> Featured
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <ShieldCheck className="size-3.5 text-emerald-400" /> SSL Encrypted
        </span>
        <a
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
        >
          {isConnected ? "Configure" : "Connect"} <ExternalLink className="size-3" />
        </a>
      </div>
    </motion.div>
  );
}

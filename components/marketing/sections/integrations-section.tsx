"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hexagon, Sparkles, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { inputIntegrationsConfig, outputModulesConfig } from "@/features/integrations/integrations-config";
import { IntegrationNode } from "@/components/integrations/integration-node";
import { brandLogoMap } from "@/components/integrations/brand-icons";
import { useReducedMotion } from "@/hooks/animations/use-reduced-motion";
import { MOTION_TOKENS } from "@/lib/animations/motion-tokens";
import { useDataFlow } from "@/hooks/useDataFlow";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sampleActivityFeed = [
  { source: "META ADS", dest: "SALES CRM", msg: "New buyer lead captured & assigned to team", cat: "Lead" },
  { source: "GOOGLE ADS", dest: "ANALYTICS", msg: "Click conversion attributed to Campaign #4", cat: "Click" },
  { source: "WHATSAPP", dest: "AUTO REPLY", msg: "Template response sent to buyer (+1800...)", cat: "Message" },
  { source: "INDIAMART", dest: "SALES CRM", msg: "B2B inquiry auto-routed to regional manager", cat: "Inquiry" },
  { source: "99ACRES", dest: "INVOICING", msg: "Site visit confirmed & deposit receipt generated", cat: "Invoice" },
];

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const middleRingRef = useRef<HTMLDivElement>(null);
  const innerPulseRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(2650);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  // Data Flow Lifecycle Hook
  const { packets } = useDataFlow(!reducedMotion);

  // Live count incrementer (Natural +1 every 3s)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Single line log rotator (Fades log every 3.5s)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % sampleActivityFeed.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Dual Counter-Rotating Core Rings (Slow 25s & 18s)
      gsap.to(outerRingRef.current, {
        rotate: 360,
        duration: MOTION_TOKENS.duration.ringOuter,
        repeat: -1,
        ease: "none",
      });

      gsap.to(middleRingRef.current, {
        rotate: -360,
        duration: MOTION_TOKENS.duration.ringMiddle,
        repeat: -1,
        ease: "none",
      });

      // 2. Inner Breathing Pulse
      gsap.to(innerPulseRef.current, {
        scale: 1.25,
        opacity: 0,
        duration: MOTION_TOKENS.duration.pulseInner,
        repeat: -1,
        ease: "power2.out",
      });

      // 3. Section Entrance Reveal Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        centerNodeRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: MOTION_TOKENS.easing.backOut }
      ).fromTo(
        ".network-node",
        { scale: 0.8, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: MOTION_TOKENS.easing.power2Out },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const currentLog = sampleActivityFeed[activeLogIndex];

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="section-light-alt section-md relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.12) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="nexora-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 section-label text-brand-600 mb-3">
            <Sparkles className="size-3.5 text-brand-500" /> Unified Data Layer
          </span>
          <h2 className="heading-xl text-foreground mb-4">
            Every Lead Source. One Intelligent Workspace.
          </h2>
          <p className="body-lg text-slate-600">
            Connect Meta, IndiaMART, Housing.com, 99acres, and WhatsApp — automatically route and enrich leads into your CRM.
          </p>
        </div>

        {/* Network Graph Container (Increased vertical padding to eliminate node overlap) */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-5xl w-full min-h-[520px] md:min-h-[580px] flex items-center justify-between px-2 md:px-8"
        >
          {/* Layer 3: Connection Paths SVG Overlay */}
          <svg className="absolute inset-0 size-full pointer-events-none z-10">
            {/* Input Paths -> Center (Subtle organic path offsets) */}
            {inputIntegrationsConfig.map((item, i) => {
              const total = inputIntegrationsConfig.length;
              const yPct = 10 + (i / (total - 1)) * 80;
              const offsetPct = (i % 2 === 0 ? -1.5 : 1.5);
              const pillY = yPct + offsetPct;
              const isHovered = hoveredId === item.id;
              const isOtherHovered = hoveredId !== null && !isHovered;

              return (
                <g key={`path-${item.id}`} className={isOtherHovered ? "opacity-25 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300"}>
                  <path
                    d={`M 15% ${yPct}% C 32% ${pillY}%, 38% 50%, 50% 50%`}
                    fill="none"
                    stroke={isHovered ? item.brandColor : "rgba(99,102,241,0.25)"}
                    strokeWidth={isHovered ? "3" : "1.5"}
                    strokeDasharray={isHovered ? undefined : "4 4"}
                    className="transition-all duration-300"
                  />
                  {/* High-Contrast Glass Pill Connection Label (12px, font-medium 500) */}
                  {item.connectionLabel && (
                    <g className="transition-all duration-300">
                      <rect
                        x="23%"
                        y={`${pillY - 2.8}%`}
                        width="84"
                        height="22"
                        rx="11"
                        fill={isHovered ? item.brandColor : "rgba(255, 255, 255, 0.92)"}
                        stroke={isHovered ? item.brandColor : "rgba(203, 213, 225, 0.85)"}
                        strokeWidth="1.2"
                        className="backdrop-blur-md shadow-sm"
                      />
                      <text
                        x="23%"
                        y={`${pillY - 2.8}%`}
                        dx="42"
                        dy="14.5"
                        textAnchor="middle"
                        fill={isHovered ? "#ffffff" : "#1E293B"}
                        fontSize="11.5"
                        fontWeight="500"
                        className="pointer-events-none tracking-tight"
                      >
                        {item.connectionLabel}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Center -> Output Paths */}
            {outputModulesConfig.map((item, i) => {
              const total = outputModulesConfig.length;
              const yPct = 18 + (i / (total - 1)) * 64;
              const offsetPct = (i % 2 === 0 ? 1.5 : -1.5);
              const pillY = yPct + offsetPct;
              const isHovered = hoveredId === item.id;
              const isOtherHovered = hoveredId !== null && !isHovered;

              return (
                <g key={`outpath-${item.id}`} className={isOtherHovered ? "opacity-25 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300"}>
                  <path
                    d={`M 50% 50% C 62% 50%, 68% ${pillY}%, 85% ${yPct}%`}
                    fill="none"
                    stroke={isHovered ? item.brandColor : "rgba(168,85,247,0.25)"}
                    strokeWidth={isHovered ? "3" : "1.5"}
                    strokeDasharray={isHovered ? undefined : "4 4"}
                    className="transition-all duration-300"
                  />
                  {item.connectionLabel && (
                    <g className="transition-all duration-300">
                      <rect
                        x="64%"
                        y={`${pillY - 2.8}%`}
                        width="96"
                        height="22"
                        rx="11"
                        fill={isHovered ? item.brandColor : "rgba(255, 255, 255, 0.92)"}
                        stroke={isHovered ? item.brandColor : "rgba(203, 213, 225, 0.85)"}
                        strokeWidth="1.2"
                        className="backdrop-blur-md shadow-sm"
                      />
                      <text
                        x="64%"
                        y={`${pillY - 2.8}%`}
                        dx="48"
                        dy="14.5"
                        textAnchor="middle"
                        fill={isHovered ? "#ffffff" : "#1E293B"}
                        fontSize="11.5"
                        fontWeight="500"
                        className="pointer-events-none tracking-tight"
                      >
                        {item.connectionLabel}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Layer 4: Data Packet Travel along SVG Paths (3.4s) */}
            {!reducedMotion &&
              packets.map((pkt) => {
                const config = MOTION_TOKENS.categoryColors[pkt.category];
                return (
                  <circle
                    key={pkt.id}
                    r="3.5"
                    fill={config.color}
                    className="transition-all"
                    style={{
                      filter: `drop-shadow(0 0 6px ${config.color})`,
                    }}
                  >
                    <animate
                      attributeName="cx"
                      values="15%;50%;85%"
                      dur="3.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="30%;50%;70%"
                      dur="3.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
          </svg>

          {/* Left Inputs Column (Lead Sources) */}
          <div className="relative z-20 flex flex-col justify-between h-[480px] md:h-[540px] w-48">
            {inputIntegrationsConfig.map((item) => {
              const isHovered = hoveredId === item.id;
              const isOtherHovered = hoveredId !== null && !isHovered;

              return (
                <div
                  key={item.id}
                  className="network-node relative flex items-center"
                >
                  <IntegrationNode
                    id={item.id}
                    name={item.name}
                    logo={brandLogoMap[item.id]}
                    brandColor={item.brandColor}
                    connectionType={item.connectionType}
                    description={item.description}
                    isFeatured={item.isFeatured}
                    isDimmed={isOtherHovered}
                    variant="orbital"
                    onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
                    className="!static !translate-x-0 !translate-y-0"
                  />
                </div>
              );
            })}
          </div>

          {/* Center Hub: Nexora Engine */}
          <div
            ref={centerNodeRef}
            className="group relative z-30 flex size-36 md:size-44 flex-col items-center justify-center rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white shadow-2xl ring-8 ring-brand-500/20 transition-all duration-500 hover:scale-105 hover:ring-brand-500/40 cursor-pointer"
          >
            {/* Ring 1: Outer Rotating Ring (25s) */}
            <div
              ref={outerRingRef}
              className="pointer-events-none absolute inset-[-12px] rounded-full border border-dashed border-brand-500/30"
            />

            {/* Ring 2: Middle Counter-Rotating Ring (18s) */}
            <div
              ref={middleRingRef}
              className="pointer-events-none absolute inset-[-6px] rounded-full border border-dotted border-purple-500/40"
            />

            {/* Ring 3: Inner Breathing Pulse */}
            <div
              ref={innerPulseRef}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand-400/50"
            />

            <Hexagon className="relative z-10 size-8 md:size-10 mb-0.5 text-brand-400 transition-transform group-hover:rotate-12" />
            <span className="relative z-10 text-xs md:text-sm font-bold tracking-tight text-white">
              Nexora
            </span>
            <span className="relative z-10 text-xs md:text-[13px] font-semibold text-brand-300 tracking-wide mt-0.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30">
              Nexora Engine
            </span>

            {/* Separated Live Counter Badge (28-32px number over 12px Events Processed title case) */}
            <div className="absolute -bottom-10 z-40 whitespace-nowrap rounded-2xl border border-white/15 bg-slate-950/95 px-4 py-2 text-center shadow-2xl backdrop-blur-md flex flex-col items-center justify-center min-w-[140px]">
              <div className="text-xl md:text-2xl font-bold text-emerald-400 flex items-center gap-1.5 leading-none">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{liveCount.toLocaleString()}</span>
              </div>
              <div className="h-[1px] w-12 bg-white/15 my-1" />
              <div className="text-xs font-medium text-slate-300">
                Events Processed
              </div>
            </div>
          </div>

          {/* Right Outputs Column (Business Modules) */}
          <div className="relative z-20 flex flex-col justify-between h-[380px] md:h-[440px] w-48">
            {outputModulesConfig.map((item) => {
              const isHovered = hoveredId === item.id;
              const isOtherHovered = hoveredId !== null && !isHovered;

              return (
                <div
                  key={item.id}
                  className="network-node relative flex items-center justify-end"
                >
                  <IntegrationNode
                    id={item.id}
                    name={item.name}
                    logo={brandLogoMap[item.id]}
                    brandColor={item.brandColor}
                    connectionType={item.connectionType}
                    description={item.description}
                    isDimmed={isOtherHovered}
                    variant="orbital"
                    onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
                    className="!static !translate-x-0 !translate-y-0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleek Single-Line Fading Activity Feed Log */}
        <div className="mt-16 max-w-xl mx-auto rounded-full border border-white/10 bg-slate-950/90 px-4 py-2.5 shadow-xl backdrop-blur-xl flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <Terminal className="size-3.5 text-brand-400" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Live Feed</span>
          </div>

          <div className="flex-1 overflow-hidden text-center px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLogIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 text-xs truncate"
              >
                <span className="text-brand-300 font-semibold">{currentLog.source}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-purple-300 font-semibold">{currentLog.dest}</span>
                <span className="text-slate-400 text-[11px] truncate max-w-[220px]">&mdash; {currentLog.msg}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Streaming</span>
          </div>
        </div>

        {/* Ecosystem Footer CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-muted/30 px-4 py-1.5 rounded-full border border-white/5 mb-4">
            <ShieldCheck className="size-4 text-emerald-500" /> 256-bit Encrypted Real-Time Webhooks & OAuth 2.0
          </div>
          <br />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-300 hover:bg-brand-500 hover:shadow-brand-lg hover:gap-3"
          >
            Explore All Integrations <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

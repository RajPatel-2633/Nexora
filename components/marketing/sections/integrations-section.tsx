"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hexagon, Sparkles, ArrowRight, ShieldCheck, Terminal } from "lucide-react";

import { inputIntegrationsConfig, outputModulesConfig } from "@/features/integrations/integrations-config";
import { IntegrationNode } from "@/components/integrations/integration-node";
import { brandLogoMap } from "@/components/integrations/brand-icons";
import { useReducedMotion } from "@/hooks/animations/use-reduced-motion";
import { MOTION_TOKENS } from "@/lib/animations/motion-tokens";
import { useDataFlow } from "@/hooks/useDataFlow";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const middleRingRef = useRef<HTMLDivElement>(null);
  const innerPulseRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  // Data Flow Lifecycle Hook
  const { packets, processedCount, logs } = useDataFlow(!reducedMotion);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Dual Counter-Rotating Core Rings
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

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="section-light-alt section-md relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Layer 1: Deep Multi-Layer Background (Mesh & Glow Grid) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.15) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="nexora-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 tracking-wider uppercase mb-3">
            <Sparkles className="size-3.5 text-brand-500" /> Unified Data Layer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Every Lead Source. One Intelligent Workspace.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Connect Facebook Lead Ads, IndiaMART, 99acres, Housing, Google Ads, WhatsApp and dozens of other platforms into a single AI-powered workflow.
          </p>
        </div>

        {/* Network Graph Container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-5xl w-full min-h-[480px] md:min-h-[560px] flex items-center justify-between px-2 md:px-8"
        >
          {/* Layer 3: Connection Paths SVG Overlay */}
          <svg className="absolute inset-0 size-full pointer-events-none z-10">
            <defs>
              <linearGradient id="path-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Input Paths -> Center */}
            {inputIntegrationsConfig.map((item, i) => {
              const total = inputIntegrationsConfig.length;
              const yPct = 12 + (i / (total - 1)) * 76;
              const isHovered = hoveredId === item.id;

              return (
                <g key={`path-${item.id}`}>
                  <path
                    d={`M 15% ${yPct}% C 35% ${yPct}%, 38% 50%, 50% 50%`}
                    fill="none"
                    stroke={isHovered ? item.brandColor : "rgba(99,102,241,0.3)"}
                    strokeWidth={isHovered ? "3.5" : "2"}
                    strokeDasharray={isHovered ? undefined : "4 4"}
                    className="transition-all duration-300"
                  />
                  {/* High-Contrast Pill Connection Label */}
                  {item.connectionLabel && (
                    <g className="transition-all duration-300">
                      <rect
                        x="24%"
                        y={`${yPct - 3.2}%`}
                        width="76"
                        height="20"
                        rx="10"
                        fill={isHovered ? item.brandColor : "rgba(255, 255, 255, 0.95)"}
                        stroke={isHovered ? item.brandColor : "rgba(99, 102, 241, 0.3)"}
                        strokeWidth="1.5"
                      />
                      <text
                        x="24%"
                        y={`${yPct - 3.2}%`}
                        dx="38"
                        dy="13.5"
                        textAnchor="middle"
                        fill={isHovered ? "#ffffff" : "#0F172A"}
                        fontSize="10"
                        fontWeight="700"
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
              const yPct = 20 + (i / (total - 1)) * 60;
              const isHovered = hoveredId === item.id;

              return (
                <g key={`outpath-${item.id}`}>
                  <path
                    d={`M 50% 50% C 62% 50%, 65% ${yPct}%, 85% ${yPct}%`}
                    fill="none"
                    stroke={isHovered ? item.brandColor : "rgba(168,85,247,0.3)"}
                    strokeWidth={isHovered ? "3.5" : "2"}
                    strokeDasharray={isHovered ? undefined : "4 4"}
                    className="transition-all duration-300"
                  />
                  {item.connectionLabel && (
                    <g className="transition-all duration-300">
                      <rect
                        x="66%"
                        y={`${yPct - 3.2}%`}
                        width="106"
                        height="20"
                        rx="10"
                        fill={isHovered ? item.brandColor : "rgba(255, 255, 255, 0.95)"}
                        stroke={isHovered ? item.brandColor : "rgba(168, 85, 247, 0.3)"}
                        strokeWidth="1.5"
                      />
                      <text
                        x="66%"
                        y={`${yPct - 3.2}%`}
                        dx="53"
                        dy="13.5"
                        textAnchor="middle"
                        fill={isHovered ? "#ffffff" : "#0F172A"}
                        fontSize="10"
                        fontWeight="700"
                        className="pointer-events-none tracking-tight"
                      >
                        {item.connectionLabel}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Layer 4: Category Data Packet Capsules */}
            {!reducedMotion &&
              packets.map((pkt) => {
                const config = MOTION_TOKENS.categoryColors[pkt.category];
                return (
                  <circle
                    key={pkt.id}
                    r="4"
                    fill={config.color}
                    className="shadow-glow transition-all"
                    style={{
                      filter: `drop-shadow(0 0 8px ${config.color})`,
                    }}
                  >
                    <animate
                      attributeName="cx"
                      values="15%;50%;85%"
                      dur="3.2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="30%;50%;70%"
                      dur="3.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
          </svg>

          {/* Left Inputs Column (Lead Sources) */}
          <div className="relative z-20 flex flex-col justify-between h-[440px] md:h-[500px] w-48">
            {inputIntegrationsConfig.map((item) => {
              const isHovered = hoveredId === item.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "network-node relative flex items-center transition-all duration-200",
                    isHovered ? "z-50" : "z-20"
                  )}
                >
                  <IntegrationNode
                    id={item.id}
                    name={item.name}
                    logo={brandLogoMap[item.id]}
                    brandColor={item.brandColor}
                    connectionType={item.connectionType}
                    description={item.description}
                    isFeatured={item.isFeatured}
                    variant="orbital"
                    onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
                    className="!static !translate-x-0 !translate-y-0"
                  />
                </div>
              );
            })}
          </div>

          {/* Center Hub: Unified Processing Core */}
          <div
            ref={centerNodeRef}
            className="group relative z-30 flex size-32 md:size-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white shadow-2xl ring-8 ring-brand-500/20 transition-all duration-500 hover:scale-105 hover:ring-brand-500/40 cursor-pointer"
          >
            {/* Ring 1: Outer Rotating Ring */}
            <div
              ref={outerRingRef}
              className="pointer-events-none absolute inset-[-12px] rounded-full border border-dashed border-brand-500/30"
            />

            {/* Ring 2: Middle Counter-Rotating Ring */}
            <div
              ref={middleRingRef}
              className="pointer-events-none absolute inset-[-6px] rounded-full border border-dotted border-purple-500/40"
            />

            {/* Ring 3: Inner Breathing Pulse */}
            <div
              ref={innerPulseRef}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand-400/50"
            />

            <Hexagon className="relative z-10 size-10 md:size-12 mb-0.5 text-brand-400 transition-transform group-hover:rotate-12" />
            <span className="relative z-10 text-xs md:text-sm font-bold tracking-tight">
              Nexora
            </span>
            <span className="relative z-10 text-[8px] md:text-[9px] font-semibold text-brand-300 tracking-wider uppercase px-2 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30">
              Unified Data Layer
            </span>

            {/* Live Processed Lead Counter Badge */}
            <div className="absolute -bottom-7 z-40 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-3 py-1 text-[10px] font-bold text-emerald-400 shadow-xl backdrop-blur-md flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {processedCount.toLocaleString()} Events Processed
            </div>
          </div>

          {/* Right Outputs Column (Business Modules) */}
          <div className="relative z-20 flex flex-col justify-between h-[360px] md:h-[420px] w-48">
            {outputModulesConfig.map((item) => {
              const isHovered = hoveredId === item.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "network-node relative flex items-center justify-end transition-all duration-200",
                    isHovered ? "z-50" : "z-20"
                  )}
                >
                  <IntegrationNode
                    id={item.id}
                    name={item.name}
                    logo={brandLogoMap[item.id]}
                    brandColor={item.brandColor}
                    connectionType={item.connectionType}
                    description={item.description}
                    variant="orbital"
                    onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
                    className="!static !translate-x-0 !translate-y-0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Business Processing Terminal */}
        <div className="mt-16 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Terminal className="size-4 text-brand-400" /> Live Business Activity Feed
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Streaming
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {logs.map((log) => {
              const catConfig = MOTION_TOKENS.categoryColors[log.category];

              return (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${catConfig.bg} ${catConfig.text}`}
                    >
                      {log.category}
                    </span>
                    <span className="text-slate-200 font-medium">{log.sourceName}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-slate-300">{log.destinationName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ecosystem Footer CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 px-4 py-1.5 rounded-full border border-white/5 mb-4">
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

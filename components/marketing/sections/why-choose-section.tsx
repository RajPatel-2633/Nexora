"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Zap, BarChart3, ShieldCheck, TrendingUp, Sparkles, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    id: "1",
    title: "Automation",
    story: "Save 18 hours every week.",
    description: "Automate repetitive tasks and focus on core revenue operations.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(245,158,11,0.2)]",
    progressColor: "bg-gradient-to-r from-amber-500 to-orange-400",
    statValue: 98,
    progressPercent: 98,
    statSuffix: "%",
    statLabel: "Time saved",
    statusText: "Live",
    statusVariant: "live" as const
  },
  {
    id: "2",
    title: "Analytics",
    story: "Track 50M+ events in real-time.",
    description: "Real-time pipeline analytics to make smarter, faster growth decisions.",
    icon: BarChart3,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(59,130,246,0.2)]",
    progressColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    statValue: 50,
    progressPercent: 85,
    statSuffix: "M+",
    statLabel: "Data points",
    statusText: "Live",
    statusVariant: "live" as const
  },
  {
    id: "3",
    title: "Security",
    story: "Bank-grade enterprise security & uptime.",
    description: "SOC2 compliance and guaranteed 99.9% platform availability.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(16,185,129,0.2)]",
    progressColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
    statValue: 99.9,
    progressPercent: 99.9,
    statSuffix: "%",
    statLabel: "Guaranteed uptime",
    statusText: "Live",
    statusVariant: "live" as const
  },
  {
    id: "4",
    title: "Scalability",
    story: "Scale 10x with seamless growth capacity.",
    description: "Built to scale effortlessly from 5-person teams to global enterprises.",
    icon: TrendingUp,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(139,92,246,0.2)]",
    progressColor: "bg-gradient-to-r from-violet-500 to-purple-400",
    statValue: 10,
    progressPercent: 90,
    statSuffix: "x",
    statLabel: "Growth capacity",
    statusText: "Live",
    statusVariant: "live" as const
  },
  {
    id: "5",
    title: "AI Ready",
    story: "Predict trends & automate with 24/7 AI.",
    description: "Leverage intelligent AI agents to predict lead churn and write proposals.",
    icon: Sparkles,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(217,70,239,0.2)]",
    progressColor: "bg-gradient-to-r from-fuchsia-500 to-pink-400",
    statValue: 24,
    progressPercent: 100,
    statSuffix: "/7",
    statLabel: "AI assistance",
    statusText: "Coming Soon",
    statusVariant: "comingSoon" as const
  },
  {
    id: "6",
    title: "Enterprise",
    story: "Dedicated SLAs & 2,500+ enterprise clients.",
    description: "Custom SLAs, dedicated account managers, and private cloud deployment.",
    icon: Building2,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "hover:shadow-[0_8px_25px_-8px_rgba(244,63,94,0.2)]",
    progressColor: "bg-gradient-to-r from-rose-500 to-red-400",
    statValue: 2500,
    progressPercent: 95,
    statSuffix: "+",
    statLabel: "Enterprise clients",
    statusText: "Live",
    statusVariant: "live" as const
  }
];

// GSAP Counter component for 700 bold metric numbers
function GSAPCounter({
  value,
  isDecimal,
  cardRef
}: {
  value: number;
  isDecimal?: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const targetObj = { val: 0 };
      gsap.to(targetObj, {
        val: value,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (isDecimal) {
            setDisplayValue(targetObj.val.toFixed(1));
          } else if (value >= 1000) {
            setDisplayValue(Math.round(targetObj.val).toLocaleString());
          } else {
            setDisplayValue(Math.round(targetObj.val).toString());
          }
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [value, isDecimal, cardRef]);

  return <span>{displayValue}</span>;
}

// GSAP Progress Line component for 0.8s animated fill
function GSAPStatProgressLine({
  progressPercent,
  progressColorClass,
  cardRef
}: {
  progressPercent: number;
  progressColorClass: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${progressPercent}%`,
          duration: 0.8, // Satisfying 0.8s fill
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [progressPercent, cardRef]);

  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
      <div
        ref={barRef}
        className={cn("h-full rounded-full transition-all duration-300 relative", progressColorClass)}
      />
    </div>
  );
}

// Compact Mini-Story Card Component (140-170px Height)
function BenefitCardItem({
  benefit,
  index,
  isEven,
  mousePos
}: {
  benefit: (typeof benefits)[0];
  index: number;
  isEven: boolean;
  mousePos: { x: number; y: number };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardOffset({
      x: mousePos.x - rect.left,
      y: mousePos.y - rect.top,
    });
  }, [mousePos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(
        "relative flex items-center md:justify-between w-full group",
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Central Timeline Node */}
      <div className="absolute left-8 md:left-1/2 flex size-10 md:size-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-900 shadow-md z-20">
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute inset-0 rounded-full", benefit.bg)}
        />
        <benefit.icon className={cn("size-4 md:size-5 relative z-10 transition-transform duration-300 group-hover:scale-110", benefit.color)} />
      </div>

      {/* Thin Horizontal Linear SVG Connector (1.5px) */}
      <div className={cn(
        "hidden md:block absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-slate-200 via-indigo-300 to-slate-200 z-10 transition-opacity duration-300",
        isEven ? "left-1/2 right-[45%] origin-right" : "right-1/2 left-[45%] origin-left"
      )} />

      {/* Desktop Layout Spacer */}
      <div className="hidden md:block w-[45%]" />

      {/* Compact Glass Card Container (140-170px height) */}
      <motion.div
        ref={cardRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -4,
          scale: 1.01,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        className={cn(
          "ml-16 md:ml-0 w-full md:w-[45%] rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-5 md:p-6 shadow-sm transition-all duration-300 relative overflow-hidden group/card hover:shadow-xl hover:border-indigo-300/80",
          benefit.glow
        )}
      >
        {/* Subtle Card-Only Cursor Spotlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${cardOffset.x}px ${cardOffset.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
            }}
          />
        )}

        <div className="relative z-10 space-y-3">
          {/* Top Row: Mini-Story Title + Integrated Metric */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {/* Standardized Status Pill */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-slate-50 border-slate-200 text-slate-600">
                  <span className={cn(
                    "size-1.5 rounded-full inline-block",
                    benefit.statusVariant === "live" ? "bg-emerald-500" : "bg-purple-500"
                  )} />
                  <span>{benefit.statusText}</span>
                </span>
              </div>

              {/* Feature Title (1. Automation format, 700 bold for number and title text) */}
              <h4 className="text-base md:text-lg font-bold text-slate-900 group-hover/card:text-indigo-600 transition-colors duration-200" style={{ fontWeight: 700 }}>
                <span>{benefit.id}. </span>
                <span>{benefit.title}</span>
              </h4>
            </div>

            {/* Integrated Metric Header (700 bold) */}
            <div className="text-right shrink-0">
              <div className={cn("text-2xl md:text-3xl font-bold tracking-tight flex items-baseline justify-end gap-0.5", benefit.color)}>
                <GSAPCounter
                  value={benefit.statValue}
                  isDecimal={benefit.statValue % 1 !== 0}
                  cardRef={cardRef}
                />
                <span className="text-lg font-bold">{benefit.statSuffix}</span>
              </div>
              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {benefit.statLabel}
              </div>
            </div>
          </div>

          {/* Mini-Story Copy */}
          <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
            &ldquo;{benefit.story}&rdquo;
          </p>

          {/* Animated 0.8s Progress Bar Fill */}
          <div className="pt-1">
            <GSAPStatProgressLine
              progressPercent={benefit.progressPercent}
              progressColorClass={benefit.progressColor}
              cardRef={cardRef}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const pulseDotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const length = lineRef.current.getTotalLength() || 2000;
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Scrub line drawing
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 85%",
          scrub: 0.5,
        },
      });

      // 2. Viewport Reveal Traveling Pulse Particle (Runs ONCE on reveal)
      if (pulseDotRef.current) {
        gsap.to(pulseDotRef.current, {
          top: "100%",
          duration: 3.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      onMouseMove={handleMouseMove}
      className="section-light section-md relative overflow-hidden bg-gradient-to-b from-white via-[#f8f9fc] to-[#f1f3f9] py-16 md:py-24 text-slate-900"
      aria-label="Why Choose Nexora workflow"
    >
      <div className="nexora-container relative z-10">
        {/* Reveal Sequence Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 section-label text-indigo-600 mb-4"
          >
            <Sparkles className="size-3.5" />
            <span>Why Nexora</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="heading-xl text-slate-900 font-bold mb-4"
          >
            Everything works together
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="text-base md:text-lg text-slate-500 max-w-xl mx-auto"
          >
            Built to streamline sales, HR, invoicing, and operations into one connected workflow.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Central Vertical Linear Line Container */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden bg-slate-200">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0" y1="0" x2="0" y2="100%"
                stroke="url(#timeline-light-gradient)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="timeline-light-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Traveling Pulse Particle (Runs ONCE on reveal) */}
            <div
              ref={pulseDotRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 size-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_#6366f1] pointer-events-none"
            />
          </div>

          {/* Connected Workflow Mini-Story Cards */}
          <div className="space-y-10 md:space-y-12">
            {benefits.map((benefit, index) => (
              <BenefitCardItem
                key={benefit.title}
                benefit={benefit}
                index={index}
                isEven={index % 2 === 0}
                mousePos={mousePos}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

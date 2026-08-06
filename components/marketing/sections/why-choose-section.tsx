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
    title: "Automation",
    description: "Automate repetitive tasks and focus on what matters.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.25)]",
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-amber-500 to-orange-400",
    statValue: 98,
    progressPercent: 98,
    statSuffix: "%",
    statLabel: "Time saved on data entry"
  },
  {
    title: "Analytics",
    description: "Real-time analytics to make smarter, faster decisions.",
    icon: BarChart3,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25)]",
    gradient: "from-blue-500/15 via-cyan-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    statValue: 50,
    progressPercent: 85,
    statSuffix: "M+",
    statLabel: "Data points processed"
  },
  {
    title: "Security",
    description: "Enterprise-grade security to keep your data safe.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25)]",
    gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
    statValue: 99.9,
    progressPercent: 99.9,
    statSuffix: "%",
    statLabel: "Guaranteed uptime"
  },
  {
    title: "Scalability",
    description: "Built to grow with your business, from small teams to enterprises.",
    icon: TrendingUp,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.25)]",
    gradient: "from-violet-500/15 via-purple-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-violet-500 to-purple-400",
    statValue: 10,
    progressPercent: 90,
    statSuffix: "x",
    statLabel: "Seamless growth capacity"
  },
  {
    title: "AI Ready",
    description: "Leverage artificial intelligence to predict trends and automate workflows.",
    icon: Sparkles,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(217,70,239,0.25)]",
    gradient: "from-fuchsia-500/15 via-pink-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-fuchsia-500 to-pink-400",
    statValue: 24,
    progressPercent: 100,
    statSuffix: "/7",
    statLabel: "AI assistance availability"
  },
  {
    title: "Enterprise",
    description: "Dedicated support, custom SLAs, and advanced deployment options.",
    icon: Building2,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "hover:shadow-[0_10px_30px_-10px_rgba(244,63,94,0.25)]",
    gradient: "from-rose-500/15 via-red-500/5 to-transparent",
    progressColor: "bg-gradient-to-r from-rose-500 to-red-400",
    statValue: 2500,
    progressPercent: 95,
    statSuffix: "+",
    statLabel: "Happy enterprise clients"
  }
];

// GSAP Counter component for smooth number animation on scroll reveal
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
        duration: 2,
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

// GSAP Progress Line component for each card stat box
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
          duration: 1.8,
          delay: 0.2,
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
    <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden mt-3 relative">
      <div
        ref={barRef}
        className={cn("h-full rounded-full transition-all duration-300 relative", progressColorClass)}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
      </div>
    </div>
  );
}

// Individual Stat Card Item with Framer Motion + GSAP animations
function BenefitCardItem({
  benefit,
  index,
  isEven,
}: {
  benefit: (typeof benefits)[0];
  index: number;
  isEven: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 70 : -70, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(
        "relative flex items-center md:justify-between w-full group",
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Central Timeline Node (Badge) */}
      <div className="absolute left-8 md:left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-card shadow-md z-20 md:size-16">
        {/* Pulsing Outer Glow Ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute inset-0 rounded-full", benefit.bg)}
        />

        {/* Icon Container with spin animation on hover */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={cn(
            "flex size-full items-center justify-center rounded-full transition-colors duration-300",
            benefit.bg
          )}
        >
          <benefit.icon className={cn("size-5 md:size-6 transition-transform duration-300 group-hover:scale-110", benefit.color)} />
        </motion.div>
      </div>

      {/* Desktop Layout Spacer */}
      <div className="hidden md:block w-[45%]" />

      {/* Card Content with Framer Motion Hover Elevation & Gradient Background Animation */}
      <motion.div
        ref={cardRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className={cn(
          "ml-20 md:ml-0 w-full md:w-[45%] rounded-2xl border bg-card/90 backdrop-blur-md p-6 shadow-sm transition-all duration-300 relative overflow-hidden group/card hover:shadow-xl",
          benefit.border,
          benefit.glow
        )}
      >
        {/* Shimmering Gradient Background Animation */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn(
            "absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r bg-[length:200%_200%]",
            benefit.gradient
          )}
        />

        {/* Animated Glow Accent Line across card top */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent",
          benefit.color
        )} />

        <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
              0{index + 1}
            </span>
            <h4 className="text-xl font-bold text-foreground mb-2 group-hover/card:text-brand-600 transition-colors duration-200">
              {benefit.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>

          {/* Stat Display Box */}
          <div className="shrink-0 w-full sm:w-auto text-left sm:text-right p-4 rounded-xl bg-background/60 border border-border/50 shadow-inner group-hover/card:border-border transition-colors duration-300">
            <div className={cn("text-3xl font-extrabold tracking-tighter flex items-baseline sm:justify-end gap-0.5", benefit.color)}>
              <GSAPCounter
                value={benefit.statValue}
                isDecimal={benefit.statValue % 1 !== 0}
                cardRef={cardRef}
              />
              <span className="text-xl font-bold">{benefit.statSuffix}</span>
            </div>

            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1 sm:ml-auto max-w-[120px]">
              {benefit.statLabel}
            </div>

            {/* GSAP Animated Progress Line */}
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

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const length = lineRef.current.getTotalLength() || 2000;
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger to draw the central line down the middle
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      });

      // 2. GSAP ScrollTrigger to move glowing laser head down the line
      if (pulseDotRef.current) {
        gsap.to(pulseDotRef.current, {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-choose" className="section-light section-md relative overflow-hidden bg-background">
      {/* Background Animated Gradient Mesh Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-40 size-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-40 size-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
      />

      <div className="nexora-container relative z-10">
        {/* Reveal Sequence Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 section-label text-brand-600 mb-4"
          >
            <Sparkles className="size-3.5" />
            <span>Why Choose Nexora</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="heading-xl text-on-light mb-6"
          >
            The all-in-one platform that drives results
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            Experience unparalleled growth and efficiency with a CRM built for modern teams.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Central Vertical Line Container */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden bg-border/50">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0" y1="0" x2="0" y2="100%"
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing traveling pulse dot along central line */}
            <div
              ref={pulseDotRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 size-3 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1] pointer-events-none"
            />
          </div>

          {/* Timeline Node Cards */}
          <div className="space-y-12 md:space-y-16">
            {benefits.map((benefit, index) => (
              <BenefitCardItem
                key={benefit.title}
                benefit={benefit}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, Variants } from "framer-motion";
import { Zap, BarChart3, ShieldCheck, TrendingUp, Sparkles, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Automation",
    description: "Automate repetitive tasks and focus on what matters.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    statValue: 98,
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
    statValue: 50,
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
    statValue: 99.9,
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
    statValue: 10,
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
    statValue: 24,
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
    statValue: 2500,
    statSuffix: "+",
    statLabel: "Happy enterprise clients"
  }
];

// Sub-component to handle the counting numbers so they re-trigger independently or via GSAP
function AnimatedNumber({ value, isDecimal }: { value: number, isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    
    // We don't animate the 24/7 or 10x strings well if they are complex, 
    // but we can animate the numeric part easily.
    const target = { val: 0 };
    gsap.to(target, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.innerText = isDecimal ? target.val.toFixed(1) : Math.round(target.val).toString();
        }
      }
    });
  }, [isInView, value, isDecimal]);

  return <span ref={ref}>0</span>;
}

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // 1. GSAP Timeline to draw the central line down the middle
    const length = lineRef.current.getTotalLength() || 2000;
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1, // ties animation directly to scrollbar
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // Framer stagger
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <section ref={sectionRef} id="why-choose" className="section-light section-md relative overflow-hidden bg-background">
      <div className="nexora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Why Choose Nexora</h2>
          <h3 className="text-h2 text-on-light mb-6">The all-in-one platform that drives results</h3>
          <p className="text-lg text-muted-foreground">
            Experience unparalleled growth and efficiency with a CRM built for modern teams.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          
          {/* Central Vertical Line for Desktop / Left Line for Mobile */}
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
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Timeline Nodes */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-0"
          >
            {benefits.map((benefit, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={benefit.title}
                  variants={itemVariants}
                  className={cn(
                    "relative flex items-center md:justify-between w-full",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Timeline Dot (Center) */}
                  <div className="absolute left-8 md:left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm z-10 md:size-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className={cn("flex size-full items-center justify-center rounded-full", benefit.bg)}
                    >
                      <benefit.icon className={cn("size-5 md:size-6", benefit.color)} />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout (Desktop only) */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Content */}
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                      "ml-20 md:ml-0 w-full md:w-[45%] rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl relative overflow-hidden group",
                      benefit.border
                    )}
                  >
                    {/* Subtle gradient background on hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                      benefit.bg
                    )} />

                    <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                          0{index + 1}
                        </span>
                        <h4 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      
                      {/* Stat Display */}
                      <div className="shrink-0 text-left sm:text-right p-4 rounded-xl bg-background/50 border border-white/5">
                        <div className={cn("text-3xl font-extrabold tracking-tighter flex items-baseline gap-1", benefit.color)}>
                          <AnimatedNumber 
                            value={benefit.statValue} 
                            isDecimal={benefit.statValue % 1 !== 0} 
                          />
                          <span className="text-xl">{benefit.statSuffix}</span>
                        </div>
                        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1 max-w-[100px]">
                          {benefit.statLabel}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                </motion.div>
              );
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

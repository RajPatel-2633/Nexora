"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import type { Testimonial, TrustMetric } from "@/types/domain/testimonial";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 9. Typed Testimonials Data Array (Backend Compatibility Ready)
const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Nexora CRM has completely transformed the way we handle our leads and operations. Our team is more productive and our conversions are up 35%!",
    name: "Rahul Sharma",
    role: "CEO, UrbanBuild Realty",
    company: "UrbanBuild",
    initials: "RS",
    rating: 5,
    avatarGradient: "from-blue-600 via-indigo-600 to-violet-700",
    accentColor: "text-blue-400",
    glowColor: "rgba(59,130,246,0.25)",
    cardGradient: "from-blue-500/15 via-indigo-500/5 to-transparent",
    minHeight: "min-h-[320px]",
  },
  {
    id: "2",
    quote: "The HRMS features are incredible. Managing attendance and payroll used to take our HR team days, now it takes hours. Highly recommended.",
    name: "Priya Verma",
    role: "HR Director, TechNova",
    company: "TechNova",
    initials: "PV",
    rating: 5,
    avatarGradient: "from-emerald-600 via-teal-600 to-cyan-700",
    accentColor: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.25)",
    cardGradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    minHeight: "min-h-[360px]",
  },
  {
    id: "3",
    quote: "We scaled our operations 10x using their pipeline management. The automated invoicing alone paid for the platform in the first month.",
    name: "Amit Patel",
    role: "Founder, Skyline Dev",
    company: "Skyline",
    initials: "AP",
    rating: 5,
    avatarGradient: "from-amber-500 via-orange-600 to-red-600",
    accentColor: "text-amber-400",
    glowColor: "rgba(245,158,11,0.25)",
    cardGradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    minHeight: "min-h-[310px]",
  },
  {
    id: "4",
    quote: "Customer support is top notch. They helped us migrate from our legacy CRM in under a week with zero downtime. Phenomenal experience.",
    name: "Sneha Rao",
    role: "Operations Head, GreenLeaf",
    company: "GreenLeaf",
    initials: "SR",
    rating: 5,
    avatarGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    accentColor: "text-purple-400",
    glowColor: "rgba(168,85,247,0.25)",
    cardGradient: "from-purple-500/15 via-fuchsia-500/5 to-transparent",
    minHeight: "min-h-[345px]",
  },
  {
    id: "5",
    quote: "The real-time analytics dashboard is a game-changer. We finally have a single source of truth for all our business metrics.",
    name: "Vikram Singh",
    role: "VP Sales, PrimeSpace",
    company: "PrimeSpace",
    initials: "VS",
    rating: 5,
    avatarGradient: "from-rose-600 via-pink-600 to-red-700",
    accentColor: "text-rose-400",
    glowColor: "rgba(244,63,94,0.25)",
    cardGradient: "from-rose-500/15 via-pink-500/5 to-transparent",
    minHeight: "min-h-[330px]",
  },
];

// 3. Trust Metrics Data Definition
const trustMetrics: TrustMetric[] = [
  { id: "1", label: "Trusted Businesses", value: 2500, suffix: "+" },
  { id: "2", label: "Customer Satisfaction", value: 98, suffix: "%" },
  { id: "3", label: "Leads Managed", value: 50, suffix: "M+" },
  { id: "4", label: "Platform Uptime", value: 99.9, suffix: "%", isDecimal: true },
];

// Triplicate array for smooth infinite marquee looping without reset jumps
const triplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

// GSAP Count-up component for Trust Metrics
function GSAPTrustCounter({ metric, containerRef }: { metric: TrustMetric; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targetObj = { val: 0 };
      gsap.to(targetObj, {
        val: metric.value,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (metric.isDecimal) {
            setDisplayValue(targetObj.val.toFixed(1));
          } else if (metric.value >= 1000) {
            setDisplayValue(Math.round(targetObj.val).toLocaleString());
          } else {
            setDisplayValue(Math.round(targetObj.val).toString());
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [metric, containerRef]);

  return <span>{displayValue}</span>;
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 10. Check for prefers-reduced-motion accessibility preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  // 1. GSAP Powered Infinite Marquee Loop
  useEffect(() => {
    if (prefersReducedMotion || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Create seamless horizontal marquee tween moving -33.333% (1 full set out of 3)
      marqueeTweenRef.current = gsap.to(trackRef.current, {
        xPercent: -33.33333,
        ease: "none",
        duration: 35,
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 6. Variable Marquee Speed Controls
  const handleTrackMouseEnter = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0.35, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleCardHoverStart = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleCardHoverEnd = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0.35, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleTrackMouseLeave = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <section ref={sectionRef} id="testimonials" className="section-dark section-md relative overflow-hidden bg-brand-950 text-white">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-1/4 size-96 bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-violet-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="nexora-container relative z-10 mb-12 md:mb-16 text-center max-w-4xl mx-auto">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 section-label mb-3"
        >
          <Sparkles className="size-3.5" />
          <span>Customer Stories</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-xl text-white mb-4"
        >
          Loved by thousands of fast-growing teams
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="body-lg text-slate-400 max-w-2xl mx-auto"
        >
          See how companies use Nexora to automate workflows, convert leads faster, and scale operations effortlessly.
        </motion.p>

        {/* 3. GSAP Count-up Trust Metrics Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl"
        >
          {trustMetrics.map((metric) => (
            <div key={metric.id} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 flex items-baseline justify-center gap-0.5">
                {metric.prefix}
                <GSAPTrustCounter metric={metric} containerRef={sectionRef} />
                <span className="text-brand-400">{metric.suffix}</span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials Display Engine */}
      {prefersReducedMotion ? (
        /* 10. Responsive Static Grid Fallback for Reduced Motion */
        <div className="nexora-container relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              className="w-full"
            />
          ))}
        </div>
      ) : (
        /* 1. GSAP Infinite Marquee Carousel with Variable Speed */
        <div
          className="relative w-full overflow-hidden flex py-8 group/track"
          onMouseEnter={handleTrackMouseEnter}
          onMouseLeave={handleTrackMouseLeave}
        >
          {/* Side Fade Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-brand-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-brand-950 to-transparent z-20 pointer-events-none" />

          {/* Continuous GSAP Marquee Track */}
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 px-4 w-max"
          >
            {triplicatedTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={`${testimonial.id}-${idx}`}
                testimonial={testimonial}
                onHoverStart={handleCardHoverStart}
                onHoverEnd={handleCardHoverEnd}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

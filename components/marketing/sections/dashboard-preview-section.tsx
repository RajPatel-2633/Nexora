"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnalyticsCard } from "@/components/dashboard/cards/analytics-card";
import { SalesPipelineCard } from "@/components/dashboard/cards/sales-pipeline-card";
import { RevenueChartCard } from "@/components/dashboard/cards/revenue-chart-card";
import { LeadsListCard } from "@/components/dashboard/cards/leads-list-card";
import { HRAttendanceCard } from "@/components/dashboard/cards/hr-attendance-card";
import { InvoicesCard } from "@/components/dashboard/cards/invoices-card";
import { NotificationsCard } from "@/components/dashboard/cards/notifications-card";

gsap.registerPlugin(ScrollTrigger);

export function DashboardPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Damping for smooth parallax
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // The cards slide independently as they assemble
    const cards = gsap.utils.toArray(".dashboard-card");
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, 
        { y: 150, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          ease: "none", // For scrub animations, "none" is best so scroll controls it linearly
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1, // Ties animation to scrollbar with a 1s smoothing
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-light section-md relative overflow-hidden bg-background"
    >
      <div className="nexora-container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Live Preview</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Interactive CRM Dashboard</h3>
          <p className="text-lg text-muted-foreground">
            Experience our modular, highly customizable dashboard interface.
          </p>
        </div>

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="relative rounded-3xl border border-white/10 bg-muted/20 p-4 md:p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Dashboard Header Mock */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Overview</h2>
              <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="hidden sm:flex gap-3">
              <div className="h-9 w-64 rounded-md border bg-background px-3 flex items-center text-sm text-muted-foreground">
                Search...
              </div>
              <div className="size-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Top Row - Analytics spans 2 columns on lg, 4 on xl */}
            <div className="dashboard-card md:col-span-2 lg:col-span-3 xl:col-span-4">
              <AnalyticsCard />
            </div>

            {/* Middle Row */}
            <div className="dashboard-card md:col-span-1 lg:col-span-2 xl:col-span-2 flex h-full">
              <RevenueChartCard className="w-full flex-1" />
            </div>
            <div className="dashboard-card md:col-span-1 lg:col-span-1 xl:col-span-1 flex h-full">
              <SalesPipelineCard className="w-full flex-1" />
            </div>
            <div className="dashboard-card md:col-span-2 lg:col-span-1 xl:col-span-1 flex h-full">
              <HRAttendanceCard className="w-full flex-1" />
            </div>

            {/* Bottom Row */}
            <div className="dashboard-card md:col-span-1 lg:col-span-1 xl:col-span-1 flex h-full">
              <LeadsListCard className="w-full flex-1" />
            </div>
            <div className="dashboard-card md:col-span-1 lg:col-span-2 xl:col-span-2 flex h-full">
              <InvoicesCard className="w-full flex-1" />
            </div>
            <div className="dashboard-card md:col-span-2 lg:col-span-1 xl:col-span-1 flex h-full">
              <NotificationsCard className="w-full flex-1" />
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

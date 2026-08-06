"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Sparkles, Bell } from "lucide-react";

import { AnalyticsCard } from "@/components/dashboard/cards/analytics-card";
import { SalesPipelineCard } from "@/components/dashboard/cards/sales-pipeline-card";
import { RevenueChartCard } from "@/components/dashboard/cards/revenue-chart-card";
import { LeadsListCard } from "@/components/dashboard/cards/leads-list-card";
import { HRAttendanceCard } from "@/components/dashboard/cards/hr-attendance-card";
import { InvoicesCard } from "@/components/dashboard/cards/invoices-card";
import { NotificationsCard } from "@/components/dashboard/cards/notifications-card";
import { useReducedMotion } from "@/hooks/animations/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function DashboardPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  // 4-Layer Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Layer 2: Dashboard Container 3D Tilt (~5px)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);

  // Layer 4: Floating Header Search/Notifications (~18px)
  const floatX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const floatY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || reducedMotion) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

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
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 10-Step Boot Sequence Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Step 1 & 2: Shell & Glow Reveal
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50, scale: 0.96, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      )
        // Step 3: Header Items Stagger
        .fromTo(
          ".dash-header-item",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        )
        // Step 4: KPI Analytics Card
        .fromTo(
          ".card-analytics",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        // Step 5 & 6: Revenue & Pipeline
        .fromTo(
          [".card-revenue", ".card-pipeline"],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
          "-=0.3"
        )
        // Step 7, 8, 9: Attendance, Leads, Invoices, Notifications
        .fromTo(
          [".card-attendance", ".card-leads", ".card-invoices", ".card-notifications"],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.3"
        );

      // Step 10: Asynchronous Organic Idle Drift
      const floatRevenue = gsap.to(".card-revenue", {
        y: "-=4",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      const floatPipeline = gsap.to(".card-pipeline", {
        y: "+=4",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.3,
      });

      const floatNotifications = gsap.to(".card-notifications", {
        y: "-=5",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.6,
      });

      const floatGlow = gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.5,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        floatRevenue.kill();
        floatPipeline.kill();
        floatNotifications.kill();
        floatGlow.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="section-light section-md relative overflow-hidden bg-background"
    >
      {/* Layer 1: Parallax Ambient Glow (~2px offset) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="nexora-container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 section-label text-brand-600 mb-3">
            <Sparkles className="size-3.5 text-brand-500" /> Live Interactive CRM
          </span>
          <h2 className="heading-xl text-foreground mb-4">
            Production CRM Application Screen
          </h2>
          <p className="body-lg text-slate-600">
            Experience our production-ready modular CRM dashboard with live storytelling animations & AI insights.
          </p>
        </div>

        {/* Layer 2: Dashboard Container Shell */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: reducedMotion ? 0 : rotateX,
            rotateY: reducedMotion ? 0 : rotateY,
            transformPerspective: 1200,
          }}
          className="dashboard-container relative rounded-3xl border border-white/10 bg-card/60 p-4 md:p-8 shadow-2xl backdrop-blur-xl transition-shadow duration-500 hover:shadow-brand-500/10"
        >
          {/* Dashboard Header Mock */}
          <div ref={headerRef} className="mb-8 flex items-center justify-between">
            <div className="dash-header-item">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">Overview</h2>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Live System
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Layer 4: Parallax Floating Header Tools (~18px offset) */}
            <motion.div
              style={{ x: reducedMotion ? 0 : floatX, y: reducedMotion ? 0 : floatY }}
              className="dash-header-item hidden sm:flex items-center gap-3"
            >
              <div className="h-9 w-64 rounded-xl border bg-background/80 px-3 flex items-center gap-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
                <Search className="size-4 text-muted-foreground" />
                <span>Search leads, deals, invoices...</span>
              </div>

              <div className="relative size-9 rounded-xl border bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-sm">
                <Bell className="size-4" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-rose-500" />
              </div>

              <div className="size-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-brand-500/20">
                A
              </div>
            </motion.div>
          </div>

          {/* Layer 3: Grid Layout Cards (~10px offset) */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Top Row - Analytics */}
            <div className="dashboard-card card-analytics md:col-span-2 lg:col-span-3 xl:col-span-4">
              <AnalyticsCard
                aiInsight={{
                  summary: "Conversion +3.2% vs benchmark",
                  confidence: 94,
                }}
              />
            </div>

            {/* Middle Row */}
            <div className="dashboard-card card-revenue md:col-span-1 lg:col-span-2 xl:col-span-2 flex h-full">
              <RevenueChartCard
                aiInsight={{
                  summary: "Projected ₹15.2L end of month",
                  confidence: 91,
                }}
                className="w-full flex-1"
              />
            </div>

            <div className="dashboard-card card-pipeline md:col-span-1 lg:col-span-1 xl:col-span-1 flex h-full">
              <SalesPipelineCard
                aiRecommendation={{
                  stage: "Qualified",
                  action: "Follow up 4 deals",
                }}
                className="w-full flex-1"
              />
            </div>

            <div className="dashboard-card card-attendance md:col-span-2 lg:col-span-1 xl:col-span-1 flex h-full">
              <HRAttendanceCard
                aiInsight={{
                  summary: "Peak attendance on Thu",
                }}
                className="w-full flex-1"
              />
            </div>

            {/* Bottom Row */}
            <div className="dashboard-card card-leads md:col-span-1 lg:col-span-1 xl:col-span-1 flex h-full">
              <LeadsListCard
                aiScores={{
                  "1": { priority: "High", riskScore: 12 },
                }}
                className="w-full flex-1"
              />
            </div>

            <div className="dashboard-card card-invoices md:col-span-1 lg:col-span-2 xl:col-span-2 flex h-full">
              <InvoicesCard
                aiAnomaly={{
                  invoiceId: "INV-1247",
                  warning: "Overdue 5 days — Remind client",
                }}
                className="w-full flex-1"
              />
            </div>

            <div className="dashboard-card card-notifications md:col-span-2 lg:col-span-1 xl:col-span-1 flex h-full">
              <NotificationsCard className="w-full flex-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

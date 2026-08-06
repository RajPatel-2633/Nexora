"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, UserCheck, FileText, Sparkles } from "lucide-react";
import { FeatureCard } from "@/components/marketing/features/feature-card";
import { LeadPipelineWidget } from "@/components/dashboard/widgets/lead-pipeline-widget";
import { AttendanceWidget } from "@/components/dashboard/widgets/attendance-widget";
import { InvoiceWidget } from "@/components/dashboard/widgets/invoice-widget";
import { useReducedMotion } from "@/hooks/animations/use-reduced-motion";
import { MOTION_TOKENS } from "@/lib/animations/motion-tokens";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: "lead-mgmt",
    title: "Lead Management",
    description: "Capture, track and convert leads into loyal customers with automated workflows.",
    icon: Users,
    colorVariant: "blue" as const,
    actionText: "See Workflow",
    actionHref: "#contact",
    features: [
      "Capture leads from 20+ ad sources",
      "Track lead interaction timelines",
      "Automated pipeline deal stages",
      "Smart follow-ups & SLA reminders",
    ],
    widget: <LeadPipelineWidget variant="compact" animated />,
  },
  {
    id: "hrms-mgmt",
    title: "HRMS & Attendance",
    description: "Manage employees, attendance trends and HR workflows seamlessly.",
    icon: UserCheck,
    colorVariant: "green" as const,
    actionText: "Explore Module",
    actionHref: "#contact",
    features: [
      "Employee database & profiles",
      "Weekly attendance & leave tracking",
      "Automated payroll calculation",
      "Performance tracking & reviews",
    ],
    widget: <AttendanceWidget variant="compact" animated />,
  },
  {
    id: "invoicing-mgmt",
    title: "Invoicing & Billing",
    description: "Create professional invoices and manage payment milestones effortlessly.",
    icon: FileText,
    colorVariant: "purple" as const,
    actionText: "Learn More",
    actionHref: "#contact",
    features: [
      "Create & send instant invoices",
      "Automated payment status tracking",
      "Recurring invoices & subscriptions",
      "Tax reports & milestone tracking",
    ],
    widget: <InvoiceWidget variant="compact" animated />,
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    cardsRef.current = cardsRef.current.slice(0, featuresData.length);

    const ctx = gsap.context(() => {
      // Staggered reveal animation utilizing MOTION_TOKENS
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: MOTION_TOKENS.feature.reveal.y, opacity: MOTION_TOKENS.feature.reveal.opacity },
        {
          y: 0,
          opacity: 1,
          duration: MOTION_TOKENS.feature.reveal.duration,
          stagger: MOTION_TOKENS.feature.reveal.stagger,
          ease: MOTION_TOKENS.easing.backOut,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="features" ref={sectionRef} className="section-light section-md relative overflow-hidden bg-background py-24 md:py-32">
      <div className="nexora-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 section-label text-brand-600 mb-3">
            <Sparkles className="size-3.5 text-brand-500" /> Modular Architecture
          </span>
          <h2 className="heading-xl text-foreground mb-5">
            Everything you need, in one place
          </h2>
          <p className="body-lg text-slate-600">
            Manage leads, people and payments — all in one seamless workflow powered by production-ready CRM modules.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="h-full"
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                features={feature.features}
                colorVariant={feature.colorVariant}
                actionText={feature.actionText}
                actionHref={feature.actionHref}
                className="h-full"
              >
                {feature.widget}
              </FeatureCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

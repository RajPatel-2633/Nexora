"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, UserCheck, FileText, ArrowRight } from "lucide-react";
import { FeatureCard } from "@/components/marketing/features/feature-card";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    title: "Lead Management",
    description: "Capture, track and convert leads into loyal customers with automated workflows.",
    icon: Users,
    colorVariant: "blue" as const,
    features: [
      "Capture leads from multiple sources",
      "Track interactions & activities",
      "Pipeline & deal management",
      "Smart follow-ups & reminders"
    ],
    preview: (
      <div className="p-4 bg-background">
        <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">New Leads</div>
        <div className="space-y-3">
          {[
            { name: "Aarav Mehta", source: "facebook", time: "2m ago" },
            { name: "Priya Verma", source: "IndiaMART", time: "5m ago" },
            { name: "Rohit Singh", source: "99acres", time: "10m ago" },
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                  {lead.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{lead.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{lead.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t flex items-center gap-1 text-xs font-medium text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
          View all leads <ArrowRight className="size-3" />
        </div>
      </div>
    )
  },
  {
    title: "HRMS",
    description: "Manage employees, attendance and HR workflows seamlessly.",
    icon: UserCheck,
    colorVariant: "green" as const,
    features: [
      "Employee database & profiles",
      "Attendance & leave management",
      "Payroll & salary management",
      "Performance tracking"
    ],
    preview: (
      <div className="p-4 bg-background">
        <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Today&apos;s Attendance</div>
        <div className="flex justify-between mb-4">
          <div>
            <div className="text-xs text-muted-foreground">Present</div>
            <div className="text-lg font-bold text-emerald-500 flex items-baseline gap-1">
              82% <span className="text-[10px] text-emerald-500/70">(118)</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Absent</div>
            <div className="text-lg font-bold text-rose-500 flex items-baseline gap-1">
              12% <span className="text-[10px] text-rose-500/70">(17)</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Leave</div>
            <div className="text-lg font-bold text-amber-500 flex items-baseline gap-1">
              6% <span className="text-[10px] text-amber-500/70">(9)</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-1 h-12">
          {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm overflow-hidden flex items-end">
              <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Invoicing",
    description: "Create professional invoices and manage billing effortlessly.",
    icon: FileText,
    colorVariant: "purple" as const,
    features: [
      "Create & send invoices",
      "Payment tracking & reminders",
      "Recurring invoices & subscriptions",
      "Reports & tax management"
    ],
    preview: (
      <div className="p-4 bg-background">
        <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Invoice #INV-1245</div>
        <div className="rounded-lg border p-3 bg-muted/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm font-semibold">TechNova Pvt. Ltd.</div>
              <div className="text-[10px] text-muted-foreground mt-1">Due: Oct 24, 2026</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Amount</div>
              <div className="text-base font-bold">₹75,000</div>
              <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-500/10 text-emerald-500 mt-1">
                Paid
              </div>
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-violet-500 cursor-pointer hover:text-violet-600 transition-colors">
          <span>View invoice</span>
          <ArrowRight className="size-3" />
        </div>
      </div>
    )
  }
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Ensure array length matches data length
    cardsRef.current = cardsRef.current.slice(0, featuresData.length);

    const ctx = gsap.context(() => {
      // Stagger animation for cards on scroll
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-light section-md relative overflow-hidden">
      <div className="nexora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Features</h2>
          <h3 className="text-h2 text-on-light mb-6">Everything you need, in one place</h3>
          <p className="text-lg text-muted-foreground">
            Manage leads, people and payments — all in one seamless workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
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
                className="h-full"
              >
                {feature.preview}
              </FeatureCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Facebook", color: "#1877F2" },
  { name: "IndiaMART", color: "#2E3192" },
  { name: "99acres", color: "#E31E24" },
  { name: "Housing", color: "#6B21A8" },
  { name: "Google", color: "#4285F4" },
  { name: "Meta", color: "#0668E1" },
];

export function TrustedCompaniesMarquee({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    
    const ctx = gsap.context(() => {
      // Create infinite scroll animation moving left
      // We'll move by exactly half the width since we duplicate the content
      const tl = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "linear",
      });

      // Pause on hover
      containerRef.current?.addEventListener("mouseenter", () => tl.pause());
      containerRef.current?.addEventListener("mouseleave", () => tl.play());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // We duplicate the companies array to create a seamless loop
  const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

  return (
    <div className={cn("relative overflow-hidden py-10", className)}>
      {/* Gradient masks for smooth fade on edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div ref={containerRef} className="flex overflow-hidden">
        <div 
          ref={trackRef} 
          className="flex whitespace-nowrap min-w-max items-center gap-12 md:gap-24 px-6 md:px-12"
        >
          {duplicatedCompanies.map((company, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 group cursor-default"
            >
              {/* Clean typography acting as logo placeholders */}
              <span 
                className="text-xl md:text-2xl font-bold font-sans tracking-tight transition-colors duration-300"
                style={{
                  color: "currentColor"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = company.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "currentColor";
                }}
              >
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

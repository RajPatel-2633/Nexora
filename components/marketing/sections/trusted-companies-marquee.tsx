"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  component: React.ReactNode;
}

function BrandLogo({ src, name, className }: { src: string; name: string; className: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      data-brand={name}
      className={cn("w-auto object-contain", className)}
      decoding="async"
      width={160}
      height={48}
      unoptimized
    />
  );
}

const simpleIcon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const integrations: IntegrationItem[] = [
  { id: "meta", name: "Meta", category: "Lead Generation", component: <BrandLogo src={simpleIcon("meta", "0081FB")} name="Meta" className="h-6 sm:h-7 md:h-8 lg:h-9" /> },
  { id: "meta-lead-ads", name: "Meta Lead Ads", category: "Lead Capture", component: <BrandLogo src={simpleIcon("meta", "0081FB")} name="Meta Lead Ads" className="h-6 sm:h-7 md:h-8 lg:h-9" /> },
  { id: "facebook", name: "Facebook Lead Ads", category: "Lead Capture", component: <BrandLogo src={simpleIcon("facebook", "1877F2")} name="Facebook Lead Ads" className="size-6 sm:size-7 md:size-8 lg:size-9" /> },
  { id: "google", name: "Google Ads", category: "Advertising", component: <BrandLogo src={simpleIcon("googleads", "4285F4")} name="Google Ads" className="size-6 sm:size-7 md:size-8 lg:size-9" /> },
  { id: "indiamart", name: "IndiaMART", category: "B2B Marketplace", component: <BrandLogo src={favicon("indiamart.com")} name="IndiaMART" className="size-7 sm:size-8 md:size-9 lg:size-10" /> },
  { id: "99acres", name: "99acres", category: "Real Estate Portal", component: <BrandLogo src={favicon("99acres.com")} name="99acres" className="size-7 sm:size-8 md:size-9 lg:size-10" /> },
  { id: "housing", name: "Housing.com", category: "Property Portal", component: <BrandLogo src={favicon("housing.com")} name="Housing.com" className="size-7 sm:size-8 md:size-9 lg:size-10" /> },
  { id: "magicbricks", name: "MagicBricks", category: "Real Estate Leads", component: <BrandLogo src={favicon("magicbricks.com")} name="MagicBricks" className="size-7 sm:size-8 md:size-9 lg:size-10" /> },
  { id: "whatsapp", name: "WhatsApp Business", category: "Customer Communication", component: <BrandLogo src={simpleIcon("whatsapp", "25D366")} name="WhatsApp Business" className="size-6 sm:size-7 md:size-8 lg:size-9" /> },
  { id: "zapier", name: "Zapier", category: "Automation", component: <BrandLogo src={simpleIcon("zapier", "FF4A00")} name="Zapier" className="size-6 sm:size-7 md:size-8 lg:size-9" /> },
];

export function TrustedCompaniesMarquee({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    
    const ctx = gsap.context(() => {
      // 2. Smooth GSAP infinite loop
      timelineRef.current = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 32,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Slow slightly on interaction without making the movement feel stalled.
  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0.65, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
    setHoveredIndex(null);
  };

  // Two identical sets make the -50% GSAP loop seamless.
  const duplicatedList = [...integrations, ...integrations];

  return (
    <section className={cn("relative py-12 md:py-16 overflow-hidden bg-[#030014]/60 border-y border-white/[0.06]", className)}>
      {/* Enterprise trust framing */}
      <div className="nexora-container text-center mb-8 md:mb-10">
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-400 mb-2">
          Ecosystem Integrations
        </h3>
        <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
          Works with the platforms your teams already rely on.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-pointer"
        aria-label="Integrated business platforms marquee"
      >
        {/* Soft edge gradient masks */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex whitespace-nowrap min-w-max items-center gap-10 md:gap-16 px-6"
        >
          {duplicatedList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className="relative group py-3 px-2 flex items-center justify-center transition-all duration-300"
              tabIndex={0}
              role="img"
              aria-label={`${item.name}, ${item.category}`}
            >
              <div className="opacity-60 brightness-[0.85] transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-[1.04] group-hover:-translate-y-0.5 group-focus:opacity-100 group-focus:brightness-100 group-focus:scale-[1.04] group-focus:-translate-y-0.5 group-focus:outline-none">
                {item.component}
              </div>

              {/* 5. Tooltip showing Logo Name & Category */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0B0D17] border border-white/15 text-white shadow-xl pointer-events-none z-30 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
                  >
                    <span className="text-white">{item.name}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-brand-400 text-[11px] font-bold uppercase tracking-wider">{item.category}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

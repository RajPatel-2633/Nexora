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
  { id: "meta", name: "Meta", category: "Lead Generation", component: <BrandLogo src={simpleIcon("meta", "0081FB")} name="Meta" className="size-7 md:size-8" /> },
  { id: "meta-lead-ads", name: "Meta Lead Ads", category: "Lead Capture", component: <BrandLogo src={simpleIcon("meta", "0081FB")} name="Meta Lead Ads" className="size-7 md:size-8" /> },
  { id: "facebook", name: "Facebook Lead Ads", category: "Lead Capture", component: <BrandLogo src={simpleIcon("facebook", "1877F2")} name="Facebook Lead Ads" className="size-7 md:size-8" /> },
  { id: "google", name: "Google Ads", category: "Advertising", component: <BrandLogo src={simpleIcon("googleads", "4285F4")} name="Google Ads" className="size-7 md:size-8" /> },
  { id: "indiamart", name: "IndiaMART", category: "B2B Marketplace", component: <BrandLogo src={favicon("indiamart.com")} name="IndiaMART" className="size-8 md:size-9 rounded-md" /> },
  { id: "99acres", name: "99acres", category: "Real Estate Portal", component: <BrandLogo src={favicon("99acres.com")} name="99acres" className="size-8 md:size-9 rounded-md" /> },
  { id: "housing", name: "Housing.com", category: "Property Portal", component: <BrandLogo src={favicon("housing.com")} name="Housing.com" className="size-8 md:size-9 rounded-md" /> },
  { id: "magicbricks", name: "MagicBricks", category: "Real Estate Leads", component: <BrandLogo src={favicon("magicbricks.com")} name="MagicBricks" className="size-8 md:size-9 rounded-md" /> },
  { id: "whatsapp", name: "WhatsApp Business", category: "Customer Communication", component: <BrandLogo src={simpleIcon("whatsapp", "25D366")} name="WhatsApp Business" className="size-7 md:size-8" /> },
  { id: "zapier", name: "Zapier", category: "Automation", component: <BrandLogo src={simpleIcon("zapier", "FF4A00")} name="Zapier" className="size-7 md:size-8" /> },
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
      timelineRef.current = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 36,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0.5, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
    setHoveredIndex(null);
  };

  const duplicatedList = [...integrations, ...integrations];

  return (
    <section className={cn("relative py-14 md:py-20 overflow-hidden border-b border-white/[0.08] bg-[#070913] text-white z-20", className)}>
      {/* Smooth top gradient blend from Hero dark background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050508] to-transparent z-10" />

      {/* Subtle ambient glow behind marquee */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl opacity-60" />

      {/* Header framing */}
      <div className="nexora-container text-center mb-10 md:mb-12 relative z-10">
        <h3 className="text-xs md:text-sm section-label text-brand-400 mb-2.5">
          Ecosystem Integrations
        </h3>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight" style={{ fontWeight: 700 }}>
          Works with the platforms your teams already rely on.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-pointer py-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
        aria-label="Integrated business platforms marquee"
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap min-w-max items-center gap-6 md:gap-8 px-4"
        >
          {duplicatedList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className="relative group py-2"
              tabIndex={0}
              role="img"
              aria-label={`${item.name}, ${item.category}`}
            >
              {/* Rich Glass Badge Card */}
              <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-xl transition-all duration-300 group-hover:border-brand-500/40 group-hover:bg-white/[0.08] group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-brand-500/20">
                <div className="flex items-center justify-center size-9 md:size-10 shrink-0">
                  {item.component}
                </div>
                <div className="flex flex-col text-left pr-1">
                  <span className="text-sm md:text-base font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Tooltip on Hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-[#0F111D] border border-white/20 text-white shadow-2xl pointer-events-none z-30 flex items-center gap-2 text-xs font-semibold whitespace-nowrap"
                  >
                    <span className="text-white font-bold">{item.name}</span>
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

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  { name: "Facebook", abbr: "f", color: "#1877F2" },
  { name: "IndiaMART", abbr: "IM", color: "#2E3192" },
  { name: "99acres", abbr: "99", color: "#E31E24" },
  { name: "Housing", abbr: "H", color: "#6B21A8" },
  { name: "Google Ads", abbr: "G", color: "#4285F4" },
  { name: "WhatsApp", abbr: "WA", color: "#25D366" },
  { name: "Zapier", abbr: "Z", color: "#FF4A00" },
  { name: "MagicBricks", abbr: "MB", color: "#FF0000" },
];

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current || !hubRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Hub Parallax
      gsap.fromTo(hubRef.current,
        { y: 100, scale: 0.9 },
        {
          y: -50,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 1. Draw connection lines
      gsap.fromTo(
        linesRef.current,
        { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.3,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // 2. Pulse connection lines continuously
      gsap.to(linesRef.current, {
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2, // Start pulsing after draw animation
      });

      // 3. Animate dots traveling along the lines
      dotsRef.current.forEach((dot, i) => {
        if (!dot || !linesRef.current[i]) return;
        
        // Find line coordinates
        const line = linesRef.current[i];
        if (!line) return;
        
        const x1 = line.getAttribute("x1") as string;
        const y1 = line.getAttribute("y1") as string;
        const x2 = line.getAttribute("x2") as string;
        const y2 = line.getAttribute("y2") as string;
        
        gsap.fromTo(dot,
          { attr: { cx: x1, cy: y1 }, opacity: 0, scale: 0 },
          {
            attr: { cx: x2, cy: y2 },
            opacity: 1,
            scale: 1,
            duration: 2 + Math.random(), // Randomize speed slightly
            repeat: -1,
            delay: i * 0.3,
            ease: "power1.inOut",
          }
        );
      });

      // 4. Reveal Nodes
      gsap.fromTo(
        [centerNodeRef.current, ...nodesRef.current],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="integrations" className="section-light-alt section-md relative overflow-hidden">
      <div className="nexora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Integrations</h2>
          <h3 className="text-h2 text-on-light mb-6">Connect. Import. Convert.</h3>
          <p className="text-lg text-muted-foreground">
            Nexora connects with the platforms you already use. Import leads automatically and centralize your data.
          </p>
        </div>

        {/* Hub and Spoke Layout Container */}
        <div ref={hubRef} className="relative mx-auto max-w-4xl w-full aspect-square md:aspect-video flex items-center justify-center">
          
          {/* Connection Lines (SVG) */}
          <svg 
            ref={svgRef} 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 0 }}
          >
            {integrations.map((_, i) => {
              const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 40; // Percentage of container
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <g key={i}>
                  <line
                    ref={(el) => { linesRef.current[i] = el; }}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="text-brand-500/30"
                  />
                  <circle
                    ref={(el) => { dotsRef.current[i] = el; }}
                    r="3"
                    fill="currentColor"
                    className="text-brand-500 shadow-glow shadow-brand-500/50"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Node: Nexora CRM */}
          <div 
            ref={centerNodeRef}
            className="absolute left-1/2 top-1/2 z-20 flex size-24 md:size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-brand-950 text-white shadow-2xl shadow-brand-500/30 ring-8 ring-brand-500/10 transition-all hover:scale-105 hover:shadow-brand-500/50"
          >
            <Hexagon className="size-8 md:size-10 mb-1 text-brand-400" />
            <span className="text-xs md:text-sm font-bold tracking-tight">Nexora</span>
            <span className="text-[9px] md:text-[10px] text-brand-300">CRM</span>
          </div>

          {/* Surrounding Nodes */}
          {integrations.map((integration, i) => {
            const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 40; // Percentage of container distance from center
            const top = `${50 + radius * Math.sin(angle)}%`;
            const left = `${50 + radius * Math.cos(angle)}%`;

            // Framer motion for continuous floating animation
            return (
              <motion.div
                key={integration.name}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ top, left }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2, // Randomize float duration
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                <div 
                  ref={(el) => { nodesRef.current[i] = el; }}
                  className="group relative flex flex-col items-center justify-center"
                >
                  {/* Glow background on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" 
                    style={{ backgroundColor: integration.color }} 
                  />
                  
                  {/* Icon Card */}
                  <div className="relative flex size-14 md:size-16 items-center justify-center rounded-2xl border bg-background shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:shadow-xl">
                    <span 
                      className="text-xl md:text-2xl font-bold" 
                      style={{ color: integration.color }}
                    >
                      {integration.abbr}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-6 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                    {integration.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <button className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-brand transition-all hover:bg-brand-500 hover:shadow-brand-lg">
            View all integrations
          </button>
        </div>
      </div>
    </section>
  );
}

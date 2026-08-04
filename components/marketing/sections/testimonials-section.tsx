"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { 
    quote: "Nexora CRM has completely transformed the way we handle our leads and operations. Our team is more productive and our conversions are up 35%!", 
    name: "Rahul Sharma", 
    role: "CEO, UrbanBuild Realty", 
    initials: "RS", 
    company: "UrbanBuild", 
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0"
  },
  { 
    quote: "The HRMS features are incredible. Managing attendance and payroll used to take our HR team days, now it takes hours. Highly recommended.", 
    name: "Priya Verma", 
    role: "HR Director, TechNova", 
    initials: "PV", 
    company: "TechNova", 
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/0"
  },
  { 
    quote: "We scaled our operations 10x using their pipeline management. The automated invoicing alone paid for the platform in the first month.", 
    name: "Amit Patel", 
    role: "Founder, Skyline Dev", 
    initials: "AP", 
    company: "Skyline", 
    color: "bg-amber-500",
    gradient: "from-amber-500/20 to-amber-500/0"
  },
  { 
    quote: "Customer support is top notch. They helped us migrate from our legacy CRM in under a week with zero downtime. Phenomenal experience.", 
    name: "Sneha Rao", 
    role: "Operations Head, GreenLeaf", 
    initials: "SR", 
    company: "GreenLeaf", 
    color: "bg-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0"
  },
  { 
    quote: "The real-time analytics dashboard is a game-changer. We finally have a single source of truth for all our business metrics.", 
    name: "Vikram Singh", 
    role: "VP Sales, PrimeSpace", 
    initials: "VS", 
    company: "PrimeSpace", 
    color: "bg-rose-500",
    gradient: "from-rose-500/20 to-rose-500/0"
  },
];

// Double the array for seamless infinite looping
const duplicatedTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [controls]);

  // Hover functions removed to fix unused variable warning, relies on Framer motion whileHover instead

  return (
    <section id="testimonials" className="section-dark section-md relative overflow-hidden bg-brand-950 text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="nexora-container relative z-10 mb-16 md:mb-24 text-center max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-brand-400 tracking-wider uppercase mb-3">Testimonials</h2>
        <h3 className="text-h2 text-white mb-6">Loved by thousands of businesses</h3>
        <p className="text-lg text-white/60">
          See how Nexora is helping teams around the world simplify their operations and grow their business.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex py-10 group/carousel">
        
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-brand-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-brand-950 to-transparent z-20 pointer-events-none" />

        {/* Carousel Track */}
        <motion.div 
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-4"
          animate={controls}
          // Slow down the animation slightly when hovering the carousel
          whileHover={{ animationPlayState: "paused" }} // CSS trick doesn't work perfectly with Framer, but we can rely on card hover
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative w-[300px] sm:w-[350px] md:w-[400px] shrink-0"
            >
              {/* Glass Card */}
              <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl overflow-hidden group">
                
                {/* Subtle gradient splash inside card */}
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br", testimonial.gradient)} />
                
                <Quote className="absolute top-6 right-6 size-12 text-white/5" />

                {/* Animated Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="mb-8 text-lg text-white/90 leading-relaxed font-medium flex-grow relative z-10">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className={cn("flex size-12 items-center justify-center rounded-full text-sm font-bold shadow-lg", testimonial.color)}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/50">{testimonial.role}</p>
                  </div>
                </div>

                {/* Simulated Company Logo */}
                <div className="absolute bottom-6 right-6 text-xs font-bold uppercase tracking-widest text-white/20">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

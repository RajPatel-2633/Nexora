"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Mail, Phone } from "lucide-react";

export function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const benefits = [
    "Full platform walkthrough",
    "Custom use-case discussion",
    "No commitment, just value"
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#030014] text-white py-16 md:py-24">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" 
        />
        <motion.div 
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3" 
        />
      </div>

      <div className="nexora-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Illustration & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 backdrop-blur-md">
              <span className="flex size-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="text-xs font-medium uppercase tracking-widest text-brand-300">Get a Demo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              See Nexora CRM in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-violet-400">action</span>
            </h2>
            
            <p className="text-lg text-white/60 mb-10 max-w-md">
              Book a personalized demo and discover how Nexora can transform your business operations and accelerate growth.
            </p>

            <ul className="space-y-4 mb-12">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                    <Check className="size-3.5 font-bold" />
                  </div>
                  <span className="text-white/80 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Abstract Illustration / Business Info */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-brand-400">
                  <Mail className="size-6" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Email Us</div>
                  <a href="mailto:hello@nexora.com" className="text-base font-semibold hover:text-brand-400 transition-colors">hello@nexora.com</a>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-white/10" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-violet-400">
                  <Phone className="size-6" />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Call Us</div>
                  <a href="tel:+18001234567" className="text-base font-semibold hover:text-violet-400 transition-colors">+1 (800) 123-4567</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
              <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-3xl opacity-50" />
              
              <form 
                className="relative bg-[#0B0D17]/90 backdrop-blur-xl border border-white/[0.08] p-8 md:p-10 rounded-3xl shadow-2xl"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70">Full Name</label>
                    <motion.div 
                      animate={{ 
                        borderColor: focusedField === 'name' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 0 0 0px rgba(99,102,241,0)'
                      }}
                      className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors"
                    >
                      <input 
                        type="text" 
                        placeholder="Enter your name" 
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70">Work Email</label>
                    <motion.div 
                      animate={{ 
                        borderColor: focusedField === 'email' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 0 0 0px rgba(99,102,241,0)'
                      }}
                      className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors"
                    >
                      <input 
                        type="email" 
                        placeholder="Enter your work email" 
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70">Company Name</label>
                    <motion.div 
                      animate={{ 
                        borderColor: focusedField === 'company' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        boxShadow: focusedField === 'company' ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 0 0 0px rgba(99,102,241,0)'
                      }}
                      className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors"
                    >
                      <input 
                        type="text" 
                        placeholder="Enter your company" 
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70">Phone Number</label>
                    <motion.div 
                      animate={{ 
                        borderColor: focusedField === 'phone' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        boxShadow: focusedField === 'phone' ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 0 0 0px rgba(99,102,241,0)'
                      }}
                      className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors"
                    >
                      <input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Select Subject */}
                <div className="space-y-2 mb-8">
                  <label className="text-xs font-semibold text-white/70">How can we help you?</label>
                  <motion.div 
                    animate={{ 
                      borderColor: focusedField === 'subject' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                      boxShadow: focusedField === 'subject' ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 0 0 0px rgba(99,102,241,0)'
                    }}
                    className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors relative pr-4"
                  >
                    <select 
                      className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      defaultValue=""
                    >
                      <option value="" disabled className="text-black bg-white">Select an option</option>
                      <option value="sales" className="text-black bg-white">Sales Inquiry</option>
                      <option value="demo" className="text-black bg-white">Request Demo</option>
                      <option value="support" className="text-black bg-white">Support</option>
                      <option value="other" className="text-black bg-white">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                      ▼
                    </div>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-4 font-bold text-white shadow-lg transition-all hover:shadow-brand-500/25"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <span className="relative flex items-center justify-center gap-2">
                    Book a Demo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>

                <p className="mt-6 text-center text-[11px] text-white/40">
                  By submitting this form, you agree to our <a href="#" className="underline hover:text-white/80">Privacy Policy</a> and <a href="#" className="underline hover:text-white/80">Terms of Service</a>.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

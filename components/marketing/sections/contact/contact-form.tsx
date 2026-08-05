"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactFormData, FormStatus, FormErrors } from "@/types/domain/contact";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "demo",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulated API Call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", company: "", phone: "", subject: "demo" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Outer Card Glass Container */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
        <div className="absolute inset-0 bg-brand-500/10 blur-2xl rounded-3xl opacity-40 pointer-events-none" />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative bg-[#0B0D17]/90 backdrop-blur-2xl border border-white/[0.08] p-7 md:p-10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Success Banner Overlay if Submitted */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/10">
                    <CheckCircle2 className="size-6" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Demo Requested!</h4>
                <p className="text-xs md:text-sm text-white/70 max-w-sm mx-auto mb-4 leading-relaxed">
                  Thank you, <span className="text-emerald-400 font-semibold">{formData.name}</span>. We&apos;ll contact you at <span className="text-white font-medium">{formData.email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Submit another request
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* 3. Floating Label Input: Full Name */}
            <FloatingInput
              id="name"
              label="Full Name"
              type="text"
              autoComplete="name"
              value={formData.name}
              error={errors.name}
              focusedField={focusedField}
              disabled={status === "submitting" || status === "success"}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, name: val }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Floating Label Input: Work Email */}
            <FloatingInput
              id="email"
              label="Work Email"
              type="email"
              autoComplete="email"
              value={formData.email}
              error={errors.email}
              focusedField={focusedField}
              disabled={status === "submitting" || status === "success"}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, email: val }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Floating Label Input: Company Name */}
            <FloatingInput
              id="company"
              label="Company Name"
              type="text"
              autoComplete="organization"
              value={formData.company}
              error={errors.company}
              focusedField={focusedField}
              disabled={status === "submitting" || status === "success"}
              onChange={(val) => setFormData((prev) => ({ ...prev, company: val }))}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Floating Label Input: Phone Number */}
            <FloatingInput
              id="phone"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              error={errors.phone}
              focusedField={focusedField}
              disabled={status === "submitting" || status === "success"}
              onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Select Subject Dropdown */}
          <div className="space-y-1.5 mb-8">
            <label htmlFor="subject" className="text-xs font-semibold text-white/70 block">
              How can we help you?
            </label>
            <div className="relative">
              <select
                id="subject"
                value={formData.subject}
                disabled={status === "submitting" || status === "success"}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full bg-black/30 border rounded-xl px-4 py-3.5 text-sm text-white outline-none appearance-none cursor-pointer transition-all duration-300",
                  focusedField === "subject"
                    ? "border-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <option value="demo" className="text-black bg-white">Request Demo & Walkthrough</option>
                <option value="sales" className="text-black bg-white">Sales & Enterprise Inquiry</option>
                <option value="support" className="text-black bg-white">Technical Support</option>
                <option value="other" className="text-black bg-white">General Question</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* 1 & 2. Usability-First Morphing Submit Button (No Magnetic Wobble) */}
          <motion.button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            whileHover={status === "idle" ? { scale: 1.02 } : undefined}
            whileTap={status === "idle" ? { scale: 0.98 } : undefined}
            className={cn(
              "group relative w-full overflow-hidden rounded-xl px-6 py-4 font-bold text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2",
              status === "success"
                ? "bg-emerald-600 shadow-emerald-500/30"
                : "bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:brightness-110 shadow-brand-500/30"
            )}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2 text-sm">
                <Loader2 className="size-4 animate-spin text-white" />
                <span>Scheduling your demo...</span>
              </span>
            ) : status === "success" ? (
              <span className="flex items-center gap-2 text-sm text-white font-bold">
                <CheckCircle2 className="size-4" />
                <span>Demo Requested ✓</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 text-sm md:text-base">
                <span>Book a Demo</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            )}
          </motion.button>

          <p className="mt-6 text-center text-[11px] text-white/40">
            By submitting this form, you agree to our{" "}
            <a href="#" className="underline hover:text-white/80 transition-colors">Privacy Policy</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-white/80 transition-colors">Terms of Service</a>.
          </p>
        </form>
      </div>
    </motion.div>
  );
}

// Subcomponent for Floating Label Inputs
function FloatingInput({
  id,
  label,
  type,
  autoComplete,
  value,
  error,
  focusedField,
  disabled,
  onChange,
  onFocus,
  onBlur,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  value: string;
  error?: string;
  focusedField: string | null;
  disabled?: boolean;
  onChange: (val: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const isFocused = focusedField === id;
  const isFilled = value.length > 0;

  return (
    <div className="space-y-1 relative">
      <div className="relative">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder=" "
          className={cn(
            "w-full bg-black/30 border rounded-xl px-4 pt-5 pb-2 text-sm text-white outline-none transition-all duration-300 peer",
            error
              ? "border-rose-500/70 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
              : isFocused
              ? "border-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
              : "border-white/10 hover:border-white/20"
          )}
        />

        {/* 3. Floating Label Transition */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-3.5 text-xs transition-all duration-200 pointer-events-none origin-left select-none",
            isFocused || isFilled
              ? "-translate-y-2.5 scale-90 text-brand-400 font-semibold"
              : "text-white/40"
          )}
        >
          {label}
        </label>

        {/* Bottom Expanding Accent Line on Focus */}
        <motion.div
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-500 rounded-full origin-center"
        />
      </div>

      {/* Error Message */}
      {error && (
        <p id={`${id}-error`} className="text-[11px] font-medium text-rose-400 pt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { BackgroundMesh } from "./contact/background-mesh";
import { ContactInfo } from "./contact/contact-info";
import { ContactForm } from "./contact/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#030014] text-white py-16 md:py-24">
      {/* 4. Calm Background Mesh & Ambient Glow */}
      <BackgroundMesh />

      <div className="nexora-container relative z-10">
        {/* Exact 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: High-Conversion Messaging & Info Cards */}
          <ContactInfo />

          {/* Right Column: Reusable Form with Floating Labels & Success Flow */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

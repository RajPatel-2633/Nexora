import { Hero } from "@/components/marketing/hero";
import { TrustedCompaniesMarquee } from "@/components/marketing/sections/trusted-companies-marquee";
import { FeaturesSection } from "@/components/marketing/sections/features-section";
import { DashboardPreviewSection } from "@/components/marketing/sections/dashboard-preview-section";
import { IntegrationsSection } from "@/components/marketing/sections/integrations-section";
import { WhyChooseSection } from "@/components/marketing/sections/why-choose-section";
import { TestimonialsSection } from "@/components/marketing/sections/testimonials-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <TrustedCompaniesMarquee className="bg-background border-b border-white/5" />

      <FeaturesSection />

      <DashboardPreviewSection />

      <IntegrationsSection />

      <WhyChooseSection />

      <TestimonialsSection />

      <section id="pricing" className="section-light section-md">
        <div className="nexora-container">
          <h2 className="text-h2 text-on-light">Pricing</h2>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

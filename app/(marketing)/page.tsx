import { Hero } from "@/components/marketing/hero";
import { TrustedCompaniesMarquee } from "@/components/marketing/sections/trusted-companies-marquee";
import { FeaturesSection } from "@/components/marketing/sections/features-section";
import { DashboardPreviewSection } from "@/components/marketing/sections/dashboard-preview-section";
import { IntegrationsSection } from "@/components/marketing/sections/integrations-section";
import { WhyChooseSection } from "@/components/marketing/sections/why-choose-section";
import { TestimonialsSection } from "@/components/marketing/sections/testimonials-section";
import { PricingSection } from "@/components/marketing/sections/pricing-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <TrustedCompaniesMarquee />

      <FeaturesSection />

      <DashboardPreviewSection />

      <IntegrationsSection />

      <WhyChooseSection />

      <TestimonialsSection />

      <PricingSection />

      <ContactSection />
    </>
  );
}

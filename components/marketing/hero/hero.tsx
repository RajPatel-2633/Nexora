"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroVisual } from "./hero-visual";
import { HeroLogoCloud } from "./hero-logo-cloud";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-hero relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="nexora-container relative z-10">
        <div className="grid-hero">
          <HeroContent />
          <HeroVisual className="mt-12 lg:mt-0" />
        </div>

        <HeroLogoCloud className="lg:hidden" />
      </div>
    </section>
  );
}

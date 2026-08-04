"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Tracks active section for navbar link indicators.
 * Uses Intersection Observer for performant scroll-spy.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  const observeSections = useCallback(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  return activeSection;
}

/**
 * Returns whether a nav href matches the current active section or pathname.
 */
export function useNavLinkActive(href: string, activeSection: string) {
  const isHash = href.startsWith("#");
  const sectionId = isHash ? href.slice(1) : "";

  if (isHash) {
    return activeSection === sectionId;
  }

  return false;
}

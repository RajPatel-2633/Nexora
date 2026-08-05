"use client";

import { useCallback } from "react";
import gsap from "gsap";

export function useRevealAnimation() {
  const countUp = useCallback(
    (
      ref: React.RefObject<HTMLElement | null>,
      endValue: number,
      prefix: string = "",
      suffix: string = "",
      duration: number = 1.5,
      triggerElement?: HTMLElement | null
    ) => {
      if (!ref.current) return;
      const target = { val: 0 };

      return gsap.to(target, {
        val: endValue,
        duration,
        ease: "power2.out",
        scrollTrigger: triggerElement
          ? {
              trigger: triggerElement,
              start: "top 85%",
            }
          : undefined,
        onUpdate: () => {
          if (ref.current) {
            let formatted = target.val.toFixed(0);
            if (endValue % 1 !== 0) formatted = target.val.toFixed(1);
            if (endValue >= 1000) {
              formatted = target.val.toLocaleString();
            }
            ref.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    },
    []
  );

  const fillProgress = useCallback(
    (
      elements: (HTMLElement | null)[],
      targetWidths: (number | string)[],
      duration: number = 1.2,
      triggerElement?: HTMLElement | null
    ) => {
      const validElements = elements.filter(Boolean);
      if (validElements.length === 0) return;

      return gsap.fromTo(
        validElements,
        { width: "0%" },
        {
          width: (i) =>
            typeof targetWidths[i] === "number"
              ? `${targetWidths[i]}%`
              : targetWidths[i],
          duration,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: triggerElement
            ? {
                trigger: triggerElement,
                start: "top 85%",
              }
            : undefined,
        }
      );
    },
    []
  );

  const growBars = useCallback(
    (
      elements: (HTMLElement | null)[],
      targetHeights: number[],
      duration: number = 1.2,
      triggerElement?: HTMLElement | null
    ) => {
      const validElements = elements.filter(Boolean);
      if (validElements.length === 0) return;

      return gsap.fromTo(
        validElements,
        { height: "0%" },
        {
          height: (i) => `${targetHeights[i] ?? 0}%`,
          duration,
          ease: "back.out(1.4)",
          stagger: 0.08,
          scrollTrigger: triggerElement
            ? {
                trigger: triggerElement,
                start: "top 85%",
              }
            : undefined,
        }
      );
    },
    []
  );

  const drawSVG = useCallback(
    (
      pathRef: React.RefObject<SVGPathElement | null>,
      areaRef?: React.RefObject<SVGPathElement | null>,
      pointsRef?: React.RefObject<(SVGCircleElement | null)[]>,
      duration: number = 1.5,
      triggerElement?: HTMLElement | null
    ) => {
      if (!pathRef.current) return;
      const length = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      if (areaRef?.current) {
        gsap.set(areaRef.current, { opacity: 0, y: 15 });
      }

      if (pointsRef?.current) {
        gsap.set(pointsRef.current, { scale: 0, opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: triggerElement
          ? {
              trigger: triggerElement,
              start: "top 85%",
            }
          : undefined,
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration,
        ease: "power2.inOut",
      });

      if (areaRef?.current) {
        tl.to(
          areaRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      if (pointsRef?.current) {
        tl.to(
          pointsRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
      }

      return tl;
    },
    []
  );

  return {
    countUp,
    fillProgress,
    growBars,
    drawSVG,
  };
}

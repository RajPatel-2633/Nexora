export const MOTION_TOKENS = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    idleMin: 10,
    idleMax: 16,
    ringOuter: 20,
    ringMiddle: 15,
    pulseInner: 3,
  },
  easing: {
    saas: [0.16, 1, 0.3, 1] as const,
    sineInOut: "sine.inOut",
    power2Out: "power2.out",
    power3Out: "power3.out",
    backOut: "back.out(1.6)",
  },
  spring: {
    cardHover: { type: "spring", stiffness: 350, damping: 22 },
    nodePop: { type: "spring", stiffness: 400, damping: 25 },
  },
  feature: {
    hover: { y: -8, scale: 1.015 },
    reveal: { y: 60, opacity: 0, duration: 0.8, stagger: 0.2 },
    idleDelay: 12,
  },
  dashboard: {
    hover: { y: -5, scale: 1.01 },
  },
  hero: {
    float: { y: [-2, 2, -2], duration: 5.5 },
  },
  navbar: {
    shrinkWidth: "88%",
    shrinkHeight: 56,
  },
  integrations: {
    particleDuration: 3.2,
  },
  categoryColors: {
    Lead: {
      color: "#3B82F6",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    Invoice: {
      color: "#10B981",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.4)",
    },
    HR: {
      color: "#8B5CF6",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
      glow: "rgba(139, 92, 246, 0.4)",
    },
    Notification: {
      color: "#F97316",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400",
      glow: "rgba(249, 115, 22, 0.4)",
    },
    Analytics: {
      color: "#06B6D4",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.4)",
    },
  },
} as const;

export type DataCategory = keyof typeof MOTION_TOKENS.categoryColors;

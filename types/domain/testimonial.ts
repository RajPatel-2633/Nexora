export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number; // e.g. 5
  avatarGradient: string; // e.g. "from-blue-600 via-indigo-600 to-violet-700"
  accentColor: string; // e.g. "text-blue-400"
  glowColor: string; // e.g. "rgba(59,130,246,0.25)"
  cardGradient: string; // e.g. "from-blue-500/15 via-indigo-500/5 to-transparent"
  minHeight: string; // e.g. "min-h-[320px]"
}

export interface TrustMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  isDecimal?: boolean;
}

export interface PricingFeature {
  name: string;
  included: boolean;
  comingSoon?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  highlighted: boolean;
  badge?: string;
  ctaLabel: string;
  ctaVariant: "primary" | "glass" | "secondary";
  gradient: string;
  glowColor: string;
  borderHoverColor: string;
}

export interface TrustIndicator {
  id: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
  isComingSoon?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialItem {
  name: string;
  href: string;
  iconName: "github" | "linkedin" | "x" | "youtube";
}

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Handshake,
  Contact,
  CheckSquare,
  Building2,
  UserCheck,
  Clock,
  Wallet,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

export type HeroStat = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export type PipelineStage = {
  label: string;
  count: number;
  width: number;
};

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type Notification = {
  title: string;
  message: string;
  time: string;
  type: "lead" | "deal" | "invoice";
};

export type PartnerLogo = {
  name: string;
  abbr: string;
  color?: string;
};

export const heroContent = {
  badge: "All-in-One CRM Platform",
  heading: {
    line1: "Run Your Sales.",
    line2: "Simplify Operations.",
    gradient: "Grow Your Business.",
  },
  description:
    "Nexora CRM unifies Lead Management, HRMS, Invoicing and Integrations in one intelligent platform to help you close more deals and simplify everyday work.",
  primaryCta: { label: "Book a Demo", href: "#contact" },
  secondaryCta: { label: "Explore Features", href: "#features" },
  trust: {
    count: "2,500+",
    label: "Trusted by 2,500+ businesses worldwide",
    avatars: ["SK", "AP", "MR"],
  },
} as const;

export const heroStats: HeroStat[] = [
  { label: "Total Leads", value: "2,543", change: "+18.2%", positive: true },
  { label: "Deals Won", value: "320", change: "+12.5%", positive: true },
  { label: "Revenue", value: "₹12.45L", change: "+18.4%", positive: true },
  { label: "Invoices Due", value: "18", change: "-6.2%", positive: false },
];

export const pipelineStages: PipelineStage[] = [
  { label: "New Leads", count: 842, width: 100 },
  { label: "Contacted", count: 624, width: 74 },
  { label: "Qualified", count: 412, width: 49 },
  { label: "Proposal", count: 186, width: 22 },
  { label: "Won", count: 320, width: 38 },
];

export const revenueData = [
  { month: "Mar", value: 42 },
  { month: "Apr", value: 58 },
  { month: "May", value: 52 },
  { month: "Jun", value: 71 },
  { month: "Jul", value: 85 },
  { month: "Aug", value: 98 },
];

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Leads", icon: Users },
  { label: "Deals", icon: Handshake },
  { label: "Contacts", icon: Contact },
  { label: "Tasks", icon: CheckSquare },
  { label: "HRMS", icon: Building2 },
  { label: "Employees", icon: UserCheck },
  { label: "Attendance", icon: Clock },
  { label: "Payroll", icon: Wallet },
  { label: "Invoicing", icon: FileText },
  { label: "Payments", icon: CreditCard },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export const notifications: Notification[] = [
  {
    title: "New Lead Assigned",
    message: "Priya Sharma from Mumbai — ₹45L budget",
    time: "2m ago",
    type: "lead",
  },
  {
    title: "Deal Closed",
    message: "TechCorp Enterprise — ₹8.2L annual",
    time: "15m ago",
    type: "deal",
  },
];

export const partnerLogos: PartnerLogo[] = [
  { name: "Facebook", abbr: "f", color: "#1877F2" },
  { name: "IndiaMART", abbr: "IM", color: "#2E3192" },
  { name: "99acres", abbr: "99", color: "#E31E24" },
  { name: "Housing.com", abbr: "H", color: "#6B21A8" },
  { name: "Google Ads", abbr: "G", color: "#4285F4" },
  { name: "MagicBricks", abbr: "MB", color: "#FF0000" },
];

export const floatingCards = [
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "24.8%",
    change: "+3.2%",
    position: "top-right" as const,
  },
  {
    id: "active-users",
    label: "Active Users",
    value: "1,284",
    change: "+12 today",
    position: "bottom-left" as const,
  },
];

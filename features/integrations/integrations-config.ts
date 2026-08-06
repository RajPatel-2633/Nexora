export type ConnectionType = "Webhook" | "OAuth" | "API" | "Native";

export type NodeRole = "input" | "core" | "output";

export type IntegrationConfig = {
  id: string;
  name: string;
  brandColor: string;
  connectionType: ConnectionType;
  description: string;
  role: NodeRole;
  isFeatured?: boolean;
  href?: string;
  category?: "Social" | "Ads" | "Real Estate" | "Messaging" | "Automation" | "Core System";
  badgeText?: string;
  connectionLabel?: string;
};

export const inputIntegrationsConfig: IntegrationConfig[] = [
  {
    id: "facebook",
    name: "Facebook Lead Ads",
    brandColor: "#1877F2",
    connectionType: "Webhook",
    description: "Instant lead sync from Lead Ads & Messenger forms.",
    role: "input",
    isFeatured: true,
    category: "Social",
    badgeText: "Instant Sync",
    connectionLabel: "Lead Sync",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    brandColor: "#4285F4",
    connectionType: "OAuth",
    description: "Capture Google Search & Display campaign leads in real-time.",
    role: "input",
    isFeatured: true,
    category: "Ads",
    badgeText: "High Intent",
    connectionLabel: "Click Sync",
  },
  {
    id: "indiamart",
    name: "IndiaMART",
    brandColor: "#2E3192",
    connectionType: "API",
    description: "Direct B2B buyer inquiry integration & auto-assignment.",
    role: "input",
    isFeatured: true,
    category: "Real Estate",
    badgeText: "B2B Leads",
    connectionLabel: "B2B Inquiry",
  },
  {
    id: "housing",
    name: "Housing.com",
    brandColor: "#6B21A8",
    connectionType: "API",
    description: "Sync property inquiries & site visit requests automatically.",
    role: "input",
    category: "Real Estate",
    connectionLabel: "Prop Inquiry",
  },
  {
    id: "99acres",
    name: "99acres",
    brandColor: "#E31E24",
    connectionType: "Webhook",
    description: "Real-time tenant & buyer lead capture for real estate.",
    role: "input",
    isFeatured: true,
    category: "Real Estate",
    badgeText: "PropTech",
    connectionLabel: "Real Estate",
  },
  {
    id: "magicbricks",
    name: "MagicBricks",
    brandColor: "#FF0000",
    connectionType: "API",
    description: "Automated buyer lead import & CRM workflow triggering.",
    role: "input",
    category: "Real Estate",
    connectionLabel: "Lead Stream",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    brandColor: "#25D366",
    connectionType: "Native",
    description: "Auto-send instant template replies & trigger chat flows.",
    role: "input",
    isFeatured: true,
    category: "Messaging",
    badgeText: "2-Way Chat",
    connectionLabel: "Auto Reply",
  },
  {
    id: "zapier",
    name: "Zapier",
    brandColor: "#FF4A00",
    connectionType: "OAuth",
    description: "Connect 5,000+ web apps with custom multi-step Zaps.",
    role: "input",
    isFeatured: true,
    category: "Automation",
    badgeText: "5,000+ Apps",
    connectionLabel: "Multi-Zap",
  },
];

export const outputModulesConfig: IntegrationConfig[] = [
  {
    id: "sales-crm",
    name: "Sales CRM Pipeline",
    brandColor: "#3B82F6",
    connectionType: "Native",
    description: "Auto-assign leads, track deal stages & manage pipeline.",
    role: "output",
    category: "Core System",
    connectionLabel: "Lead Routing",
  },
  {
    id: "analytics",
    name: "Analytics Engine",
    brandColor: "#06B6D4",
    connectionType: "Native",
    description: "Real-time revenue attribution & ROI dashboards.",
    role: "output",
    category: "Core System",
    connectionLabel: "ROI Analytics",
  },
  {
    id: "hrms",
    name: "HRMS & Attendance",
    brandColor: "#8B5CF6",
    connectionType: "Native",
    description: "Auto-schedule site visits & sync agent workloads.",
    role: "output",
    category: "Core System",
    connectionLabel: "CRM Pipeline",
  },
  {
    id: "invoicing",
    name: "Invoicing Engine",
    brandColor: "#10B981",
    connectionType: "Native",
    description: "Draft invoices & sync payment milestones automatically.",
    role: "output",
    category: "Core System",
    connectionLabel: "Invoices",
  },
];

export const integrationsConfig: IntegrationConfig[] = [
  ...inputIntegrationsConfig,
  ...outputModulesConfig,
];

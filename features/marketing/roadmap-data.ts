import { Zap, Sparkles, Network, BarChart3, type LucideIcon } from "lucide-react";

export type RoadmapStatus = "Available" | "In Development" | "Coming Soon" | "Planned";
export type AnimationType = "progress" | "shimmer" | "nodes" | "chart";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  icon: LucideIcon;
  animationType: AnimationType;
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Automate repetitive operations",
    status: "Available",
    icon: Zap,
    animationType: "progress",
  },
  {
    id: "ai-copilot",
    title: "AI Copilot",
    description: "Natural-language CRM assistant",
    status: "Coming Soon",
    icon: Sparkles,
    animationType: "shimmer",
  },
  {
    id: "knowledge-graph",
    title: "Knowledge Graph CRM",
    description: "Context-aware business intelligence",
    status: "In Development",
    icon: Network,
    animationType: "nodes",
  },
  {
    id: "smart-reports",
    title: "Smart Reports",
    description: "AI-powered executive summaries",
    status: "Planned",
    icon: BarChart3,
    animationType: "chart",
  },
];

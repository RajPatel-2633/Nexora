export type AnalyticsMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: string;
  positive?: boolean;
};

export type AnalyticsData = {
  totalRevenue: number;
  activeDeals: number;
  conversionRate: number;
  newLeads: number;
};

export type AIInsight = {
  summary: string;
  trend?: string;
  confidence?: number;
  recommendation?: string;
};

export type PipelineStage = {
  stage: string;
  count: number;
  value: number;
};

export type RevenueDataPoint = {
  month: string;
  revenue: number;
};

export type Lead = {
  id: number | string;
  name: string;
  source: string;
  status: "Hot" | "New" | "Contacted" | "Qualified" | string;
  time: string;
  initials: string;
  color: string;
  priority?: "High" | "Medium" | "Low";
  riskScore?: number;
};

export type AttendanceData = {
  present: number;
  absent: number;
  leave: number;
  weeklyTrend: number[];
};

export type Invoice = {
  id: string;
  client: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue" | string;
  date: string;
  anomaly?: boolean;
};

export type NotificationItem = {
  id: number | string;
  title: string;
  desc: string;
  time: string;
  icon: "deal" | "invoice" | "hr" | "lead" | string;
  unread?: boolean;
};

export type LeadStage = {
  id: string;
  name: string;
  count: number;
  revenue: string;
  active: boolean;
};

export const leadWorkflowFixtures: LeadStage[] = [
  { id: "stage-1", name: "Lead Created", count: 24, revenue: "₹4.5L", active: true },
  { id: "stage-2", name: "Qualified", count: 18, revenue: "₹8.2L", active: true },
  { id: "stage-3", name: "Proposal Sent", count: 12, revenue: "₹14.0L", active: true },
  { id: "stage-4", name: "Won", count: 8, revenue: "+₹75,000", active: true },
];

export const leadListFixtures = [
  { id: "1", name: "Aarav Mehta", source: "Facebook Lead Ads", status: "Won", value: "₹75,000", time: "2m ago" },
  { id: "2", name: "Priya Verma", source: "IndiaMART", status: "Proposal", value: "₹1,20,000", time: "5m ago" },
  { id: "3", name: "Rohit Singh", source: "99acres", status: "Qualified", value: "₹45,000", time: "10m ago" },
];

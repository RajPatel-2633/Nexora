export const analyticsData = {
  totalRevenue: 1245000,
  activeDeals: 320,
  conversionRate: 24.8,
  newLeads: 2543,
};

export const pipelineData = [
  { stage: "New Leads", count: 842, value: 100 },
  { stage: "Contacted", count: 624, value: 74 },
  { stage: "Qualified", count: 412, value: 49 },
  { stage: "Proposal", count: 186, value: 22 },
  { stage: "Won", count: 320, value: 38 },
];

export const revenueData = [
  { month: "Jan", revenue: 45 },
  { month: "Feb", revenue: 52 },
  { month: "Mar", revenue: 48 },
  { month: "Apr", revenue: 61 },
  { month: "May", revenue: 59 },
  { month: "Jun", revenue: 75 },
  { month: "Jul", revenue: 82 },
  { month: "Aug", revenue: 98 },
];

export const recentLeads = [
  { id: 1, name: "Priya Sharma", source: "IndiaMART", status: "Hot", time: "5m ago", initials: "PS", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Aarav Mehta", source: "Facebook", status: "New", time: "12m ago", initials: "AM", color: "bg-indigo-100 text-indigo-700" },
  { id: 3, name: "Neha Gupta", source: "Website", status: "Contacted", time: "1h ago", initials: "NG", color: "bg-emerald-100 text-emerald-700" },
  { id: 4, name: "Rohan Desai", source: "99acres", status: "Qualified", time: "3h ago", initials: "RD", color: "bg-amber-100 text-amber-700" },
];

export const attendanceData = {
  present: 82,
  absent: 12,
  leave: 6,
  weeklyTrend: [60, 75, 45, 90, 80, 40, 100], // percentages
};

export const recentInvoices = [
  { id: "INV-1245", client: "TechNova Pvt Ltd", amount: "₹75,000", status: "Paid", date: "Oct 24" },
  { id: "INV-1246", client: "Global Solutions", amount: "₹1,20,000", status: "Pending", date: "Oct 25" },
  { id: "INV-1247", client: "Apex Industries", amount: "₹45,500", status: "Overdue", date: "Oct 20" },
];

export const notificationsList = [
  { id: 1, title: "Deal Won 🎉", desc: "TechNova closed for ₹8.2L", time: "10m ago", icon: "deal" },
  { id: 2, title: "Invoice Paid", desc: "INV-1245 fully settled", time: "1h ago", icon: "invoice" },
  { id: 3, title: "New Leave Request", desc: "Amit requested 2 days sick leave", time: "2h ago", icon: "hr" },
  { id: 4, title: "High Value Lead", desc: "Enterprise plan inquiry from website", time: "3h ago", icon: "lead" },
];

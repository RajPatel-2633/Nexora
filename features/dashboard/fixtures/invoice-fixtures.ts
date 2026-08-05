export type InvoiceStage = {
  id: string;
  name: string;
  status: "Draft" | "Issued" | "Paid" | "Completed";
  color: string;
  active: boolean;
};

export const invoiceFixtures = {
  activeInvoice: {
    id: "INV-1245",
    client: "TechNova Pvt. Ltd.",
    dueDate: "Oct 24, 2026",
    targetAmount: 75000,
    formattedAmount: "₹75,000",
    status: "Completed",
  },
  workflowStages: [
    { id: "s1", name: "Draft", status: "Draft", color: "bg-slate-400", active: true },
    { id: "s2", name: "Issued", status: "Issued", color: "bg-blue-500", active: true },
    { id: "s3", name: "Paid", status: "Paid", color: "bg-amber-500", active: true },
    { id: "s4", name: "Completed", status: "Completed", color: "bg-emerald-500", active: true },
  ] as InvoiceStage[],
};

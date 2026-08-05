"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { invoiceFixtures } from "@/features/dashboard/fixtures/invoice-fixtures";
import { useRevealAnimation } from "@/hooks/animations/use-reveal-animation";
import { cn } from "@/lib/utils";

export interface InvoiceWidgetProps {
  variant?: "compact" | "default" | "interactive";
  animated?: boolean;
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
  className?: string;
}

export function InvoiceWidget({
  variant = "compact",
  animated = true,
  loading = false,
  empty = false,
  error = false,
  className,
}: InvoiceWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { countUp, fillProgress } = useRevealAnimation();

  useEffect(() => {
    if (!animated || !containerRef.current || loading || empty || error) return;
    countUp(amountRef, invoiceFixtures.activeInvoice.targetAmount, "₹", "", 1.5, containerRef.current);
    fillProgress([barRef.current], [100], 1.2, containerRef.current);
  }, [animated, countUp, fillProgress, loading, empty, error]);

  if (loading) {
    return (
      <div className={cn("p-4 bg-background animate-pulse space-y-3", className)}>
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-16 bg-muted/60 rounded-lg" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("p-4 bg-background text-foreground", className)}>
      {/* Header & Workflow Banner */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider block mb-0.5">
            Billing Workflow
          </span>
          <h4 className="text-xs font-semibold text-foreground">Invoice #{invoiceFixtures.activeInvoice.id}</h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 className="size-3" /> Completed
        </span>
      </div>

      {/* Lifecycle Stage Steps */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        {invoiceFixtures.workflowStages.map((stage) => (
          <div
            key={stage.id}
            className="flex items-center justify-center gap-1 rounded-md border border-violet-500/20 bg-violet-500/10 py-1 text-[9px] font-bold text-violet-400"
          >
            <span className={cn("size-1.5 rounded-full", stage.color)} />
            <span className="truncate">{stage.name}</span>
          </div>
        ))}
      </div>

      {/* Main Invoice Card Box */}
      <div className="rounded-xl border bg-card/60 p-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xs font-bold text-foreground">{invoiceFixtures.activeInvoice.client}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Due: {invoiceFixtures.activeInvoice.dueDate}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground">Amount</div>
            <div ref={amountRef} className="text-sm font-extrabold text-foreground">
              ₹0
            </div>
          </div>
        </div>

        {/* Payment Milestone Bar */}
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: animated ? "0%" : "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

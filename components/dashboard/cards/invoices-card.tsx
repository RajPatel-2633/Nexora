"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { recentInvoices } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function InvoicesCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current,
        { width: "0%" },
        {
          width: (i) => {
            const status = recentInvoices[i].status;
            if (status === "Paid") return "100%";
            if (status === "Pending") return "40%";
            return "70%"; // Overdue
          },
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm flex flex-col", className)}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Invoices</h3>
        <button className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        {recentInvoices.map((invoice, i) => (
          <div key={invoice.id} className="rounded-xl border bg-background/50 p-3 hover:bg-background transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-semibold text-foreground">{invoice.client}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{invoice.id} • Due {invoice.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{invoice.amount}</div>
                <div className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold mt-1",
                  invoice.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                  invoice.status === "Pending" ? "bg-amber-500/10 text-amber-600" :
                  "bg-rose-500/10 text-rose-600"
                )}>
                  {invoice.status}
                </div>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className={cn(
                  "h-full transition-colors",
                  invoice.status === "Paid" ? "bg-emerald-500" :
                  invoice.status === "Pending" ? "bg-amber-500" :
                  "bg-rose-500"
                )}
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

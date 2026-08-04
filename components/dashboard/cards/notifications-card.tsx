"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Handshake, FileText, UserCheck, Users, Bell } from "lucide-react";
import { notificationsList } from "@/features/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function NotificationsCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "deal": return <Handshake className="size-4" />;
      case "invoice": return <FileText className="size-4" />;
      case "hr": return <UserCheck className="size-4" />;
      case "lead": return <Users className="size-4" />;
      default: return <Bell className="size-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "deal": return "bg-emerald-100 text-emerald-600";
      case "invoice": return "bg-violet-100 text-violet-600";
      case "hr": return "bg-amber-100 text-amber-600";
      case "lead": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div ref={containerRef} className={cn("rounded-2xl border bg-card p-5 shadow-sm flex flex-col", className)}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Activity Feed</h3>
        <span className="flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
          4
        </span>
      </div>

      <div className="relative space-y-0 before:absolute before:inset-y-0 before:left-[17px] before:w-[2px] before:bg-muted">
        {notificationsList.map((notification, i) => (
          <div 
            key={notification.id} 
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="relative flex gap-4 pb-4 last:pb-0"
          >
            <div className={cn(
              "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
              getIconColor(notification.icon)
            )}>
              {getIcon(notification.icon)}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{notification.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

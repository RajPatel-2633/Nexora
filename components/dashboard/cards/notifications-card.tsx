"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Handshake, FileText, UserCheck, Users, Bell } from "lucide-react";
import { notificationsList } from "@/features/dashboard/mock-data";
import type { NotificationItem } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

export interface NotificationsCardProps {
  notifications?: NotificationItem[];
  className?: string;
}

export function NotificationsCard({
  notifications = notificationsList,
  className,
}: NotificationsCardProps) {
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
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [notifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case "deal":
        return <Handshake className="size-4" />;
      case "invoice":
        return <FileText className="size-4" />;
      case "hr":
        return <UserCheck className="size-4" />;
      case "lead":
        return <Users className="size-4" />;
      default:
        return <Bell className="size-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "deal":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400";
      case "invoice":
        return "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400";
      case "hr":
        return "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400";
      case "lead":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm flex flex-col transition-all duration-300 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10",
        className
      )}
    >
      {/* Glossy Sweep Overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Activity Feed
        </h3>
        <span className="flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
          {notifications.filter((n) => n.unread !== false).length}
        </span>
      </div>

      <div className="relative space-y-0 before:absolute before:inset-y-0 before:left-[17px] before:w-[2px] before:bg-muted">
        {notifications.map((notification, i) => (
          <div
            key={notification.id}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="relative flex gap-4 pb-4 last:pb-0 group/item"
          >
            <div
              className={cn(
                "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ring-4 ring-card transition-transform group-hover/item:scale-110",
                getIconColor(notification.icon)
              )}
            >
              {getIcon(notification.icon)}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">
                  {notification.title}
                </span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{notification.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

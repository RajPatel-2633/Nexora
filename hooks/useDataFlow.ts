"use client";

import { useState, useEffect, useCallback } from "react";
import type { DataCategory } from "@/lib/animations/motion-tokens";

export type PacketState = "Created" | "Travelling" | "Processing" | "Delivered" | "Archived";

export type DataPacket = {
  id: string;
  sourceId: string;
  sourceName: string;
  destinationId: string;
  destinationName: string;
  category: DataCategory;
  state: PacketState;
  progress: number; // 0 to 1
  label: string;
  value: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  sourceName: string;
  destinationName: string;
  category: DataCategory;
  message: string;
};

const SAMPLE_EVENTS: Array<{
  sourceId: string;
  sourceName: string;
  destinationId: string;
  destinationName: string;
  category: DataCategory;
  label: string;
  value: string;
  log: string;
}> = [
  {
    sourceId: "facebook",
    sourceName: "Facebook Ads",
    destinationId: "sales-crm",
    destinationName: "Sales CRM",
    category: "Lead",
    label: "Lead Sync",
    value: "+1 Lead",
    log: "Priya Sharma — Lead imported",
  },
  {
    sourceId: "whatsapp",
    sourceName: "WhatsApp",
    destinationId: "sales-crm",
    destinationName: "Sales CRM",
    category: "Notification",
    label: "Auto-reply",
    value: "Replied",
    log: "Template auto-response sent",
  },
  {
    sourceId: "indiamart",
    sourceName: "IndiaMART",
    destinationId: "sales-crm",
    destinationName: "Sales CRM",
    category: "Lead",
    label: "B2B Inquiry",
    value: "+1 Inquiry",
    log: "Apex Ind. — High intent lead",
  },
  {
    sourceId: "zapier",
    sourceName: "Zapier",
    destinationId: "invoicing",
    destinationName: "Invoicing Engine",
    category: "Invoice",
    label: "Invoice Sync",
    value: "INV-1248",
    log: "INV-1248 Drafted (₹45,000)",
  },
  {
    sourceId: "google-ads",
    sourceName: "Google Ads",
    destinationId: "analytics",
    destinationName: "Analytics",
    category: "Analytics",
    label: "Click Sync",
    value: "+12 Clicks",
    log: "Conversion rate updated 24.8%",
  },
  {
    sourceId: "housing",
    sourceName: "Housing.com",
    destinationId: "hrms",
    destinationName: "HRMS",
    category: "HR",
    label: "Site Visit",
    value: "Scheduled",
    log: "Agent assigned for site visit",
  },
];

export function useDataFlow(enabled: boolean = true) {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [processedCount, setProcessedCount] = useState<number>(2543);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init-1",
      timestamp: "10:42:10",
      sourceName: "System",
      destinationName: "Unified Data Layer",
      category: "Analytics",
      message: "Unified Processing Core Active",
    },
  ]);

  const dispatchPacket = useCallback(() => {
    const event = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
    const packetId = `pkt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newPacket: DataPacket = {
      id: packetId,
      sourceId: event.sourceId,
      sourceName: event.sourceName,
      destinationId: event.destinationId,
      destinationName: event.destinationName,
      category: event.category,
      state: "Created",
      progress: 0,
      label: event.label,
      value: event.value,
    };

    setPackets((prev) => {
      // Throttle performance: max 4 active packets at once
      const active = prev.filter((p) => p.state !== "Archived");
      if (active.length >= 4) return prev;
      return [...prev, newPacket];
    });

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        sourceName: event.sourceName,
        destinationName: event.destinationName,
        category: event.category,
        message: event.log,
      },
      ...prev.slice(0, 4), // Keep last 5 logs
    ]);

    setProcessedCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      dispatchPacket();
    }, 3800);

    return () => clearInterval(interval);
  }, [enabled, dispatchPacket]);

  return {
    packets,
    processedCount,
    logs,
    dispatchPacket,
  };
}

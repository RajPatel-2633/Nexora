"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
          Application Error
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight">
          Something went wrong
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {error.message || "An unexpected error occurred. Please try refreshing."}
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => reset()}>
            <RefreshCw className="size-4 mr-2" /> Try Again
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" /> Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

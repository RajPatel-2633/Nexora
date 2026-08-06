import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="inline-block px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider">
          404 Page Not Found
        </span>
        
        <h1 className="text-4xl font-extrabold tracking-tight">
          Lost in the ecosystem?
        </h1>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button asChild variant="primary" size="md">
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

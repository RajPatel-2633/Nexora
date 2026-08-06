import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Users, BarChart3, Building2, FileText } from "lucide-react";

export function MetaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 28" fill="none">
      <path
        d="M24.1 6.2c-2.4 0-4.6 1.2-6.1 3.2C16.5 7.4 14.3 6.2 11.9 6.2 6.5 6.2 2.2 10.8 2.2 16.5c0 5.7 4.3 10.3 9.7 10.3 2.4 0 4.6-1.2 6.1-3.2 1.5 2 3.7 3.2 6.1 3.2 5.4 0 9.7-4.6 9.7-10.3 0-5.7-4.3-10.3-9.7-10.3zm-12.2 17c-3.7 0-6.7-3.1-6.7-7 0-3.9 3-7 6.7-7 2.1 0 4 1 5.2 2.7-1.1 1.7-1.7 3.8-1.7 6.1 0 1.9.4 3.7 1.1 5.2-1.2 0-2.8 0-4.6 0zm12.2 0c-1.8 0-3.4 0-4.6 0 .7-1.5 1.1-3.3 1.1-5.2 0-2.3-.6-4.4-1.7-6.1 1.2-1.7 3.1-2.7 5.2-2.7 3.7 0 6.7 3.1 6.7 7 0 3.9-3 7-6.7 7z"
        fill="#0668E1"
      />
      <text x="36" y="20" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
        Meta
      </text>
    </svg>
  );
}

/** Meta mark paired with a descriptive label for lead-generation surfaces. */
export function MetaLeadAdsLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 28" fill="none" aria-hidden="true">
      <path
        d="M24.1 6.2c-2.4 0-4.6 1.2-6.1 3.2C16.5 7.4 14.3 6.2 11.9 6.2 6.5 6.2 2.2 10.8 2.2 16.5c0 5.7 4.3 10.3 9.7 10.3 2.4 0 4.6-1.2 6.1-3.2 1.5 2 3.7 3.2 6.1 3.2 5.4 0 9.7-4.6 9.7-10.3 0-5.7-4.3-10.3-9.7-10.3zm-12.2 17c-3.7 0-6.7-3.1-6.7-7 0-3.9 3-7 6.7-7 2.1 0 4 1 5.2 2.7-1.1 1.7-1.7 3.8-1.7 6.1 0 1.9.4 3.7 1.1 5.2-1.2 0-2.8 0-4.6 0zm12.2 0c-1.8 0-3.4 0-4.6 0 .7-1.5 1.1-3.3 1.1-5.2 0-2.3-.6-4.4-1.7-6.1 1.2-1.7 3.1-2.7 5.2-2.7 3.7 0 6.7 3.1 6.7 7 0 3.9-3 7-6.7 7z"
        fill="#0668E1"
      />
      <text x="40" y="19" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="sans-serif">
        Meta Lead Ads
      </text>
    </svg>
  );
}

export function FacebookLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function GoogleAdsLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.464 16.536A10 10 0 0 1 12 2v4a6 6 0 0 0-5.121 9.121l-3.415 1.415z"
        fill="#4285F4"
      />
      <path
        d="M20.536 7.464A10 10 0 0 1 12 22v-4a6 6 0 0 0 5.121-9.121l3.415-1.415z"
        fill="#34A853"
      />
      <path
        d="M2 12a10 10 0 0 1 14.536-8.536l-1.415 3.415A6 6 0 0 0 6 12H2z"
        fill="#FBBC05"
      />
      <circle cx="12" cy="12" r="3.5" fill="#EA4335" />
    </svg>
  );
}

export function WhatsAppLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.14 4.162 4.148-1.088z" />
    </svg>
  );
}

export function ZapierLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF4A00">
      <path d="M13.5 2L3 13.5h7.5L9 22l12-11.5h-7.5L13.5 2z" />
    </svg>
  );
}

export function IndiaMartLogo({ className = "size-8" }: { className?: string }) {
  return (
    <Image
      src="https://www.google.com/s2/favicons?domain=indiamart.com&sz=128"
      alt="IndiaMART"
      width={36}
      height={36}
      className={cn("size-8 object-contain rounded-md", className)}
      unoptimized
    />
  );
}

export function HousingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <Image
      src="https://www.google.com/s2/favicons?domain=housing.com&sz=128"
      alt="Housing.com"
      width={36}
      height={36}
      className={cn("size-8 object-contain rounded-md", className)}
      unoptimized
    />
  );
}

export function Acres99Logo({ className = "size-8" }: { className?: string }) {
  return (
    <Image
      src="https://www.google.com/s2/favicons?domain=99acres.com&sz=128"
      alt="99acres"
      width={36}
      height={36}
      className={cn("size-8 object-contain rounded-md", className)}
      unoptimized
    />
  );
}

export function MagicBricksLogo({ className = "size-8" }: { className?: string }) {
  return (
    <Image
      src="https://www.google.com/s2/favicons?domain=magicbricks.com&sz=128"
      alt="MagicBricks"
      width={36}
      height={36}
      className={cn("size-8 object-contain rounded-md", className)}
      unoptimized
    />
  );
}

export const brandLogoMap: Record<string, React.ReactNode> = {
  meta: <MetaLogo className="h-8 w-auto" />,
  "meta-lead-ads": <MetaLeadAdsLogo className="h-8 w-auto" />,
  facebook: <FacebookLogo className="size-8" />,
  "google-ads": <GoogleAdsLogo className="size-8" />,
  indiamart: <IndiaMartLogo className="h-8" />,
  housing: <HousingLogo className="h-8" />,
  "99acres": <Acres99Logo className="h-8" />,
  magicbricks: <MagicBricksLogo className="h-8" />,
  whatsapp: <WhatsAppLogo className="size-8" />,
  zapier: <ZapierLogo className="size-8" />,
  "sales-crm": <Users className="size-6 text-blue-400" />,
  analytics: <BarChart3 className="size-6 text-cyan-400" />,
  hrms: <Building2 className="size-6 text-purple-400" />,
  invoicing: <FileText className="size-6 text-emerald-400" />,
};

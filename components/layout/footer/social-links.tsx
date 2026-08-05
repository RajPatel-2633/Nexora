"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Youtube } from "lucide-react";
import type { SocialItem } from "@/types/domain/footer";

// Custom X (Twitter) Logo SVG
function XLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialItems: SocialItem[] = [
  { name: "GitHub", href: "https://github.com", iconName: "github" },
  { name: "LinkedIn", href: "https://linkedin.com", iconName: "linkedin" },
  { name: "X (Twitter)", href: "https://x.com", iconName: "x" },
  { name: "YouTube", href: "https://youtube.com", iconName: "youtube" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialItems.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          whileHover={{ scale: 1.08, y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex size-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-white/60 transition-colors duration-200 hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-300 shadow-sm"
        >
          {item.iconName === "github" && <Github className="size-4" />}
          {item.iconName === "linkedin" && <Linkedin className="size-4" />}
          {item.iconName === "x" && <XLogo className="size-4" />}
          {item.iconName === "youtube" && <Youtube className="size-4" />}
        </motion.a>
      ))}
    </div>
  );
}

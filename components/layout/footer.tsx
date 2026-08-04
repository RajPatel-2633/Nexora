import Link from "next/link";
import { Hexagon, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Integrations", href: "#integrations" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
        { label: "Docs", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#contact" },
        { label: "Partners", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Community", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Sales Guide", href: "#" },
        { label: "Webinars", href: "#" },
        { label: "API Reference", href: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Security", href: "#" },
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-[#050508] text-white pt-20 pb-10 border-t border-white/10">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="nexora-container relative z-10">
        
        {/* Top Section: Newsletter & Branding */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-105">
                <Hexagon className="size-6 fill-white/20" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Nexora</span>
            </Link>
            <p className="text-white/60 mb-8 leading-relaxed">
              The all-in-one CRM platform unifying sales, HR, and invoicing. Simplify your operations and grow your business with intelligent automation.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-brand-500 hover:text-white hover:scale-110">
                <Twitter className="size-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-brand-500 hover:text-white hover:scale-110">
                <Github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-brand-500 hover:text-white hover:scale-110">
                <Linkedin className="size-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-auto p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
            <h4 className="text-lg font-bold mb-2">Subscribe to our newsletter</h4>
            <p className="text-sm text-white/50 mb-6 max-w-xs">
              Get the latest product updates, CRM tips, and industry news directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-64 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25">
                Subscribe <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/10">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-white mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Nexora CRM Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Designed with</span>
            <span className="text-rose-500">♥</span>
            <span>for modern teams.</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

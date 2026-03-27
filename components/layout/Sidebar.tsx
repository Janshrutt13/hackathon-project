"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Folder, BarChart3, HelpCircle, Zap, Home } from "lucide-react";

const nav = [
  { id: "home", href: "/", icon: Home, label: "Home" },
  { id: "projects", href: "/projects", icon: Folder, label: "Projects" },
  { id: "serp", href: "/serp", icon: BarChart3, label: "SERP Analysis" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col py-8 px-6 border-r-2 z-50"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      
      {/* Logo */}
      <Link href="/" className="mb-12 block">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={20} style={{ color: "var(--accent)" }} />
          <h1 className="text-lg font-black tracking-tight uppercase" style={{ color: "var(--text)" }}>
            BLOGY
          </h1>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          SEO Engine
        </p>
      </Link>

      {/* New Blog Button */}
      <Link href="/workflow"
        className="w-full py-3 font-bold text-sm mb-8 flex items-center justify-center gap-2 transition-all border-2 uppercase tracking-wider"
        style={{ 
          background: "var(--accent)", 
          color: "var(--bg)",
          borderColor: "var(--accent)",
          boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.3)",
          fontFamily: "var(--font-mono)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translate(-2px, -2px)";
          e.currentTarget.style.boxShadow = "5px 5px 0 rgba(0, 0, 0, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translate(0, 0)";
          e.currentTarget.style.boxShadow = "3px 3px 0 rgba(0, 0, 0, 0.3)";
        }}>
        <span className="text-lg">+</span> New Blog
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(({ id, href, icon: Icon, label }) => (
          <Link key={id} href={href}
            className={cn("flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all border-2")}
            style={path === href
              ? { 
                  background: "var(--glow)", 
                  color: "var(--accent)",
                  borderColor: "var(--accent)",
                  fontFamily: "var(--font-mono)"
                }
              : { 
                  color: "var(--text-secondary)",
                  borderColor: "transparent",
                  fontFamily: "var(--font-mono)"
                }}>
            <Icon size={16} />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t-2 pt-4" style={{ borderColor: "var(--border)" }}>
        <button className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide transition-all w-full border-2 border-transparent hover:border-accent hover:bg-glow" 
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--glow)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}>
          <HelpCircle size={16} />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
}

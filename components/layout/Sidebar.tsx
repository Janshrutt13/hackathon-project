"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Folder, BarChart3, HelpCircle } from "lucide-react";

const nav = [
  { id: "projects", href: "/projects", icon: Folder, label: "Projects" },
  { id: "serp", href: "/serp", icon: BarChart3, label: "SERP Analysis" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col py-8 px-6 border-r z-50"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-sm font-bold tracking-tight" style={{ color: "var(--text)" }}>
          Blogy AI
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          SEO Engine
        </p>
      </div>

      {/* New Blog Button */}
      <Link href="/workflow"
        className="w-full py-2.5 rounded-lg font-semibold text-sm text-white mb-8 flex items-center justify-center gap-2 transition-all hover:opacity-90"
        style={{ background: "var(--accent)" }}>
        <span className="text-base">+</span> New Blog
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {nav.map(({ id, href, icon: Icon, label }) => (
          <Link key={id} href={href}
            className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all")}
            style={path === href
              ? { background: "rgba(139,92,246,0.1)", color: "var(--accent)" }
              : { color: "var(--text-secondary)" }}>
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all w-full" style={{ color: "var(--text-secondary)" }}>
          <HelpCircle size={16} />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
}

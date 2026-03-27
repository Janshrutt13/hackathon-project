"use client";
import { RotateCcw, Share2 } from "lucide-react";

type Props = {
  currentTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["KEYWORD", "CLUSTER", "SERP", "BLOG", "SEO"];

export default function TopNav({ currentTab, onTabChange }: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b-2" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2" style={{ background: "var(--accent)" }} />
          <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            /// EDITOR
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all border-2"
              style={{
                color: currentTab === tab ? "var(--bg)" : "var(--muted)",
                background: currentTab === tab ? "var(--accent)" : "transparent",
                borderColor: currentTab === tab ? "var(--accent)" : "transparent",
                fontFamily: "var(--font-mono)"
              }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 border-2 transition-all hover:border-accent hover:bg-glow" 
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "transparent";
          }}>
          <RotateCcw size={16} />
        </button>
        <button className="p-2.5 border-2 transition-all" 
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "transparent";
          }}>
          <Share2 size={16} />
        </button>
        <div className="w-px h-6" style={{ background: "var(--border)" }} />
        <button className="btn-ghost">
          Export
        </button>
        <button className="btn-primary">
          Publish
        </button>
      </div>
    </div>
  );
}

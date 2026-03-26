"use client";
import { RotateCcw, Share2 } from "lucide-react";

type Props = {
  currentTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["KEYWORD", "CLUSTER", "SERP", "BLOG", "SEO"];

export default function TopNav({ currentTab, onTabChange }: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-5 border-b" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-12">
        <h2 className="text-xs font-semibold tracking-widest" style={{ color: "var(--muted)" }}>
          EDITOR
        </h2>
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="text-xs font-semibold uppercase tracking-widest transition-all pb-1.5 border-b-2"
              style={{
                color: currentTab === tab ? "var(--text)" : "var(--muted)",
                borderColor: currentTab === tab ? "var(--accent)" : "transparent",
              }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:opacity-70 transition-opacity" style={{ color: "var(--text-secondary)" }}>
          <RotateCcw size={16} />
        </button>
        <button className="p-2 rounded-md hover:opacity-70 transition-opacity" style={{ color: "var(--text-secondary)" }}>
          <Share2 size={16} />
        </button>
        <div className="w-px h-5" style={{ background: "var(--border)" }} />
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

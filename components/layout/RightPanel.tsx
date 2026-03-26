"use client";
import { mockSeoScores } from "@/lib/mockData";

export default function RightPanel() {
  const avg = Math.round(mockSeoScores.reduce((a, s) => a + s.value, 0) / mockSeoScores.length);

  return (
    <div className="w-72 flex-shrink-0 border-l p-6 overflow-y-auto flex flex-col gap-6"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      
      {/* Status */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-success)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>LIVE</span>
        </div>
        <span className="text-xs" style={{ color: "var(--muted)" }}>Doc ID: SA-9821-X</span>
      </div>

      {/* SEO Score Card */}
      <div className="card p-5">
        <div className="text-xs font-semibold mb-4" style={{ color: "var(--muted)" }}>SEO SCORE</div>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>{avg}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>/100</div>
        </div>
        <div className="mt-4 h-1 rounded-full" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full" style={{ width: `${avg}%`, background: "var(--accent-success)" }} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="card p-5">
        <div className="text-xs font-semibold mb-4" style={{ color: "var(--muted)" }}>METRICS</div>
        <div className="space-y-3">
          {[
            { label: "Keyword Density", value: "Optimal" },
            { label: "Readability", value: "University" },
            { label: "Ranking Potential", value: "High" },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{m.label}</span>
              <span className="text-xs font-semibold" style={{ color: "var(--accent-success)" }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="card p-5">
        <div className="text-xs font-semibold mb-4" style={{ color: "var(--muted)" }}>SETTINGS</div>
        
        <div className="mb-4">
          <div className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Intent</div>
          <div className="flex gap-1.5 flex-wrap">
            {["Educational", "Commercial"].map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded" 
                style={{ background: "var(--elevated)", color: "var(--text-secondary)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Region</div>
          <select className="w-full text-xs px-2 py-1.5 rounded border outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
            <option>Global (English)</option>
          </select>
        </div>
      </div>

      {/* Insight */}
      <div className="card p-4 border-l-2" style={{ borderLeftColor: "var(--accent)" }}>
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--accent)" }}>INSIGHT</div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Adding 2 semantic clusters on "sustainable materials" could increase traffic by 12%.
        </p>
      </div>

      {/* Command Input */}
      <div className="mt-auto pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
          <span style={{ color: "var(--accent)" }}>✨</span>
          <input type="text" placeholder="Command..." className="flex-1 bg-transparent outline-none text-xs" style={{ color: "var(--text)" }} />
        </div>
      </div>
    </div>
  );
}

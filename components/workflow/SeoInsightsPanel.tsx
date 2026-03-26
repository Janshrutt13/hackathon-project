"use client";
import { mockSeoScores } from "@/lib/mockData";

export default function SeoInsightsPanel() {
  return (
    <div className="flex flex-col gap-4 p-5 h-full overflow-y-auto">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
          SEO Insights
        </h3>
        <div className="flex flex-col gap-3">
          {mockSeoScores.map((score) => (
            <div key={score.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{score.label}</span>
                <span className="text-xs font-bold" style={{ color: score.color }}>{score.value}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${score.value}%`, background: score.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <h4 className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Internal Linking</h4>
        <ul className="text-xs space-y-1" style={{ color: "var(--muted)" }}>
          <li>• Link to pillar content</li>
          <li>• Add 3-5 contextual links</li>
          <li>• Use descriptive anchors</li>
        </ul>
      </div>

      <div className="p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <h4 className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Snippet Optimization</h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          Meta title is 58 chars. Meta description is 152 chars. Both are within optimal range.
        </p>
      </div>

      <div className="p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <h4 className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>AI Naturalness</h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          Content passes perplexity and burstiness checks. Reads naturally with varied sentence structure.
        </p>
      </div>
    </div>
  );
}

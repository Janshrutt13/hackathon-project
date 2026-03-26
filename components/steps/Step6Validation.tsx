import { mockSeoScores } from "@/lib/mockData";

const improvements = [
  "Add 2 more internal links to pillar content",
  "Include FAQ schema markup for featured snippet",
  "Increase keyword density in H2 subheadings",
  "Add a stronger CTA above the fold",
];

export default function Step6Validation() {
  const avg = Math.round(mockSeoScores.reduce((a, s) => a + s.value, 0) / mockSeoScores.length);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>SEO Validation</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Automated quality check across 7 SEO signals.</p>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl border"
        style={{ background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="text-5xl font-bold" style={{ color: "var(--accent)" }}>{avg}</div>
        <div>
          <div className="font-semibold" style={{ color: "var(--text)" }}>Overall SEO Score</div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>Above average — ready to publish with minor tweaks</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mockSeoScores.map((score) => (
          <div key={score.label} className="p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{score.label}</span>
              <span className="text-sm font-bold" style={{ color: score.color }}>{score.value}%</span>
            </div>
            <div className="w-full h-1 rounded-full" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full" style={{ width: `${score.value}%`, background: score.color }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
          Suggested Improvements
        </div>
        <div className="flex flex-col gap-2">
          {improvements.map((imp, i) => (
            <div key={i} className="flex gap-2 items-start text-sm p-3 rounded-lg border"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <span style={{ color: "#F59E0B" }}>→</span>
              <span style={{ color: "var(--text)" }}>{imp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

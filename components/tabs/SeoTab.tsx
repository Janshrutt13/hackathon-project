import { mockSeoScores } from "@/lib/mockData";

export default function SeoTab() {
  const avg = Math.round(mockSeoScores.reduce((a, s) => a + s.value, 0) / mockSeoScores.length);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>SEO Validation</h1>
        
        <div className="card p-8 mb-12" style={{ background: "var(--elevated)" }}>
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-5xl font-bold" style={{ color: "var(--accent)" }}>{avg}</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>/100</div>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Above average. Ready to publish with minor tweaks.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockSeoScores.map((score) => (
            <div key={score.label} className="card p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{score.label}</span>
                <span className="text-sm font-bold" style={{ color: score.color }}>{score.value}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: `${score.value}%`, background: score.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

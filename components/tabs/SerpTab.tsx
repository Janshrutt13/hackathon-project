import { mockSerpGaps } from "@/lib/mockData";

const priorityColor = { high: "#EF4444", medium: "#F59E0B", low: "#6B7280" };

export default function SerpTab() {
  const gaps = mockSerpGaps.filter((g) => !g.covered);
  const covered = mockSerpGaps.filter((g) => g.covered);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>SERP Gap Analysis</h1>
        
        <div className="mb-12">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Content Gaps ({gaps.length})
          </h3>
          <div className="space-y-2">
            {gaps.map((gap) => (
              <div key={gap.topic} className="card p-4 flex items-center justify-between">
                <span style={{ color: "var(--text)" }}>{gap.topic}</span>
                <span className="text-xs px-2.5 py-1 rounded font-semibold capitalize" style={{ background: `${priorityColor[gap.priority]}20`, color: priorityColor[gap.priority] }}>
                  {gap.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Already Covered ({covered.length})
          </h3>
          <div className="space-y-2">
            {covered.map((gap) => (
              <div key={gap.topic} className="card p-4 flex items-center justify-between opacity-50">
                <span className="line-through" style={{ color: "var(--text-secondary)" }}>{gap.topic}</span>
                <span style={{ color: "var(--accent-success)" }}>✓</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

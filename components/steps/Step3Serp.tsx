import { mockSerpGaps } from "@/lib/mockData";

const priorityColor = { high: "#EF4444", medium: "#F59E0B", low: "#6B7280" };

export default function Step3Serp() {
  const gaps = mockSerpGaps.filter((g) => !g.covered);
  const covered = mockSerpGaps.filter((g) => g.covered);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>SERP Gap Analysis</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Topics your competitors haven't covered — your ranking opportunities.</p>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#EF4444" }}>
          ⚠ Content Gaps ({gaps.length})
        </div>
        <div className="flex flex-col gap-2">
          {gaps.map((gap) => (
            <div key={gap.topic} className="flex items-center justify-between p-3 rounded-lg border"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text)" }}>{gap.topic}</span>
              <span className="text-xs px-2 py-0.5 rounded font-medium capitalize"
                style={{ background: `${priorityColor[gap.priority]}20`, color: priorityColor[gap.priority] }}>
                {gap.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#059669" }}>
          ✓ Already Covered ({covered.length})
        </div>
        <div className="flex flex-col gap-2">
          {covered.map((gap) => (
            <div key={gap.topic} className="flex items-center justify-between p-3 rounded-lg border opacity-60"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <span className="text-sm line-through" style={{ color: "var(--muted)" }}>{gap.topic}</span>
              <span className="text-xs" style={{ color: "#059669" }}>✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

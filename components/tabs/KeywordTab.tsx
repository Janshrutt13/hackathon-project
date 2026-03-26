import type { WorkflowState } from "@/lib/types";

type Props = { state: WorkflowState };

export default function KeywordTab({ state }: Props) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>Keyword Analysis</h1>
        
        <div className="grid grid-cols-2 gap-6 mb-12">
          {[
            { label: "Primary Keyword", value: state.keyword || "—" },
            { label: "Search Volume", value: "18,400/mo" },
            { label: "Difficulty", value: "62" },
            { label: "Intent", value: state.intent.join(", ") || "—" },
          ].map((item) => (
            <div key={item.label} className="card p-6">
              <div className="label mb-3">{item.label}</div>
              <div className="text-xl font-semibold" style={{ color: "var(--text)" }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text)" }}>Variations</h3>
          <div className="space-y-2">
            {["AI blog generator", "automated content writing", "AI writing tool", "blog automation software"].map((kw) => (
              <div key={kw} className="flex items-center justify-between p-3 rounded-md" style={{ background: "var(--elevated)" }}>
                <span className="text-sm" style={{ color: "var(--text)" }}>{kw}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>8,200/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

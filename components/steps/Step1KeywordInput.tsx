import type { WorkflowState } from "@/lib/types";

export default function Step1KeywordInput({ state }: { state: WorkflowState }) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Keyword Analysis</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Configure your inputs on the left, then run the pipeline.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Keyword", value: state.keyword || "—" },
          { label: "Audience", value: state.audience || "—" },
          { label: "Region", value: state.region || "—" },
          { label: "Tone", value: state.tone || "—" },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{item.label}</div>
            <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{item.value}</div>
          </div>
        ))}
      </div>

      {state.intent.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Search Intent</div>
          <div className="flex gap-2 flex-wrap">
            {state.intent.map((i) => (
              <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium capitalize"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA" }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl border" style={{ background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.2)" }}>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          ✦ Fill in your keyword and settings on the left panel, then click <strong style={{ color: "var(--text)" }}>Generate Blog</strong> to start the pipeline.
        </p>
      </div>
    </div>
  );
}

"use client";
import { cn } from "@/lib/utils";
import type { Intent, WorkflowState } from "@/lib/types";

type Props = {
  state: WorkflowState;
  onChange: (patch: Partial<WorkflowState>) => void;
  onRun: () => void;
};

const intents: Intent[] = ["informational", "commercial", "navigational", "transactional"];
const tones = ["Professional", "Conversational", "Technical", "Persuasive"];
const regions = ["Global", "US", "UK", "India", "Australia", "Canada"];

export default function InputPanel({ state, onChange, onRun }: Props) {
  const toggleIntent = (i: Intent) => {
    const next = state.intent.includes(i)
      ? state.intent.filter((x) => x !== i)
      : [...state.intent, i];
    onChange({ intent: next });
  };

  return (
    <div className="flex flex-col gap-5 p-5 h-full overflow-y-auto">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
          Target Keyword
        </label>
        <input
          value={state.keyword}
          onChange={(e) => onChange({ keyword: e.target.value })}
          placeholder="e.g. AI blog generator"
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all focus:ring-1"
          style={{
            background: "var(--bg)", border: "1px solid var(--border)",
            color: "var(--text)", "--tw-ring-color": "var(--accent)"
          } as React.CSSProperties}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
          Target Audience
        </label>
        <input
          value={state.audience}
          onChange={(e) => onChange({ audience: e.target.value })}
          placeholder="e.g. Content marketers"
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
          Search Intent
        </label>
        <div className="flex flex-wrap gap-2">
          {intents.map((i) => (
            <button key={i} onClick={() => toggleIntent(i)}
              className={cn("px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize")}
              style={state.intent.includes(i)
                ? { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", color: "#A78BFA" }
                : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
          Region
        </label>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button key={r} onClick={() => onChange({ region: r })}
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
              style={state.region === r
                ? { background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.5)", color: "#93C5FD" }
                : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button key={t} onClick={() => onChange({ tone: t })}
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
              style={state.tone === t
                ? { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", color: "#A78BFA" }
                : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onRun}
        disabled={!state.keyword}
        className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-auto"
        style={{ background: "var(--accent)" }}>
        Generate Blog →
      </button>
    </div>
  );
}

const blocks = [
  { label: "System Context", desc: "Role: SEO content strategist. Goal: rank on page 1.", color: "#7C3AED" },
  { label: "Keyword Intent", desc: "Primary: informational. Secondary: commercial.", color: "#2563EB" },
  { label: "Cluster Injection", desc: "Include 12 semantically related keywords naturally.", color: "#059669" },
  { label: "SERP Gap Fill", desc: "Cover 5 identified gaps: E-E-A-T, internal linking...", color: "#D97706" },
  { label: "Structure Prompt", desc: "H1 → H2s → FAQ → CTA. 2000+ words. Scannable.", color: "#7C3AED" },
  { label: "Tone Calibration", desc: "Professional tone. Active voice. Short paragraphs.", color: "#2563EB" },
];

export default function Step4PromptArch() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Prompt Architecture</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>How the AI reasons before generating a single word.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
        <div className="flex flex-col gap-3">
          {blocks.map((block, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10"
                style={{ background: `${block.color}20`, border: `1px solid ${block.color}50`, color: block.color }}>
                {i + 1}
              </div>
              <div className="flex-1 p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <div className="text-xs font-bold mb-1" style={{ color: block.color }}>{block.label}</div>
                <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{block.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg border text-xs font-mono" style={{ background: "var(--bg)", borderColor: "rgba(124,58,237,0.3)", color: "var(--muted)" }}>
        <span style={{ color: "#A78BFA" }}>→ Prompt tokens:</span> ~1,240 &nbsp;
        <span style={{ color: "#A78BFA" }}>→ Context window:</span> 128k &nbsp;
        <span style={{ color: "#A78BFA" }}>→ Model:</span> GPT-4o
      </div>
    </div>
  );
}

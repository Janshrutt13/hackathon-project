import { promptFlowNodes } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

export default function PipelinePreview() {
  return (
    <section className="py-24 px-6 border-t" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-16" style={{ color: "var(--muted)" }}>
          The Pipeline
        </h2>
        
        <div className="flex items-center justify-center gap-2 flex-wrap mb-16">
          {promptFlowNodes.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border transition-all hover:border-purple-500/50"
                style={{ background: "var(--surface)", borderColor: "var(--border)", minWidth: 90 }}>
                <span className="text-xl">{node.icon}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{node.label}</span>
              </div>
              {i < promptFlowNodes.length - 1 && (
                <ArrowRight size={14} style={{ color: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Semantic Clustering", desc: "Groups keywords by intent for topical authority." },
            { title: "SERP Gap Analysis", desc: "Identifies what competitors missed." },
            { title: "Real-time SEO Scoring", desc: "Validates output against 7 SEO signals." },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

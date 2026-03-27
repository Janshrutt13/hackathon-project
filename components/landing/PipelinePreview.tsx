import { promptFlowNodes } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

export default function PipelinePreview() {
  return (
    <section className="py-32 px-6 border-t-2" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <div className="inline-block px-4 py-2 mb-6 border-2" style={{ borderColor: "var(--accent)", background: "var(--glow)" }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              /// The Pipeline
            </span>
          </div>
          <h2 className="text-5xl font-black mb-4" style={{ color: "var(--text)" }}>
            Seven Steps to
            <br />
            <span style={{ color: "var(--accent)" }}>SEO Dominance</span>
          </h2>
        </div>
        
        {/* Pipeline flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-20">
          {promptFlowNodes.map((node, i) => (
            <div key={node.id} className="relative">
              <div className="border-2 p-4 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] cursor-pointer group"
                style={{ 
                  background: "var(--surface)", 
                  borderColor: "var(--border)",
                  boxShadow: "4px 4px 0 rgba(255, 140, 66, 0.1)"
                }}>
                <div className="text-3xl mb-3 transition-transform group-hover:scale-110">{node.icon}</div>
                <div className="text-xs font-bold uppercase mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-sm font-bold leading-tight" style={{ color: "var(--text)" }}>
                  {node.label}
                </div>
              </div>
              {i < promptFlowNodes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 z-10" 
                  style={{ background: "var(--accent)" }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-y-2 border-y-transparent" 
                    style={{ borderLeftColor: "var(--accent)" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Semantic Clustering", 
              desc: "Groups keywords by intent for topical authority. Builds content silos that search engines love.",
              icon: "🧠"
            },
            { 
              title: "SERP Gap Analysis", 
              desc: "Identifies what competitors missed. Finds untapped opportunities in search results.",
              icon: "🔍"
            },
            { 
              title: "Real-time SEO Scoring", 
              desc: "Validates output against 7 SEO signals. Ensures every post is optimized before publish.",
              icon: "🎯"
            },
          ].map((f, i) => (
            <div key={f.title} 
              className="border-2 p-8 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] opacity-0 animate-slide-up"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "4px 4px 0 rgba(255, 140, 66, 0.1)",
                animationDelay: `${1.8 + i * 0.2}s`
              }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-black text-lg mb-3 uppercase" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-serif)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block border-2 p-12" 
            style={{ 
              borderColor: "var(--accent)",
              background: "var(--glow)",
              boxShadow: "8px 8px 0 rgba(255, 140, 66, 0.2)"
            }}>
            <h3 className="text-3xl font-black mb-4" style={{ color: "var(--text)" }}>
              Ready to dominate search?
            </h3>
            <p className="text-lg mb-6 max-w-md" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-serif)" }}>
              Start generating SEO-optimized content in minutes.
            </p>
            <a href="/workflow" className="btn-primary inline-flex items-center gap-3">
              <span>Start Building</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

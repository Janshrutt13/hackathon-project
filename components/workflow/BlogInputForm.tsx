"use client";
import { useBlogStore } from "@/lib/store";
import type { Intent } from "@/lib/types";
import { ArrowRight, Target, Users, Globe, MessageSquare, Sparkles } from "lucide-react";

const intents: Intent[] = ["informational", "commercial", "navigational", "transactional"];
const tones = ["Professional", "Conversational", "Technical", "Persuasive"];
const regions = ["Global", "US", "UK", "India", "Australia", "Canada"];

export default function BlogInputForm() {
  const { keyword, audience, intent, region, tone, setKeyword, setAudience, setIntent, setRegion, setTone, generateBlog } = useBlogStore();

  const toggleIntent = (i: Intent) => {
    const next = intent.includes(i)
      ? intent.filter((x) => x !== i)
      : [...intent, i];
    setIntent(next);
  };

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    await generateBlog();
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 mb-6 border-2" 
            style={{ borderColor: "var(--accent)", background: "var(--glow)" }}>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              New Generation
            </span>
          </div>
          <h1 className="text-6xl font-black mb-4 uppercase tracking-tight" style={{ color: "var(--text)" }}>
            Create
            <br />
            <span style={{ color: "var(--accent)" }}>New Blog</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-serif)" }}>
            Configure your SEO parameters and let AI do the heavy lifting.
          </p>
        </div>

        <div className="space-y-10">
          {/* Keyword Input */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} style={{ color: "var(--accent)" }} />
              <label className="label">Target Keyword</label>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., AI blog generator, machine learning basics..."
              className="w-full px-5 py-4 text-base outline-none transition-all border-2 focus:border-accent"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-serif)",
                boxShadow: "4px 4px 0 rgba(255, 140, 66, 0.1)"
              }}
            />
          </div>

          {/* Audience Input */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} style={{ color: "var(--accent)" }} />
              <label className="label">Target Audience</label>
            </div>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Content marketers, software developers..."
              className="w-full px-5 py-4 text-base outline-none transition-all border-2 focus:border-accent"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-serif)",
                boxShadow: "4px 4px 0 rgba(255, 140, 66, 0.1)"
              }}
            />
          </div>

          {/* Search Intent */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 border-2" style={{ borderColor: "var(--accent)" }} />
              <label className="label">Search Intent</label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {intents.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleIntent(i)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all capitalize border-2"
                  style={{
                    background: intent.includes(i) ? "var(--accent)" : "var(--surface)",
                    borderColor: intent.includes(i) ? "var(--accent)" : "var(--border)",
                    color: intent.includes(i) ? "var(--bg)" : "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    boxShadow: intent.includes(i) ? "3px 3px 0 rgba(0, 0, 0, 0.3)" : "3px 3px 0 rgba(255, 140, 66, 0.1)"
                  }}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} style={{ color: "var(--accent)" }} />
              <label className="label">Region</label>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all border-2"
                  style={{
                    background: region === r ? "var(--accent)" : "var(--surface)",
                    borderColor: region === r ? "var(--accent)" : "var(--border)",
                    color: region === r ? "var(--bg)" : "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    boxShadow: region === r ? "3px 3px 0 rgba(0, 0, 0, 0.3)" : "3px 3px 0 rgba(255, 140, 66, 0.1)"
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} style={{ color: "var(--accent)" }} />
              <label className="label">Tone</label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all border-2"
                  style={{
                    background: tone === t ? "var(--accent)" : "var(--surface)",
                    borderColor: tone === t ? "var(--accent)" : "var(--border)",
                    color: tone === t ? "var(--bg)" : "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    boxShadow: tone === t ? "3px 3px 0 rgba(0, 0, 0, 0.3)" : "3px 3px 0 rgba(255, 140, 66, 0.1)"
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-8">
            <button
              onClick={handleGenerate}
              disabled={!keyword.trim()}
              className="w-full py-5 font-bold text-base uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed border-2 flex items-center justify-center gap-3"
              style={{ 
                background: "var(--accent)",
                color: "var(--bg)",
                borderColor: "var(--accent)",
                fontFamily: "var(--font-mono)",
                boxShadow: "6px 6px 0 rgba(0, 0, 0, 0.3)"
              }}
              onMouseEnter={(e) => {
                if (!keyword.trim()) return;
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "8px 8px 0 rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 rgba(0, 0, 0, 0.3)";
              }}>
              <span>Generate Blog</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

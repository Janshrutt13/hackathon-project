"use client";
import { useBlogStore } from "@/lib/store";
import type { Intent } from "@/lib/types";

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
      <div className="max-w-3xl mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>
          Create New Blog
        </h1>

        <div className="space-y-8">
          {/* Keyword Input */}
          <div>
            <label className="label mb-3 block">Target Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., AI blog generator, machine learning basics..."
              className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all focus:ring-2"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                "--tw-ring-color": "var(--accent)"
              } as React.CSSProperties}
            />
          </div>

          {/* Audience Input */}
          <div>
            <label className="label mb-3 block">Target Audience</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Content marketers, software developers..."
              className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all focus:ring-2"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                "--tw-ring-color": "var(--accent)"
              } as React.CSSProperties}
            />
          </div>

          {/* Search Intent */}
          <div>
            <label className="label mb-3 block">Search Intent</label>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleIntent(i)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                  style={{
                    background: intent.includes(i) ? "rgba(139,92,246,0.2)" : "var(--surface)",
                    border: intent.includes(i) ? "1px solid rgba(139,92,246,0.5)" : "1px solid var(--border)",
                    color: intent.includes(i) ? "var(--accent)" : "var(--text-secondary)",
                  }}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="label mb-3 block">Region</label>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: region === r ? "rgba(139,92,246,0.2)" : "var(--surface)",
                    border: region === r ? "1px solid rgba(139,92,246,0.5)" : "1px solid var(--border)",
                    color: region === r ? "var(--accent)" : "var(--text-secondary)",
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="label mb-3 block">Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: tone === t ? "rgba(139,92,246,0.2)" : "var(--surface)",
                    border: tone === t ? "1px solid rgba(139,92,246,0.5)" : "1px solid var(--border)",
                    color: tone === t ? "var(--accent)" : "var(--text-secondary)",
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
              className="w-full py-3 rounded-lg font-semibold text-base text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)" }}>
              Generate Blog →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

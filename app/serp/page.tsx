"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { useBlogStore } from "@/lib/store";
import { Search, TrendingUp, AlertCircle } from "lucide-react";

interface SerpResult {
  rank: number;
  title: string;
  url: string;
  description: string;
}

interface KeywordMetrics {
  keyword: string;
  volume: number;
  difficulty: number;
  trend: "up" | "down" | "stable";
  cpc: number;
}

export default function SerpAnalysisPage() {
  const router = useRouter();
  const { setKeyword, setAudience, setIntent, setRegion, setTone, setCurrentStep } = useBlogStore();
  const [keyword, setLocalKeyword] = useState("");
  const [metrics, setMetrics] = useState<KeywordMetrics | null>(null);
  const [results, setResults] = useState<SerpResult[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzeKeyword = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    
    // Simulate SERP analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockMetrics: KeywordMetrics = {
      keyword,
      volume: Math.floor(Math.random() * 50000) + 1000,
      difficulty: Math.floor(Math.random() * 100),
      trend: [
        "up",
        "down",
        "stable",
      ][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
      cpc: Math.floor(Math.random() * 50) + 5,
    };

    const mockResults: SerpResult[] = [
      {
        rank: 1,
        title: `${keyword} - Complete Guide 2025`,
        url: "example.com/guide",
        description: `Learn everything about ${keyword}. Expert tips, strategies, and best practices.`,
      },
      {
        rank: 2,
        title: `How to Master ${keyword}`,
        url: "blog.example.com/mastering",
        description: `Step-by-step guide to ${keyword}. Proven methods and real-world examples.`,
      },
      {
        rank: 3,
        title: `${keyword} for Beginners`,
        url: "tutorial.example.com/basics",
        description: `Start your ${keyword} journey. Learn fundamentals and core concepts.`,
      },
      {
        rank: 4,
        title: `Best ${keyword} Tools & Resources`,
        url: "tools.example.com/comparison",
        description: `Compare top ${keyword} tools. Features, pricing, and reviews.`,
      },
      {
        rank: 5,
        title: `${keyword} Trends in 2025`,
        url: "news.example.com/trends",
        description: `Latest trends and developments in ${keyword}. What's new and what's next.`,
      },
    ];

    setMetrics(mockMetrics);
    setResults(mockResults);
    setLoading(false);
  };

  const handleCreateBlog = () => {
    // Set the keyword and default values
    setKeyword(keyword);
    setAudience("Business Professional");
    setIntent(["informational"]);
    setRegion("Global");
    setTone("Professional");
    setCurrentStep(1);

    // Navigate to workflow
    router.push("/workflow");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      analyzeKeyword();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <div className="flex-1 ml-56 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b px-8 py-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>SERP Analysis</h1>
          <p style={{ color: "var(--text-secondary)" }}>Analyze keywords and competitor rankings</p>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Search Box */}
          <div className="mb-12">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3" size={18} style={{ color: "var(--muted)" }} />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setLocalKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter keyword to analyze..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-base outline-none transition-all focus:ring-2"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    "--tw-ring-color": "var(--accent)",
                  } as React.CSSProperties}
                />
              </div>
              <button
                onClick={analyzeKeyword}
                disabled={!keyword.trim() || loading}
                className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "var(--accent)" }}>
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="card p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>SEARCH VOLUME</div>
                <div className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
                  {(metrics.volume / 1000).toFixed(1)}K
                </div>
              </div>
              <div className="card p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>DIFFICULTY</div>
                <div className="text-3xl font-bold" style={{ color: metrics.difficulty > 60 ? "#EF4444" : "#22C55E" }}>
                  {metrics.difficulty}
                </div>
              </div>
              <div className="card p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>TREND</div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} style={{ color: metrics.trend === "up" ? "#22C55E" : "#EF4444" }} />
                  <span className="text-lg font-bold capitalize" style={{ color: "var(--text)" }}>
                    {metrics.trend}
                  </span>
                </div>
              </div>
              <div className="card p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>AVG CPC</div>
                <div className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
                  ${metrics.cpc}
                </div>
              </div>
            </div>
          )}

          {/* SERP Results */}
          {results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>Top Ranking Pages</h2>
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.rank} className="card p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="flex gap-4">
                      <div className="text-3xl font-bold flex-shrink-0" style={{ color: "var(--accent)" }}>
                        #{result.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>
                          {result.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: "var(--accent)" }}>
                          {result.url}
                        </p>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gap Analysis */}
              <div className="mt-12 p-6 rounded-lg border" style={{ background: "var(--elevated)", borderColor: "var(--border)" }}>
                <div className="flex gap-3 mb-4">
                  <AlertCircle style={{ color: "var(--accent)" }} />
                  <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Content Gap Opportunities</h3>
                </div>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>✓ Add comprehensive beginner's guide</li>
                  <li>✓ Create comparison/tools roundup</li>
                  <li>✓ Develop advanced strategies content</li>
                  <li>✓ Build case studies and examples</li>
                  <li>✓ Create video content guide</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Ready to create content that ranks?
                </p>
                <button 
                  onClick={handleCreateBlog}
                  className="btn-primary inline-block">
                  Generate Blog for "{keyword}" →
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!metrics && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>Analyze Your Keywords</h2>
              <p style={{ color: "var(--text-secondary)" }}>Enter a keyword above to see search volume, difficulty, and top-ranking pages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

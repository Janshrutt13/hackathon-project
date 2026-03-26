"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import SEOMetricsBreakdown from "@/components/workflow/SEOMetricsBreakdown";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { ArrowLeft, Copy, Download, Save } from "lucide-react";
import { useBlogStore } from "@/lib/store";
import { useState } from "react";

export default function OutputPage() {
  const router = useRouter();
  const { generatedBlog, keyword, saveProject } = useBlogStore();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"blog" | "analytics">("blog");

  const handleSaveProject = () => {
    saveProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!generatedBlog) {
    return (
      <div className="flex h-screen" style={{ background: "var(--bg)" }}>
        <Sidebar />
        <div className="flex-1 ml-56 flex items-center justify-center">
          <div className="text-center">
            <p style={{ color: "var(--muted)" }}>No blog generated yet.</p>
            <Link href="/workflow" className="btn-primary mt-4 inline-block">
              Create a Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const analytics = (generatedBlog as any).analytics;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <div className="flex-1 ml-56 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b px-8 py-4 flex items-center justify-between"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <Link href="/workflow" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)" }}>
            <ArrowLeft size={16} />
            Back to Workflow
          </Link>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "var(--surface)", color: "var(--text-secondary)" }}>
              <Copy size={16} />
            </button>
            <button className="p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "var(--surface)", color: "var(--text-secondary)" }}>
              <Download size={16} />
            </button>
            <button 
              onClick={handleSaveProject}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: saved ? "var(--accent-success)" : "var(--accent)", color: "white" }}>
              <Save size={16} />
              {saved ? "Saved!" : "Save Project"}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-16 z-30 border-b px-8 flex gap-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <button
            onClick={() => setActiveTab("blog")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "blog"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}>
            BLOG
          </button>
          {analytics && (
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "analytics"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}>
              ANALYTICS
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === "blog" ? (
          <article className="max-w-3xl mx-auto px-12 py-16">
            {/* Meta Info */}
            <div className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: "rgba(139,92,246,0.15)", color: "var(--accent)" }}>
                  AI Generated
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "var(--accent-success)" }}>
                  SEO Optimized
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: "rgba(139,92,246,0.15)", color: "var(--accent)" }}>
                  {generatedBlog.seoScore} Score
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text)" }}>
                {generatedBlog.title}
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {generatedBlog.metaDescription}
              </p>
            </div>

            {/* Meta Tags */}
            <div className="mb-12 p-5 rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>Meta Tags</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>Meta Title ({generatedBlog.metaTitle.length} chars)</div>
                  <div className="text-sm font-mono p-2 rounded" style={{ background: "var(--bg)", color: "var(--text)" }}>
                    {generatedBlog.metaTitle}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>Meta Description ({generatedBlog.metaDescription.length} chars)</div>
                  <div className="text-sm font-mono p-2 rounded" style={{ background: "var(--bg)", color: "var(--text)" }}>
                    {generatedBlog.metaDescription}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12 mb-16">
              {generatedBlog.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
                    {section.heading}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {generatedBlog.faqs.map((faq, i) => (
                  <details key={i} className="card p-5 cursor-pointer group"
                    style={{ background: "var(--surface)" }}>
                    <summary className="font-semibold flex items-center justify-between" style={{ color: "var(--text)" }}>
                      {faq.q}
                      <span className="text-lg group-open:rotate-180 transition-transform" style={{ color: "var(--accent)" }}>›</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* SEO Metrics Breakdown */}
            <SEOMetricsBreakdown />

            {/* CTA Block */}
            <div className="p-8 rounded-lg border mb-12 mt-12" style={{ background: "var(--elevated)", borderColor: "var(--border)" }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text)" }}>
                Generate Another Blog?
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                Create more SEO-optimized blog posts in minutes.
              </p>
              <Link href="/workflow" className="btn-primary inline-block">
                Create New Blog →
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
              <p className="text-xs">
                Generated by Blogy AI • {new Date().toLocaleDateString()} • Keyword: {keyword}
              </p>
            </div>
          </article>
        ) : (
          <div className="max-w-4xl mx-auto px-12 py-16">
            {analytics && <AnalyticsDashboard report={analytics} />}
          </div>
        )}
      </div>
    </div>
  );
}

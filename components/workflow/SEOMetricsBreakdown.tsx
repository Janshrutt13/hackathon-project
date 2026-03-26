"use client";
import { useBlogStore } from "@/lib/store";
import { calculateDetailedSEOScore, getSEOMetricsForDisplay } from "@/lib/seoCalculator";

export default function SEOMetricsBreakdown() {
  const { generatedBlog, keyword } = useBlogStore();

  if (!generatedBlog || !keyword) {
    return null;
  }

  const metrics = calculateDetailedSEOScore(generatedBlog, keyword);
  const displayMetrics = getSEOMetricsForDisplay(metrics);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--accent-success)";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="mt-12 p-6 rounded-lg border" style={{ background: "var(--elevated)", borderColor: "var(--border)" }}>
      <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text)" }}>SEO Metrics Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayMetrics.map((metric) => (
          <div key={metric.label} className="p-4 rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                {metric.label}
              </span>
              <span className="text-sm font-bold" style={{ color: getScoreColor(metric.score) }}>
                {metric.value}
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: "var(--border)" }}>
              <div 
                className="h-full rounded-full transition-all" 
                style={{ 
                  width: `${Math.min(metric.score, 100)}%`, 
                  background: getScoreColor(metric.score) 
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <h4 className="text-sm font-bold mb-3" style={{ color: "var(--text)" }}>Optimization Recommendations</h4>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {metrics.keywordDensity < 1 && (
            <li>• Increase keyword mentions to reach 1-3% density</li>
          )}
          {metrics.keywordDensity > 3 && (
            <li>• Reduce keyword mentions to avoid over-optimization</li>
          )}
          {metrics.contentLength < 1500 && (
            <li>• Expand content to at least 1500 words for better ranking</li>
          )}
          {metrics.headingStructure < 0.7 && (
            <li>• Improve heading structure with more H2 subheadings</li>
          )}
          {metrics.metaOptimization < 0.7 && (
            <li>• Optimize meta title and description length</li>
          )}
          {metrics.keywordVariations < 2 && (
            <li>• Include more keyword variations naturally in content</li>
          )}
          {metrics.overallScore >= 80 && (
            <li>✓ Great job! Your content is well-optimized for SEO</li>
          )}
        </ul>
      </div>
    </div>
  );
}

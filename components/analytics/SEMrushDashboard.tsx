import React from 'react';
import type { SEMrushSEOScore } from '@/lib/semrushCalculator';

interface SEMrushDashboardProps {
  score: SEMrushSEOScore;
}

export function SEMrushDashboard({ score }: SEMrushDashboardProps) {
  const metrics = [
    { label: 'Title Optimization', value: score.titleOptimization },
    { label: 'Meta Description', value: score.metaDescriptionOptimization },
    { label: 'Heading Structure', value: score.headingStructure },
    { label: 'Keyword Usage', value: score.keywordUsage },
    { label: 'Readability', value: score.readability },
    { label: 'Content Length', value: score.contentLength },
    { label: 'Internal Links', value: score.internalLinks },
    { label: 'External Links', value: score.externalLinks },
    { label: 'Image Optimization', value: score.imageOptimization },
    { label: 'Page Speed', value: score.pageSpeed },
    { label: 'Mobile Optimization', value: score.mobileOptimization },
    { label: 'Structured Data', value: score.structuredData },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-2">SEO OPTIMIZATION SCORE</p>
            <p className="text-5xl font-bold text-white">{score.overallScore}</p>
            <p className="text-xs text-gray-400 mt-3">Based on 12 SEO metrics</p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(score.overallScore / 100) * 339.3} 339.3`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">{score.overallScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12 Metrics Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-2">{metric.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-blue-400">{metric.value}</span>
                <span className="text-xs text-gray-500 mb-1">/100</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    metric.value >= 80
                      ? 'bg-green-500'
                      : metric.value >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          {score.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-4 ${
                rec.priority === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : rec.priority === 'medium'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white">{rec.category}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        rec.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{rec.issue}</p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold">Suggestion:</span> {rec.suggestion}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Impact:</span> {rec.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Interpretation */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Score Interpretation</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">90-100: Excellent</p>
              <p className="text-sm text-gray-400">Your content is highly optimized and ready for publication</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">70-89: Good</p>
              <p className="text-sm text-gray-400">Address high-priority recommendations for better rankings</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Below 70: Needs Work</p>
              <p className="text-sm text-gray-400">Implement recommendations to improve SEO performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Implementation Guide</h3>
        <ol className="space-y-3 text-sm text-gray-300">
          <li className="flex gap-3">
            <span className="font-bold text-blue-400 flex-shrink-0">1.</span>
            <span>Fix all <span className="font-semibold text-red-400">HIGH priority</span> issues first (biggest impact)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-400 flex-shrink-0">2.</span>
            <span>Then address <span className="font-semibold text-yellow-400">MEDIUM priority</span> items (good ROI)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-400 flex-shrink-0">3.</span>
            <span>Finally optimize <span className="font-semibold text-blue-400">LOW priority</span> elements (fine-tuning)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-400 flex-shrink-0">4.</span>
            <span>Re-generate analysis after making changes to track improvements</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

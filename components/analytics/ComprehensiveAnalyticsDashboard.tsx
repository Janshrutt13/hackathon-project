import React, { useState } from 'react';
import type { AnalyticsReport } from '@/lib/analyticsCalculator';
import type { SEMrushSEOScore } from '@/lib/semrushCalculator';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SEMrushDashboard } from './SEMrushDashboard';

interface ComprehensiveAnalyticsDashboardProps {
  report: AnalyticsReport;
  semrushScore: SEMrushSEOScore;
}

export function ComprehensiveAnalyticsDashboard({ report, semrushScore }: ComprehensiveAnalyticsDashboardProps) {
  const [activeView, setActiveView] = useState<'overview' | 'semrush'>('overview');

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-gray-800">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeView === 'overview'
              ? 'border-purple-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          10-Metric Analysis
        </button>
        <button
          onClick={() => setActiveView('semrush')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeView === 'semrush'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          SEO Optimization (SEMrush)
        </button>
      </div>

      {/* Score Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">10-METRIC SCORE</p>
          <p className="text-3xl font-bold text-purple-400">{report.overallScore}</p>
          <p className="text-xs text-gray-500 mt-1">Comprehensive analysis</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">SEO OPTIMIZATION SCORE</p>
          <p className="text-3xl font-bold text-blue-400">{semrushScore.overallScore}</p>
          <p className="text-xs text-gray-500 mt-1">SEMrush-style analysis</p>
        </div>
      </div>

      {/* Content */}
      {activeView === 'overview' ? (
        <AnalyticsDashboard report={report} />
      ) : (
        <SEMrushDashboard score={semrushScore} />
      )}

      {/* Combined Insights */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Combined Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">10-Metric Analysis</p>
              <p className="text-sm text-gray-400">
                Evaluates AI architecture, keyword clustering, SERP gaps, traffic potential, and content scalability
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">SEO Optimization (SEMrush)</p>
              <p className="text-sm text-gray-400">
                Analyzes 12 technical SEO metrics including title, meta tags, readability, page speed, and structured data
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Pro Tip:</span> Use the 10-Metric Analysis for strategic content planning and the SEO Optimization score for technical implementation details.
          </p>
        </div>
      </div>
    </div>
  );
}

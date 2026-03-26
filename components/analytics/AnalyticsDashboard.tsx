import React from 'react';
import type { AnalyticsReport } from '@/lib/analyticsCalculator';

interface AnalyticsDashboardProps {
  report: AnalyticsReport;
}

export function AnalyticsDashboard({ report }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">OVERALL ANALYTICS SCORE</p>
            <p className="text-4xl font-bold text-white">{report.overallScore}</p>
            <p className="text-xs text-gray-400 mt-2">Based on 10 comprehensive metrics</p>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-400">{report.overallScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {report.metrics.map((metric) => (
          <div key={metric.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-white">{metric.label}</p>
                <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
              </div>
              <span className="text-lg font-bold text-purple-400">{metric.value}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
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

            {/* Recommendation */}
            {metric.recommendation && (
              <p className="text-xs text-yellow-400 mt-3 flex items-start gap-2">
                <span className="mt-0.5">💡</span>
                <span>{metric.recommendation}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Traffic Projection */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Projected Traffic Potential</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-400 mb-2">CONSERVATIVE</p>
            <p className="text-2xl font-bold text-blue-400">{report.trafficProjection.conservative}</p>
            <p className="text-xs text-gray-500 mt-1">monthly visits</p>
          </div>
          
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-400 mb-2">MODERATE</p>
            <p className="text-2xl font-bold text-purple-400">{report.trafficProjection.moderate}</p>
            <p className="text-xs text-gray-500 mt-1">monthly visits</p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-400 mb-2">OPTIMISTIC</p>
            <p className="text-2xl font-bold text-green-400">{report.trafficProjection.optimistic}</p>
            <p className="text-xs text-gray-500 mt-1">monthly visits</p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Estimated Time to Rank:</span>{' '}
            <span className="text-purple-400">{report.trafficProjection.timeToRank}</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Based on keyword difficulty, search volume, and SEO optimization score
          </p>
        </div>
      </div>

      {/* SERP Gaps */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Content Gap Analysis</h3>
        
        <div className="space-y-3">
          {report.serpGaps.map((gap, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-white">{gap.topic}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    gap.priority === 'high'
                      ? 'bg-red-500/20 text-red-400'
                      : gap.priority === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {gap.priority}
                  </span>
                </div>
                {gap.trafficPotential > 0 && (
                  <p className="text-xs text-gray-400">
                    Potential traffic: <span className="text-green-400">+{gap.trafficPotential} visits/mo</span>
                  </p>
                )}
              </div>
              <div className="text-right">
                {gap.covered ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">✓ Covered</span>
                ) : (
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">⚠ Gap</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300">
            💡 <span className="font-semibold">Tip:</span> Uncovered gaps represent high-opportunity topics that could increase your traffic by addressing competitor blind spots.
          </p>
        </div>
      </div>
    </div>
  );
}

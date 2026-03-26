import React from 'react';
import { useBlogStore } from '@/lib/store';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export function AnalyticsTab() {
  const { generatedBlog } = useBlogStore();

  if (!generatedBlog) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">Generate a blog post to view analytics</p>
      </div>
    );
  }

  // Check if analytics data exists
  const analytics = (generatedBlog as any).analytics;

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">Analytics data not available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h2>
        <p className="text-gray-400">Comprehensive 10-metric analysis of your blog content</p>
      </div>

      <AnalyticsDashboard report={analytics} />
    </div>
  );
}

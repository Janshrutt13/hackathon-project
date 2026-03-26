export type StepStatus = "idle" | "active" | "complete";

export type Intent = "informational" | "commercial" | "navigational" | "transactional";

export type WorkflowState = {
  currentStep: number;
  keyword: string;
  audience: string;
  intent: Intent[];
  region: string;
  tone: string;
  stepStatuses: StepStatus[];
};

export type SeoScore = {
  label: string;
  value: number;
  color: string;
};

export type KeywordCluster = {
  group: string;
  keywords: string[];
  volume: string;
  difficulty: string;
};

export type SerpGap = {
  topic: string;
  covered: boolean;
  priority: "high" | "medium" | "low";
};

export type AnalyticsMetric = {
  id: string;
  label: string;
  value: number;
  max: number;
  description: string;
  recommendation?: string;
};

export type TrafficProjection = {
  conservative: number;
  moderate: number;
  optimistic: number;
  timeToRank: string;
};

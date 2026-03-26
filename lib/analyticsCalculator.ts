import type { GeneratedBlog } from './aiGenerator';
import type { AnalyticsMetric, TrafficProjection } from './types';

export interface AnalyticsReport {
  metrics: AnalyticsMetric[];
  trafficProjection: TrafficProjection;
  serpGaps: SerpGapAnalysis[];
  overallScore: number;
}

export interface SerpGapAnalysis {
  topic: string;
  covered: boolean;
  priority: "high" | "medium" | "low";
  trafficPotential: number;
}

export function generateAnalyticsReport(
  blog: GeneratedBlog,
  keyword: string,
  searchVolume: number = 5000,
  difficulty: number = 45
): AnalyticsReport {
  const metrics: AnalyticsMetric[] = [];

  // 1. Prompt Architecture Clarity (0-100)
  const promptClarity = calculatePromptClarity(blog, keyword);
  metrics.push({
    id: "prompt_clarity",
    label: "Prompt Architecture Clarity",
    value: promptClarity,
    max: 100,
    description: "How well-structured and clear the AI prompt architecture is",
    recommendation: promptClarity < 70 ? "Refine prompt structure for better clarity" : undefined,
  });

  // 2. Keyword Clustering Logic (0-100)
  const clusteringLogic = calculateClusteringLogic(blog, keyword);
  metrics.push({
    id: "clustering_logic",
    label: "Keyword Clustering Logic",
    value: clusteringLogic,
    max: 100,
    description: "Quality of semantic keyword grouping and topical authority",
    recommendation: clusteringLogic < 70 ? "Add more semantic keyword variations" : undefined,
  });

  // 3. SERP Gap Identification (0-100)
  const serpGapScore = calculateSerpGapScore(blog, keyword);
  metrics.push({
    id: "serp_gaps",
    label: "SERP Gap Identification",
    value: serpGapScore,
    max: 100,
    description: "Coverage of content gaps competitors haven't addressed",
    recommendation: serpGapScore < 70 ? "Expand content to cover more competitor gaps" : undefined,
  });

  // 4. Projected Traffic Potential (0-100)
  const trafficPotential = calculateTrafficPotential(blog, searchVolume, difficulty);
  metrics.push({
    id: "traffic_potential",
    label: "Projected Traffic Potential",
    value: trafficPotential,
    max: 100,
    description: "Estimated organic traffic potential based on keyword metrics",
    recommendation: trafficPotential < 60 ? "Target higher-volume keywords or improve content depth" : undefined,
  });

  // 5. SEO Optimization Percentage (0-100)
  const seoOptimization = calculateSeoOptimization(blog, keyword);
  metrics.push({
    id: "seo_optimization",
    label: "SEO Optimization Percentage",
    value: seoOptimization,
    max: 100,
    description: "Overall SEO best practices implementation score",
    recommendation: seoOptimization < 75 ? "Implement additional SEO best practices" : undefined,
  });

  // 6. AI Detection & Naturalness Score (0-100)
  const aiNaturalness = calculateAiNaturalness(blog);
  metrics.push({
    id: "ai_naturalness",
    label: "AI Detection & Naturalness Score",
    value: aiNaturalness,
    max: 100,
    description: "How human-like and natural the AI-generated content reads",
    recommendation: aiNaturalness < 75 ? "Add more personal examples and conversational tone" : undefined,
  });

  // 7. Snippet Readiness Probability (0-100)
  const snippetReadiness = calculateSnippetReadiness(blog, keyword);
  metrics.push({
    id: "snippet_readiness",
    label: "Snippet Readiness Probability",
    value: snippetReadiness,
    max: 100,
    description: "Likelihood of content being featured in Google snippets",
    recommendation: snippetReadiness < 70 ? "Optimize answer sections for featured snippets" : undefined,
  });

  // 8. Keyword Density Compliance (0-100)
  const keywordDensity = calculateKeywordDensityCompliance(blog, keyword);
  metrics.push({
    id: "keyword_density",
    label: "Keyword Density Compliance",
    value: keywordDensity,
    max: 100,
    description: "Optimal keyword density (1-3%) without over-optimization",
    recommendation: keywordDensity < 70 ? "Adjust keyword density to 1-3% range" : undefined,
  });

  // 9. Internal Linking Logic (0-100)
  const internalLinking = calculateInternalLinkingLogic(blog);
  metrics.push({
    id: "internal_linking",
    label: "Internal Linking Logic",
    value: internalLinking,
    max: 100,
    description: "Potential for strategic internal linking opportunities",
    recommendation: internalLinking < 60 ? "Identify and structure more internal linking opportunities" : undefined,
  });

  // 10. Scalability and Replicability (0-100)
  const scalability = calculateScalability(blog, keyword);
  metrics.push({
    id: "scalability",
    label: "Scalability and Replicability",
    value: scalability,
    max: 100,
    description: "How easily this content can be replicated for similar keywords",
    recommendation: scalability < 70 ? "Improve content structure for better scalability" : undefined,
  });

  // Calculate traffic projection
  const trafficProjection = projectTraffic(searchVolume, difficulty, seoOptimization);

  // Identify SERP gaps
  const serpGaps = identifySerpGaps(blog, keyword);

  // Calculate overall score
  const overallScore = Math.round(
    metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
  );

  return {
    metrics,
    trafficProjection,
    serpGaps,
    overallScore,
  };
}

// 1. Prompt Architecture Clarity
function calculatePromptClarity(blog: GeneratedBlog, keyword: string): number {
  let score = 50;

  // Check for clear structure
  if (blog.sections.length >= 5) score += 15;
  if (blog.faqs.length >= 4) score += 10;

  // Check for keyword in title
  if (blog.title.toLowerCase().includes(keyword.toLowerCase())) score += 10;

  // Check for meta tags
  if (blog.metaTitle.length >= 50 && blog.metaTitle.length <= 60) score += 10;
  if (blog.metaDescription.length >= 150 && blog.metaDescription.length <= 160) score += 10;

  // Check for logical flow
  const hasIntro = blog.sections[0]?.heading.toLowerCase().includes("intro");
  const hasConclusion = blog.sections[blog.sections.length - 1]?.heading.toLowerCase().includes("conclu");
  if (hasIntro || hasConclusion) score += 5;

  return Math.min(score, 100);
}

// 2. Keyword Clustering Logic
function calculateClusteringLogic(blog: GeneratedBlog, keyword: string): number {
  let score = 50;

  const allText = [
    blog.title,
    ...blog.sections.map(s => s.heading + " " + s.content),
    ...blog.faqs.map(f => f.q + " " + f.a),
  ].join(" ").toLowerCase();

  // Check for keyword variations
  const variations = generateKeywordVariations(keyword);
  const foundVariations = variations.filter(v => allText.includes(v.toLowerCase())).length;
  score += Math.min(foundVariations * 10, 30);

  // Check for semantic clusters (related terms)
  const semanticTerms = getSemanticTerms(keyword);
  const foundTerms = semanticTerms.filter(t => allText.includes(t.toLowerCase())).length;
  score += Math.min((foundTerms / semanticTerms.length) * 20, 20);

  return Math.min(score, 100);
}

// 3. SERP Gap Identification
function calculateSerpGapScore(blog: GeneratedBlog, keyword: string): number {
  let score = 50;

  const allText = blog.sections.map(s => s.content).join(" ").toLowerCase();

  // Check for gap-filling topics
  const gapTopics = [
    "step by step",
    "how to",
    "best practices",
    "common mistakes",
    "comparison",
    "case study",
    "tools",
    "resources",
  ];

  const coveredGaps = gapTopics.filter(topic => allText.includes(topic)).length;
  score += Math.min((coveredGaps / gapTopics.length) * 40, 40);

  // Check for unique insights
  if (blog.sections.some(s => s.content.includes("unique") || s.content.includes("exclusive"))) {
    score += 10;
  }

  return Math.min(score, 100);
}

// 4. Projected Traffic Potential
function calculateTrafficPotential(blog: GeneratedBlog, searchVolume: number, difficulty: number): number {
  // Base score on search volume and difficulty
  let score = 50;

  // Volume factor (higher volume = higher potential)
  if (searchVolume >= 10000) score += 25;
  else if (searchVolume >= 5000) score += 20;
  else if (searchVolume >= 1000) score += 15;
  else if (searchVolume >= 100) score += 10;

  // Difficulty factor (lower difficulty = higher potential)
  if (difficulty <= 30) score += 15;
  else if (difficulty <= 50) score += 10;
  else if (difficulty <= 70) score += 5;

  // Content quality factor
  const contentLength = blog.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0);
  if (contentLength >= 2500) score += 10;
  else if (contentLength >= 2000) score += 8;
  else if (contentLength >= 1500) score += 5;

  return Math.min(score, 100);
}

// 5. SEO Optimization Percentage
function calculateSeoOptimization(blog: GeneratedBlog, keyword: string): number {
  let score = 0;
  let maxScore = 0;

  // Title optimization (20 points)
  maxScore += 20;
  if (blog.title.includes(keyword)) score += 10;
  if (blog.title.length >= 50 && blog.title.length <= 70) score += 10;

  // Meta tags (20 points)
  maxScore += 20;
  if (blog.metaTitle.includes(keyword)) score += 10;
  if (blog.metaDescription.includes(keyword)) score += 10;

  // Heading structure (20 points)
  maxScore += 20;
  if (blog.sections.length >= 5) score += 10;
  const avgHeadingLength = blog.sections.reduce((sum, s) => sum + s.heading.split(/\s+/).length, 0) / blog.sections.length;
  if (avgHeadingLength >= 4 && avgHeadingLength <= 8) score += 10;

  // Content depth (20 points)
  maxScore += 20;
  const contentLength = blog.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0);
  if (contentLength >= 2000) score += 10;
  if (blog.faqs.length >= 4) score += 10;

  // Keyword variations (20 points)
  maxScore += 20;
  const variations = generateKeywordVariations(keyword);
  const allText = blog.sections.map(s => s.content).join(" ").toLowerCase();
  const foundVariations = variations.filter(v => allText.includes(v.toLowerCase())).length;
  score += Math.min((foundVariations / variations.length) * 20, 20);

  return Math.round((score / maxScore) * 100);
}

// 6. AI Detection & Naturalness Score
function calculateAiNaturalness(blog: GeneratedBlog): number {
  let score = 70; // Start with baseline

  const allText = [
    blog.title,
    ...blog.sections.map(s => s.heading + " " + s.content),
    ...blog.faqs.map(f => f.q + " " + f.a),
  ].join(" ");

  // Check for conversational tone
  const conversationalWords = ["you", "we", "our", "let's", "here's", "actually", "really"];
  const conversationalCount = conversationalWords.filter(word => allText.toLowerCase().includes(word)).length;
  score += Math.min(conversationalCount * 2, 15);

  // Check for contractions (natural writing)
  const contractions = ["don't", "can't", "won't", "it's", "that's", "we're"];
  const contractionCount = contractions.filter(c => allText.toLowerCase().includes(c)).length;
  score += Math.min(contractionCount * 2, 10);

  // Penalize for AI-like patterns
  const aiPatterns = ["in conclusion", "to summarize", "as mentioned above", "furthermore"];
  const aiPatternCount = aiPatterns.filter(p => allText.toLowerCase().includes(p)).length;
  score -= aiPatternCount * 3;

  return Math.max(Math.min(score, 100), 40);
}

// 7. Snippet Readiness Probability
function calculateSnippetReadiness(blog: GeneratedBlog, keyword: string): number {
  let score = 50;

  // Check for direct answers in FAQs
  const faqAnswers = blog.faqs.map(f => f.a);
  const shortAnswers = faqAnswers.filter(a => a.split(/\s+/).length >= 20 && a.split(/\s+/).length <= 60).length;
  score += Math.min(shortAnswers * 10, 25);

  // Check for list-based content
  const listContent = blog.sections.filter(s => s.content.includes("•") || s.content.includes("-")).length;
  score += Math.min(listContent * 5, 15);

  // Check for keyword in FAQ questions
  const keywordInQuestions = blog.faqs.filter(f => f.q.toLowerCase().includes(keyword.toLowerCase())).length;
  score += Math.min(keywordInQuestions * 5, 10);

  return Math.min(score, 100);
}

// 8. Keyword Density Compliance
function calculateKeywordDensityCompliance(blog: GeneratedBlog, keyword: string): number {
  const allText = [
    blog.title,
    ...blog.sections.map(s => s.heading + " " + s.content),
    ...blog.faqs.map(f => f.q + " " + f.a),
  ].join(" ").toLowerCase();

  const totalWords = allText.split(/\s+/).length;
  const keywordMatches = (allText.match(new RegExp(keyword.toLowerCase(), "g")) || []).length;
  const density = (keywordMatches / totalWords) * 100;

  // Optimal: 1-3%
  if (density >= 1 && density <= 3) return 100;
  if (density >= 0.8 && density <= 3.5) return 90;
  if (density >= 0.5 && density <= 4) return 75;
  if (density >= 0.3 && density <= 5) return 60;
  if (density > 5) return 40; // Over-optimization
  return 50;
}

// 9. Internal Linking Logic
function calculateInternalLinkingLogic(blog: GeneratedBlog): number {
  let score = 50;

  // Check for potential link anchors (proper nouns, key terms)
  const allText = blog.sections.map(s => s.content).join(" ");
  const properNouns = (allText.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || []).length;
  score += Math.min((properNouns / 10) * 20, 20);

  // Check for related topic mentions
  const relatedTopics = ["guide", "tutorial", "best practices", "strategy", "tips", "how to"];
  const topicMatches = relatedTopics.filter(t => allText.toLowerCase().includes(t)).length;
  score += Math.min((topicMatches / relatedTopics.length) * 20, 20);

  // Check for section interconnectedness
  if (blog.sections.length >= 5) score += 10;

  return Math.min(score, 100);
}

// 10. Scalability and Replicability
function calculateScalability(blog: GeneratedBlog, keyword: string): number {
  let score = 50;

  // Check for template-friendly structure
  if (blog.sections.length >= 5) score += 15;
  if (blog.faqs.length >= 4) score += 10;

  // Check for consistent formatting
  const avgSectionLength = blog.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0) / blog.sections.length;
  if (avgSectionLength >= 200 && avgSectionLength <= 400) score += 15;

  // Check for reusable patterns
  const hasIntro = blog.sections[0]?.heading.toLowerCase().includes("intro");
  const hasConclusion = blog.sections[blog.sections.length - 1]?.heading.toLowerCase().includes("conclu");
  if (hasIntro && hasConclusion) score += 10;

  return Math.min(score, 100);
}

// Helper functions
function generateKeywordVariations(keyword: string): string[] {
  const variations = [keyword];
  const words = keyword.split(" ");

  if (words.length === 1) {
    variations.push(keyword + "s");
    if (keyword.endsWith("y")) {
      variations.push(keyword.slice(0, -1) + "ies");
    }
  }

  if (words.length > 1) {
    variations.push(words.reverse().join(" "));
  }

  return variations;
}

function getSemanticTerms(keyword: string): string[] {
  const semanticMap: Record<string, string[]> = {
    ai: ["artificial intelligence", "machine learning", "deep learning", "neural network"],
    seo: ["search engine optimization", "ranking", "organic traffic", "keywords"],
    blog: ["article", "post", "content", "writing"],
    marketing: ["promotion", "advertising", "campaign", "strategy"],
    content: ["article", "blog", "post", "copy"],
  };

  const keywordLower = keyword.toLowerCase();
  for (const [key, terms] of Object.entries(semanticMap)) {
    if (keywordLower.includes(key)) {
      return terms;
    }
  }

  return [];
}

function projectTraffic(searchVolume: number, difficulty: number, seoOptimization: number): TrafficProjection {
  // Estimate ranking position based on difficulty and optimization
  const basePosition = Math.max(1, Math.round(difficulty / 10));
  const optimizedPosition = Math.max(1, basePosition - Math.round((seoOptimization - 50) / 10));

  // CTR estimates by position (approximate)
  const ctrByPosition: Record<number, number> = {
    1: 0.28,
    2: 0.15,
    3: 0.1,
    4: 0.07,
    5: 0.05,
    6: 0.04,
    7: 0.03,
    8: 0.02,
    9: 0.02,
    10: 0.02,
  };

  const ctr = ctrByPosition[Math.min(optimizedPosition, 10)] || 0.01;

  // Calculate traffic projections
  const conservative = Math.round(searchVolume * ctr * 0.7);
  const moderate = Math.round(searchVolume * ctr);
  const optimistic = Math.round(searchVolume * ctr * 1.3);

  // Time to rank estimate
  let timeToRank = "3-6 months";
  if (difficulty <= 30) timeToRank = "1-3 months";
  else if (difficulty <= 50) timeToRank = "2-4 months";
  else if (difficulty <= 70) timeToRank = "4-8 months";
  else timeToRank = "6-12 months";

  return { conservative, moderate, optimistic, timeToRank };
}

function identifySerpGaps(blog: GeneratedBlog, keyword: string): SerpGapAnalysis[] {
  const gaps: SerpGapAnalysis[] = [];
  const allText = blog.sections.map(s => s.content).join(" ").toLowerCase();

  const potentialGaps = [
    { topic: "Step-by-step guide", traffic: 800, priority: "high" as const },
    { topic: "Comparison with alternatives", traffic: 600, priority: "high" as const },
    { topic: "Common mistakes to avoid", traffic: 500, priority: "medium" as const },
    { topic: "Tools and resources", traffic: 400, priority: "medium" as const },
    { topic: "Case studies and examples", traffic: 350, priority: "medium" as const },
    { topic: "FAQ and troubleshooting", traffic: 300, priority: "low" as const },
  ];

  potentialGaps.forEach(gap => {
    const covered = allText.includes(gap.topic.toLowerCase().split(" ")[0]);
    gaps.push({
      topic: gap.topic,
      covered,
      priority: gap.priority,
      trafficPotential: covered ? 0 : gap.traffic,
    });
  });

  return gaps;
}

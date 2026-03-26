import type { GeneratedBlog } from './aiGenerator';

export interface SEOMetrics {
  keywordDensity: number;
  readabilityScore: number;
  contentLength: number;
  headingStructure: number;
  metaOptimization: number;
  internalLinkingPotential: number;
  keywordVariations: number;
  overallScore: number;
}

export function calculateDetailedSEOScore(blog: GeneratedBlog, keyword: string): SEOMetrics & { seoScore: number } {
  // 1. Keyword Density (0-20 points)
  const keywordDensity = calculateKeywordDensity(blog, keyword);
  const keywordDensityScore = getKeywordDensityScore(keywordDensity);

  // 2. Readability Score (0-15 points)
  const readabilityScore = calculateReadabilityScore(blog);
  const readabilityPoints = getReadabilityPoints(readabilityScore);

  // 3. Content Length (0-15 points)
  const contentLength = calculateContentLength(blog);
  const contentLengthScore = getContentLengthScore(contentLength);

  // 4. Heading Structure (0-15 points)
  const headingStructure = analyzeHeadingStructure(blog);
  const headingScore = getHeadingScore(headingStructure);

  // 5. Meta Tag Optimization (0-15 points)
  const metaOptimization = analyzeMetaTags(blog);
  const metaScore = getMetaScore(metaOptimization);

  // 6. Internal Linking Potential (0-10 points)
  const internalLinkingPotential = analyzeInternalLinkingPotential(blog);
  const linkingScore = getLinkingScore(internalLinkingPotential);

  // 7. Keyword Variations (0-10 points)
  const keywordVariations = analyzeKeywordVariations(blog, keyword);
  const variationScore = getVariationScore(keywordVariations);

  // Calculate overall score
  const overallScore = Math.min(
    keywordDensityScore +
    readabilityPoints +
    contentLengthScore +
    headingScore +
    metaScore +
    linkingScore +
    variationScore,
    100
  );

  return {
    keywordDensity: Math.round(keywordDensity * 100) / 100,
    readabilityScore: Math.round(readabilityScore),
    contentLength,
    headingStructure: Math.round(headingStructure * 100),
    metaOptimization: Math.round(metaOptimization * 100),
    internalLinkingPotential: Math.round(internalLinkingPotential * 100),
    keywordVariations,
    overallScore: Math.round(overallScore),
    seoScore: Math.round(overallScore),
  };
}

// 1. KEYWORD DENSITY CALCULATION
function calculateKeywordDensity(blog: GeneratedBlog, keyword: string): number {
  const allText = [
    blog.title,
    blog.metaTitle,
    blog.metaDescription,
    ...blog.sections.map(s => s.heading + ' ' + s.content),
    ...blog.faqs.map(f => f.q + ' ' + f.a),
  ].join(' ').toLowerCase();

  const totalWords = allText.split(/\s+/).length;
  const keywordMatches = (allText.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  
  return totalWords > 0 ? (keywordMatches / totalWords) * 100 : 0;
}

function getKeywordDensityScore(density: number): number {
  // Optimal: 1-3%
  if (density >= 1 && density <= 3) return 20;
  if (density >= 0.8 && density <= 3.5) return 18;
  if (density >= 0.5 && density <= 4) return 15;
  if (density >= 0.3 && density <= 5) return 12;
  if (density > 5) return 8; // Over-optimization
  return 10;
}

// 2. READABILITY SCORE
function calculateReadabilityScore(blog: GeneratedBlog): number {
  let score = 50;

  // Check average sentence length
  const allContent = blog.sections.map(s => s.content).join(' ');
  const sentences = allContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = allContent.split(/\s+/).length / sentences.length;

  if (avgSentenceLength >= 10 && avgSentenceLength <= 20) score += 20;
  else if (avgSentenceLength >= 8 && avgSentenceLength <= 25) score += 15;
  else if (avgSentenceLength >= 5 && avgSentenceLength <= 30) score += 10;

  // Check paragraph length (shorter is better)
  const paragraphs = allContent.split('\n\n').filter(p => p.trim().length > 0);
  const avgParagraphLength = allContent.split(/\s+/).length / paragraphs.length;

  if (avgParagraphLength >= 50 && avgParagraphLength <= 150) score += 15;
  else if (avgParagraphLength >= 40 && avgParagraphLength <= 200) score += 10;

  // Check for variety (multiple sections)
  if (blog.sections.length >= 5) score += 10;
  if (blog.faqs.length >= 4) score += 5;

  return Math.min(score, 100);
}

function getReadabilityPoints(score: number): number {
  if (score >= 80) return 15;
  if (score >= 70) return 13;
  if (score >= 60) return 11;
  if (score >= 50) return 9;
  return 5;
}

// 3. CONTENT LENGTH
function calculateContentLength(blog: GeneratedBlog): number {
  const contentWords = blog.sections.reduce((total, section) => {
    return total + section.content.split(/\s+/).length;
  }, 0);

  const faqWords = blog.faqs.reduce((total, faq) => {
    return total + faq.q.split(/\s+/).length + faq.a.split(/\s+/).length;
  }, 0);

  return contentWords + faqWords;
}

function getContentLengthScore(length: number): number {
  if (length >= 2500) return 15;
  if (length >= 2000) return 14;
  if (length >= 1500) return 13;
  if (length >= 1200) return 12;
  if (length >= 800) return 10;
  if (length >= 500) return 7;
  return 3;
}

// 4. HEADING STRUCTURE
function analyzeHeadingStructure(blog: GeneratedBlog): number {
  let score = 0;

  // H1 (title)
  if (blog.title && blog.title.length > 0) score += 0.3;

  // H2s (section headings)
  const h2Count = blog.sections.length;
  if (h2Count >= 5) score += 0.4;
  else if (h2Count >= 3) score += 0.3;
  else if (h2Count >= 1) score += 0.2;

  // Heading length (should be 4-8 words)
  const avgHeadingLength = blog.sections.reduce((total, s) => {
    return total + s.heading.split(/\s+/).length;
  }, 0) / blog.sections.length;

  if (avgHeadingLength >= 4 && avgHeadingLength <= 8) score += 0.3;

  return Math.min(score, 1);
}

function getHeadingScore(structure: number): number {
  if (structure >= 0.9) return 15;
  if (structure >= 0.7) return 13;
  if (structure >= 0.5) return 11;
  if (structure >= 0.3) return 8;
  return 5;
}

// 5. META TAG OPTIMIZATION
function analyzeMetaTags(blog: GeneratedBlog): number {
  let score = 0;

  // Meta title length (50-60 chars optimal)
  const titleLength = blog.metaTitle.length;
  if (titleLength >= 50 && titleLength <= 60) score += 0.5;
  else if (titleLength >= 45 && titleLength <= 65) score += 0.4;
  else if (titleLength >= 40 && titleLength <= 70) score += 0.3;

  // Meta description length (150-160 chars optimal)
  const descLength = blog.metaDescription.length;
  if (descLength >= 150 && descLength <= 160) score += 0.5;
  else if (descLength >= 140 && descLength <= 170) score += 0.4;
  else if (descLength >= 120 && descLength <= 180) score += 0.3;

  // Keyword in title
  if (blog.metaTitle.toLowerCase().includes(blog.metaTitle.split(' ')[0].toLowerCase())) score += 0.2;

  // Keyword in description
  if (blog.metaDescription.toLowerCase().includes(blog.metaTitle.split(' ')[0].toLowerCase())) score += 0.2;

  return Math.min(score, 1);
}

function getMetaScore(optimization: number): number {
  if (optimization >= 0.9) return 15;
  if (optimization >= 0.7) return 13;
  if (optimization >= 0.5) return 11;
  if (optimization >= 0.3) return 8;
  return 5;
}

// 6. INTERNAL LINKING POTENTIAL
function analyzeInternalLinkingPotential(blog: GeneratedBlog): number {
  let score = 0;

  // Check for keyword mentions that could be internal links
  const allText = blog.sections.map(s => s.content).join(' ');
  const keywordMentions = (allText.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || []).length;

  if (keywordMentions >= 10) score += 0.6;
  else if (keywordMentions >= 5) score += 0.4;
  else if (keywordMentions >= 3) score += 0.2;

  // Check for related topics
  const topicKeywords = ['guide', 'tutorial', 'best practices', 'strategy', 'tips', 'how to'];
  const topicMatches = topicKeywords.filter(keyword => 
    allText.toLowerCase().includes(keyword)
  ).length;

  if (topicMatches >= 4) score += 0.4;
  else if (topicMatches >= 2) score += 0.2;

  return Math.min(score, 1);
}

function getLinkingScore(potential: number): number {
  if (potential >= 0.9) return 10;
  if (potential >= 0.7) return 8;
  if (potential >= 0.5) return 6;
  if (potential >= 0.3) return 4;
  return 2;
}

// 7. KEYWORD VARIATIONS
function analyzeKeywordVariations(blog: GeneratedBlog, keyword: string): number {
  const allText = blog.sections.map(s => s.content).join(' ').toLowerCase();
  
  // Generate keyword variations
  const variations = generateKeywordVariations(keyword);
  const foundVariations = variations.filter(v => allText.includes(v.toLowerCase())).length;

  return foundVariations;
}

function generateKeywordVariations(keyword: string): string[] {
  const variations = [keyword];
  const words = keyword.split(' ');

  // Singular/plural variations
  if (words.length === 1) {
    variations.push(keyword + 's');
    if (keyword.endsWith('y')) {
      variations.push(keyword.slice(0, -1) + 'ies');
    }
  }

  // Reordered variations
  if (words.length > 1) {
    variations.push(words.reverse().join(' '));
  }

  return variations;
}

function getVariationScore(variations: number): number {
  if (variations >= 4) return 10;
  if (variations >= 3) return 8;
  if (variations >= 2) return 6;
  if (variations >= 1) return 4;
  return 2;
}

// Export function to get individual metrics for display
export function getSEOMetricsForDisplay(metrics: SEOMetrics & { seoScore: number }) {
  return [
    { label: "Keyword Density", value: metrics.keywordDensity.toFixed(2) + "%", score: Math.round((metrics.keywordDensity / 3) * 100) },
    { label: "Readability Score", value: metrics.readabilityScore, score: metrics.readabilityScore },
    { label: "Content Length", value: metrics.contentLength + " words", score: Math.min((metrics.contentLength / 2500) * 100, 100) },
    { label: "Heading Structure", value: (metrics.headingStructure) + "%", score: metrics.headingStructure },
    { label: "Meta Optimization", value: (metrics.metaOptimization) + "%", score: metrics.metaOptimization },
    { label: "Internal Linking", value: (metrics.internalLinkingPotential) + "%", score: metrics.internalLinkingPotential },
    { label: "Keyword Variations", value: metrics.keywordVariations + " found", score: Math.min((metrics.keywordVariations / 4) * 100, 100) },
  ];
}

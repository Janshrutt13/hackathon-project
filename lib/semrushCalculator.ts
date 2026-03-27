import type { GeneratedBlog } from './aiGenerator';

export interface SEMrushSEOScore {
  overallScore: number;
  titleOptimization: number;
  metaDescriptionOptimization: number;
  headingStructure: number;
  keywordUsage: number;
  readability: number;
  contentLength: number;
  internalLinks: number;
  externalLinks: number;
  imageOptimization: number;
  pageSpeed: number;
  mobileOptimization: number;
  structuredData: number;
  recommendations: SEMrushRecommendation[];
}

export interface SEMrushRecommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  impact: string;
}

// Mock SEMrush scoring (replace with real API when credentials available)
export function calculateSEMrushSEOScore(blog: GeneratedBlog, keyword: string): SEMrushSEOScore {
  const recommendations: SEMrushRecommendation[] = [];
  let totalScore = 0;
  let metricCount = 0;

  // 1. Title Optimization (0-10)
  const titleScore = calculateTitleOptimization(blog, keyword);
  totalScore += titleScore;
  metricCount++;
  if (titleScore < 8) {
    recommendations.push({
      category: 'Title Tag',
      priority: 'high',
      issue: `Title tag score: ${titleScore}/10`,
      suggestion: 'Include primary keyword at the beginning, keep 50-60 characters',
      impact: 'Title tags are crucial for CTR and ranking signals',
    });
  }

  // 2. Meta Description Optimization (0-10)
  const metaScore = calculateMetaDescriptionOptimization(blog);
  totalScore += metaScore;
  metricCount++;
  if (metaScore < 8) {
    recommendations.push({
      category: 'Meta Description',
      priority: 'high',
      issue: `Meta description score: ${metaScore}/10`,
      suggestion: 'Include keyword, keep 150-160 characters, add call-to-action',
      impact: 'Meta descriptions affect CTR and user engagement',
    });
  }

  // 3. Heading Structure (0-10)
  const headingScore = calculateHeadingStructureScore(blog);
  totalScore += headingScore;
  metricCount++;
  if (headingScore < 8) {
    recommendations.push({
      category: 'Heading Structure',
      priority: 'high',
      issue: `Heading structure score: ${headingScore}/10`,
      suggestion: 'Use H1 once, H2s for main sections, H3s for subsections',
      impact: 'Proper heading hierarchy improves SEO and readability',
    });
  }

  // 4. Keyword Usage (0-10)
  const keywordScore = calculateKeywordUsageScore(blog, keyword);
  totalScore += keywordScore;
  metricCount++;
  if (keywordScore < 8) {
    recommendations.push({
      category: 'Keyword Usage',
      priority: 'medium',
      issue: `Keyword usage score: ${keywordScore}/10`,
      suggestion: 'Include keyword in title, first 100 words, and naturally throughout',
      impact: 'Keyword placement signals relevance to search engines',
    });
  }

  // 5. Readability (0-10)
  const readabilityScore = calculateReadabilityScore(blog);
  totalScore += readabilityScore;
  metricCount++;
  if (readabilityScore < 8) {
    recommendations.push({
      category: 'Readability',
      priority: 'medium',
      issue: `Readability score: ${readabilityScore}/10`,
      suggestion: 'Use shorter sentences (15-20 words), shorter paragraphs (3-4 sentences)',
      impact: 'Better readability improves user engagement and time on page',
    });
  }

  // 6. Content Length (0-10)
  const lengthScore = calculateContentLengthScore(blog);
  totalScore += lengthScore;
  metricCount++;
  if (lengthScore < 8) {
    recommendations.push({
      category: 'Content Length',
      priority: 'medium',
      issue: `Content length score: ${lengthScore}/10`,
      suggestion: 'Aim for 2,000+ words for competitive keywords',
      impact: 'Longer content ranks better for most keywords',
    });
  }

  // 7. Internal Links (0-10)
  const internalLinkScore = calculateInternalLinkScore(blog);
  totalScore += internalLinkScore;
  metricCount++;
  if (internalLinkScore < 7) {
    recommendations.push({
      category: 'Internal Linking',
      priority: 'medium',
      issue: `Internal link score: ${internalLinkScore}/10`,
      suggestion: 'Add 5-10 internal links with descriptive anchor text',
      impact: 'Internal links distribute page authority and improve crawlability',
    });
  }

  // 8. External Links (0-10)
  const externalLinkScore = calculateExternalLinkScore(blog);
  totalScore += externalLinkScore;
  metricCount++;
  if (externalLinkScore < 7) {
    recommendations.push({
      category: 'External Links',
      priority: 'low',
      issue: `External link score: ${externalLinkScore}/10`,
      suggestion: 'Link to 3-5 authoritative external sources',
      impact: 'External links add credibility and context',
    });
  }

  // 9. Image Optimization (0-10)
  const imageScore = calculateImageOptimizationScore(blog);
  totalScore += imageScore;
  metricCount++;
  if (imageScore < 8) {
    recommendations.push({
      category: 'Image Optimization',
      priority: 'low',
      issue: `Image optimization score: ${imageScore}/10`,
      suggestion: 'Add alt text to images, optimize file sizes, use descriptive filenames',
      impact: 'Image optimization improves accessibility and image search visibility',
    });
  }

  // 10. Page Speed (0-10)
  const speedScore = calculatePageSpeedScore();
  totalScore += speedScore;
  metricCount++;
  if (speedScore < 8) {
    recommendations.push({
      category: 'Page Speed',
      priority: 'high',
      issue: `Page speed score: ${speedScore}/10`,
      suggestion: 'Optimize images, enable caching, minimize CSS/JS',
      impact: 'Page speed is a ranking factor and affects user experience',
    });
  }

  // 11. Mobile Optimization (0-10)
  const mobileScore = calculateMobileOptimizationScore();
  totalScore += mobileScore;
  metricCount++;
  if (mobileScore < 9) {
    recommendations.push({
      category: 'Mobile Optimization',
      priority: 'high',
      issue: `Mobile optimization score: ${mobileScore}/10`,
      suggestion: 'Ensure responsive design, readable font sizes, touch-friendly buttons',
      impact: 'Mobile-first indexing makes mobile optimization critical',
    });
  }

  // 12. Structured Data (0-10)
  const structuredDataScore = calculateStructuredDataScore(blog);
  totalScore += structuredDataScore;
  metricCount++;
  if (structuredDataScore < 8) {
    recommendations.push({
      category: 'Structured Data',
      priority: 'medium',
      issue: `Structured data score: ${structuredDataScore}/10`,
      suggestion: 'Add schema markup (Article, FAQ, BreadcrumbList)',
      impact: 'Structured data enables rich snippets and improves SERP appearance',
    });
  }

  const overallScore = Math.round((totalScore / metricCount) * 10);

  return {
    overallScore: Math.min(overallScore, 100),
    titleOptimization: titleScore * 10,
    metaDescriptionOptimization: metaScore * 10,
    headingStructure: headingScore * 10,
    keywordUsage: keywordScore * 10,
    readability: readabilityScore * 10,
    contentLength: lengthScore * 10,
    internalLinks: internalLinkScore * 10,
    externalLinks: externalLinkScore * 10,
    imageOptimization: imageScore * 10,
    pageSpeed: speedScore * 10,
    mobileOptimization: mobileScore * 10,
    structuredData: structuredDataScore * 10,
    recommendations: recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }),
  };
}

// Individual scoring functions
function calculateTitleOptimization(blog: GeneratedBlog, keyword: string): number {
  let score = 5;

  // Length check (50-60 optimal)
  if (blog.metaTitle.length >= 50 && blog.metaTitle.length <= 60) score += 2;
  else if (blog.metaTitle.length >= 45 && blog.metaTitle.length <= 65) score += 1;

  // Keyword in title
  if (blog.metaTitle.toLowerCase().includes(keyword.toLowerCase())) score += 2;

  // Power words
  const powerWords = ['best', 'ultimate', 'complete', 'guide', 'how to', 'tips', 'strategies'];
  if (powerWords.some(word => blog.metaTitle.toLowerCase().includes(word))) score += 1;

  return Math.min(score, 10);
}

function calculateMetaDescriptionOptimization(blog: GeneratedBlog): number {
  let score = 5;

  // Length check (150-160 optimal)
  if (blog.metaDescription.length >= 150 && blog.metaDescription.length <= 160) score += 2;
  else if (blog.metaDescription.length >= 140 && blog.metaDescription.length <= 170) score += 1;

  // Call-to-action
  const ctaWords = ['learn', 'discover', 'find', 'explore', 'read', 'get', 'start'];
  if (ctaWords.some(word => blog.metaDescription.toLowerCase().includes(word))) score += 2;

  // Unique value proposition
  if (blog.metaDescription.length > 120) score += 1;

  return Math.min(score, 10);
}

function calculateHeadingStructureScore(blog: GeneratedBlog): number {
  let score = 5;

  // H1 count (should be 1)
  const h1Count = 1; // Title is H1
  if (h1Count === 1) score += 2;

  // H2 count (should be 5+)
  if (blog.sections.length >= 5) score += 2;
  else if (blog.sections.length >= 3) score += 1;

  // Heading length (4-8 words optimal)
  const avgHeadingLength = blog.sections.reduce((sum, s) => sum + s.heading.split(/\s+/).length, 0) / blog.sections.length;
  if (avgHeadingLength >= 4 && avgHeadingLength <= 8) score += 1;

  return Math.min(score, 10);
}

function calculateKeywordUsageScore(blog: GeneratedBlog, keyword: string): number {
  let score = 5;

  const allText = [
    blog.title,
    blog.metaTitle,
    blog.metaDescription,
    ...blog.sections.map(s => s.heading + ' ' + s.content),
  ].join(' ').toLowerCase();

  const totalWords = allText.split(/\s+/).length;
  const keywordMatches = (allText.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  const density = (keywordMatches / totalWords) * 100;

  // Optimal: 1-3%
  if (density >= 1 && density <= 3) score += 3;
  else if (density >= 0.8 && density <= 3.5) score += 2;
  else if (density >= 0.5 && density <= 4) score += 1;

  // Keyword in first 100 words
  const firstHundred = allText.split(/\s+/).slice(0, 100).join(' ');
  if (firstHundred.includes(keyword.toLowerCase())) score += 2;

  return Math.min(score, 10);
}

function calculateReadabilityScore(blog: GeneratedBlog): number {
  let score = 5;

  const allContent = blog.sections.map(s => s.content).join(' ');
  const sentences = allContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = allContent.split(/\s+/);
  const avgSentenceLength = words.length / sentences.length;

  // Optimal: 15-20 words per sentence
  if (avgSentenceLength >= 15 && avgSentenceLength <= 20) score += 2;
  else if (avgSentenceLength >= 12 && avgSentenceLength <= 25) score += 1;

  // Paragraph length
  const paragraphs = allContent.split('\n\n').filter(p => p.trim().length > 0);
  const avgParagraphLength = words.length / paragraphs.length;

  if (avgParagraphLength >= 50 && avgParagraphLength <= 150) score += 2;
  else if (avgParagraphLength >= 40 && avgParagraphLength <= 200) score += 1;

  // Variety (lists, short sentences)
  if (allContent.includes('•') || allContent.includes('-')) score += 1;

  return Math.min(score, 10);
}

function calculateContentLengthScore(blog: GeneratedBlog): number {
  const contentLength = blog.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0);

  if (contentLength >= 2500) return 10;
  if (contentLength >= 2000) return 9;
  if (contentLength >= 1500) return 8;
  if (contentLength >= 1200) return 7;
  if (contentLength >= 800) return 6;
  if (contentLength >= 500) return 4;
  return 2;
}

function calculateInternalLinkScore(blog: GeneratedBlog): number {
  let score = 4;

  // Potential link anchors
  const allText = blog.sections.map(s => s.content).join(' ');
  const properNouns = (allText.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || []).length;

  if (properNouns >= 10) score += 3;
  else if (properNouns >= 5) score += 2;
  else if (properNouns >= 3) score += 1;

  return Math.min(score, 10);
}

function calculateExternalLinkScore(blog: GeneratedBlog): number {
  // Mock: assume no external links in generated content
  // In real implementation, would parse actual links
  return 5;
}

function calculateImageOptimizationScore(blog: GeneratedBlog): number {
  // Mock: assume no images in generated content
  // In real implementation, would check alt text, file sizes, etc.
  return 4;
}

function calculatePageSpeedScore(): number {
  // Mock: assume good page speed for Next.js app
  return 8;
}

function calculateMobileOptimizationScore(): number {
  // Mock: assume responsive design
  return 9;
}

function calculateStructuredDataScore(blog: GeneratedBlog): number {
  let score = 4;

  // Check for FAQ structure
  if (blog.faqs.length >= 4) score += 3;
  else if (blog.faqs.length >= 2) score += 2;

  // Check for article structure
  if (blog.sections.length >= 5) score += 2;
  else if (blog.sections.length >= 3) score += 1;

  return Math.min(score, 10);
}

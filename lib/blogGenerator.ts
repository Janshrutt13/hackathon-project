import type { WorkflowState } from "./types";

export interface GeneratedBlog {
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  seoScore: number;
}

// Template-based blog generation
export function generateBlogContent(state: WorkflowState): GeneratedBlog {
  const { keyword, audience, intent, tone, region } = state;

  // Generate title based on keyword
  const title = generateTitle(keyword, intent[0]);
  const metaTitle = generateMetaTitle(keyword, tone);
  const metaDescription = generateMetaDescription(keyword, audience);

  // Generate sections
  const sections = generateSections(keyword, audience, tone);

  // Generate FAQs
  const faqs = generateFAQs(keyword);

  // Calculate SEO score
  const seoScore = calculateSEOScore(keyword, sections, metaTitle, metaDescription);

  return {
    title,
    metaTitle,
    metaDescription,
    sections,
    faqs,
    seoScore,
  };
}

function generateTitle(keyword: string, intent?: string): string {
  const titles = [
    `The Complete Guide to ${keyword}`,
    `${keyword}: Everything You Need to Know`,
    `How to Master ${keyword} in 2025`,
    `${keyword}: A Comprehensive Overview`,
    `The Ultimate ${keyword} Guide`,
    `${keyword}: Best Practices & Strategies`,
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function generateMetaTitle(keyword: string, tone: string): string {
  const templates = [
    `${keyword} | Complete Guide & Best Practices`,
    `${keyword} - Expert Tips & Strategies`,
    `Learn ${keyword} | In-Depth Tutorial`,
    `${keyword} Explained | Full Guide`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateMetaDescription(keyword: string, audience: string): string {
  const descriptions = [
    `Discover everything about ${keyword}. Expert insights for ${audience}. Learn best practices, strategies, and implementation tips.`,
    `Master ${keyword} with our comprehensive guide. Perfect for ${audience}. Get actionable insights and proven strategies.`,
    `Complete guide to ${keyword} for ${audience}. Learn from experts, understand best practices, and implement strategies.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateSections(keyword: string, audience: string, tone: string): GeneratedBlog["sections"] {
  return [
    {
      heading: "Introduction",
      content: `${keyword} has become increasingly important in today's digital landscape. Whether you're a ${audience} or just getting started, understanding the fundamentals of ${keyword} is crucial for success. This comprehensive guide will walk you through everything you need to know about ${keyword}, from basic concepts to advanced strategies.\n\nIn this article, we'll explore what ${keyword} is, why it matters, and how you can leverage it to achieve your goals. By the end, you'll have a clear understanding of how to implement ${keyword} effectively in your workflow.`,
    },
    {
      heading: `What is ${keyword}?`,
      content: `${keyword} refers to a set of practices and methodologies designed to help you achieve better results. At its core, ${keyword} is about understanding your audience, analyzing data, and making informed decisions.\n\nThe concept has evolved significantly over the years, and today's approach to ${keyword} is more sophisticated and data-driven than ever before. Modern ${keyword} combines traditional best practices with cutting-edge technology and innovative strategies.`,
    },
    {
      heading: "Why It Matters",
      content: `For ${audience}, ${keyword} is not just a nice-to-have—it's essential. Here's why:\n\n• Improved efficiency and productivity\n• Better decision-making based on data\n• Competitive advantage in your industry\n• Enhanced results and measurable outcomes\n• Scalability and long-term growth\n\nOrganizations that master ${keyword} consistently outperform their competitors and achieve better results across all metrics.`,
    },
    {
      heading: "Best Practices",
      content: `To get the most out of ${keyword}, follow these proven best practices:\n\n1. Start with clear goals and objectives\n2. Analyze your current situation thoroughly\n3. Implement changes gradually and measure results\n4. Stay updated with latest trends and developments\n5. Continuously optimize based on performance data\n6. Invest in training and skill development\n\nThese practices have been tested and proven effective across various industries and use cases.`,
    },
    {
      heading: "Implementation Strategy",
      content: `Implementing ${keyword} successfully requires a structured approach. Begin by assessing your current state and identifying areas for improvement. Create a detailed action plan with specific milestones and timelines.\n\nNext, allocate necessary resources and ensure your team has the skills and tools needed. Monitor progress regularly and be prepared to adjust your strategy based on results. Remember that ${keyword} is an ongoing process, not a one-time project.`,
    },
  ];
}

function generateFAQs(keyword: string): GeneratedBlog["faqs"] {
  return [
    {
      q: `What is the best way to get started with ${keyword}?`,
      a: `Start by learning the fundamentals and understanding the core concepts. Take time to research best practices, consider taking courses or reading guides, and then begin implementing gradually. Don't try to do everything at once—focus on one area at a time.`,
    },
    {
      q: `How long does it take to see results from ${keyword}?`,
      a: `Results vary depending on your starting point and how effectively you implement strategies. Most organizations see initial improvements within 2-4 weeks, with more significant results appearing after 2-3 months of consistent effort.`,
    },
    {
      q: `What are the common mistakes to avoid with ${keyword}?`,
      a: `Common mistakes include not having clear goals, trying to implement too much too quickly, not measuring results, and giving up too early. Focus on consistency, measure everything, and be patient with the process.`,
    },
    {
      q: `Can ${keyword} work for my specific industry?`,
      a: `Yes, ${keyword} principles are universal and can be adapted to any industry. While implementation details may vary, the core concepts and best practices apply across different sectors and business types.`,
    },
  ];
}

function calculateSEOScore(keyword: string, sections: GeneratedBlog["sections"], metaTitle: string, metaDescription: string): number {
  let score = 50; // Base score

  // Check keyword usage
  const keywordCount = sections.reduce((count, section) => {
    return count + (section.content.match(new RegExp(keyword, "gi"))?.length || 0);
  }, 0);
  if (keywordCount >= 5) score += 15;
  else if (keywordCount >= 3) score += 10;

  // Check content length
  const totalWords = sections.reduce((count, section) => {
    return count + section.content.split(/\s+/).length;
  }, 0);
  if (totalWords >= 2000) score += 15;
  else if (totalWords >= 1500) score += 10;

  // Check meta tags
  if (metaTitle.length >= 50 && metaTitle.length <= 60) score += 10;
  if (metaDescription.length >= 150 && metaDescription.length <= 160) score += 10;

  // Check structure
  if (sections.length >= 5) score += 10;

  return Math.min(score, 100);
}

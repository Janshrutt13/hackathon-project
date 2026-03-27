import { GoogleGenerativeAI } from "@google/generative-ai";
import type { WorkflowState } from "./types";
import { calculateDetailedSEOScore } from "./seoCalculator";

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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateBlogWithAI(state: WorkflowState): Promise<GeneratedBlog> {
  const { keyword, audience, intent, tone, region } = state;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate title
    const titleResponse = await model.generateContent(
      `Generate a compelling, SEO-friendly blog title for the keyword: "${keyword}". 
      The title should be engaging and include the keyword naturally. 
      Return only the title, nothing else.`
    );

    const title = titleResponse.response.text().trim() || `The Complete Guide to ${keyword}`;

    // Generate meta tags
    const metaResponse = await model.generateContent(
      `Generate SEO meta tags for a blog about "${keyword}".
      Return in this exact format:
      TITLE: [50-60 character meta title]
      DESCRIPTION: [150-160 character meta description]
      
      Make them compelling and include the keyword naturally.`
    );

    const metaText = metaResponse.response.text() || "";
    const metaTitle = metaText.match(/TITLE:\s*(.+)/)?.[1]?.trim() || `${keyword} | Complete Guide`;
    const metaDescription = metaText.match(/DESCRIPTION:\s*(.+)/)?.[1]?.trim() || `Learn everything about ${keyword}. Expert guide with best practices and strategies.`;

    // Generate blog sections
    const sectionsResponse = await model.generateContent(
      `Write a comprehensive blog post about "${keyword}" for ${audience}.
      
      Requirements:
      - Tone: ${tone}
      - Search Intent: ${intent.join(", ")}
      - Region: ${region}
      - Include the keyword naturally throughout (aim for 1-3% keyword density)
      - Write 5 sections with clear headings
      - Each section should be 250-350 words
      - Use practical examples and actionable advice
      - Include keyword variations naturally
      
      Format your response as:
      SECTION 1: [Heading]
      [Content]
      
      SECTION 2: [Heading]
      [Content]
      
      (Continue for 5 sections)`
    );

    const sectionsText = sectionsResponse.response.text() || "";
    const sections = parseSections(sectionsText);

    // Generate FAQs
    const faqResponse = await model.generateContent(
      `Generate 4 frequently asked questions and answers about "${keyword}".
      
      Format your response as:
      Q1: [Question]
      A1: [Answer]
      
      Q2: [Question]
      A2: [Answer]
      
      (Continue for 4 Q&A pairs)
      
      Make answers practical, helpful, and include the keyword naturally.`
    );

    const faqText = faqResponse.response.text() || "";
    const faqs = parseFAQs(faqText);

    // Create blog object
    const blog: GeneratedBlog = {
      title,
      metaTitle,
      metaDescription,
      sections: sections.length > 0 ? sections : getDefaultSections(keyword, audience),
      faqs: faqs.length > 0 ? faqs : getDefaultFAQs(keyword),
      seoScore: 75, // Placeholder, will be calculated below
    };

    // Calculate detailed SEO score
    const seoMetrics = calculateDetailedSEOScore(blog, keyword);
    blog.seoScore = seoMetrics.seoScore;

    return blog;
  } catch (error) {
    console.error("Error generating blog with Gemini AI:", error);
    // Fallback to template-based generation
    return generateBlogWithTemplate(state);
  }
}

function parseSections(text: string): GeneratedBlog["sections"] {
  const sections: GeneratedBlog["sections"] = [];
  const sectionMatches = text.match(/SECTION \d+:\s*(.+?)\n([\\s\\S]*?)(?=SECTION \d+:|$)/g) || [];

  sectionMatches.forEach((match) => {
    const headingMatch = match.match(/SECTION \d+:\s*(.+?)\n/);
    const contentMatch = match.match(/\n([\\s\\S]+?)(?=SECTION|$)/);

    if (headingMatch && contentMatch) {
      sections.push({
        heading: headingMatch[1].trim(),
        content: contentMatch[1].trim(),
      });
    }
  });

  return sections;
}

function parseFAQs(text: string): GeneratedBlog["faqs"] {
  const faqs: GeneratedBlog["faqs"] = [];
  const qMatches = text.match(/Q\d+:\s*(.+?)\nA\d+:\s*(.+?)(?=Q\d+:|$)/g) || [];

  qMatches.forEach((match) => {
    const qMatch = match.match(/Q\d+:\s*(.+?)\n/);
    const aMatch = match.match(/A\d+:\s*(.+?)(?=Q\d+:|$)/);

    if (qMatch && aMatch) {
      faqs.push({
        q: qMatch[1].trim(),
        a: aMatch[1].trim(),
      });
    }
  });

  return faqs;
}

// Fallback template-based generation
function generateBlogWithTemplate(state: WorkflowState): GeneratedBlog {
  const { keyword, audience, tone } = state;

  const blog: GeneratedBlog = {
    title: `The Complete Guide to ${keyword}`,
    metaTitle: `${keyword} | Complete Guide & Best Practices`,
    metaDescription: `Learn everything about ${keyword}. Expert guide with best practices and strategies for ${audience}.`,
    sections: getDefaultSections(keyword, audience),
    faqs: getDefaultFAQs(keyword),
    seoScore: 75,
  };

  // Calculate SEO score for fallback
  const seoMetrics = calculateDetailedSEOScore(blog, keyword);
  blog.seoScore = seoMetrics.seoScore;

  return blog;
}

function getDefaultSections(keyword: string, audience: string): GeneratedBlog["sections"] {
  return [
    {
      heading: "Introduction",
      content: `${keyword} has become increasingly important in today's digital landscape. Whether you're a ${audience} or just getting started, understanding the fundamentals of ${keyword} is crucial for success. This comprehensive guide will walk you through everything you need to know about ${keyword}, from basic concepts to advanced strategies.\\n\\nIn this article, we'll explore what ${keyword} is, why it matters, and how you can leverage it to achieve your goals. By the end, you'll have a clear understanding of how to implement ${keyword} effectively in your workflow.`,
    },
    {
      heading: `What is ${keyword}?`,
      content: `${keyword} refers to a set of practices and methodologies designed to help you achieve better results. At its core, ${keyword} is about understanding your audience, analyzing data, and making informed decisions.\\n\\nThe concept of ${keyword} has evolved significantly over the years, and today's approach to ${keyword} is more sophisticated and data-driven than ever before. Modern ${keyword} combines traditional best practices with cutting-edge technology and innovative strategies.`,
    },
    {
      heading: "Why It Matters",
      content: `For ${audience}, ${keyword} is not just a nice-to-have—it's essential. Here's why ${keyword} matters:\\n\\n• Improved efficiency and productivity through ${keyword}\\n• Better decision-making based on data from ${keyword}\\n• Competitive advantage in your industry using ${keyword}\\n• Enhanced results and measurable outcomes with ${keyword}\\n• Scalability and long-term growth through ${keyword}\\n\\nOrganizations that master ${keyword} consistently outperform their competitors and achieve better results across all metrics.`,
    },
    {
      heading: `Best Practices for ${keyword}`,
      content: `To get the most out of ${keyword}, follow these proven best practices:\\n\\n1. Start with clear goals and objectives for ${keyword}\\n2. Analyze your current situation thoroughly before implementing ${keyword}\\n3. Implement ${keyword} changes gradually and measure results\\n4. Stay updated with latest trends and developments in ${keyword}\\n5. Continuously optimize your ${keyword} strategy based on performance data\\n6. Invest in training and skill development for ${keyword}\\n\\nThese practices have been tested and proven effective across various industries and use cases of ${keyword}.`,
    },
    {
      heading: `Implementation Strategy for ${keyword}`,
      content: `Implementing ${keyword} successfully requires a structured approach. Begin by assessing your current state and identifying areas for improvement in ${keyword}. Create a detailed action plan with specific milestones and timelines for ${keyword}.\\n\\nNext, allocate necessary resources and ensure your team has the skills and tools needed for ${keyword}. Monitor progress regularly and be prepared to adjust your ${keyword} strategy based on results. Remember that ${keyword} is an ongoing process, not a one-time project.`,
    },
  ];
}

function getDefaultFAQs(keyword: string): GeneratedBlog["faqs"] {
  return [
    {
      q: `What is the best way to get started with ${keyword}?`,
      a: `Start by learning the fundamentals and understanding the core concepts of ${keyword}. Take time to research best practices for ${keyword}, consider taking courses or reading guides about ${keyword}, and then begin implementing gradually. Don't try to do everything at once—focus on one area of ${keyword} at a time.`,
    },
    {
      q: `How long does it take to see results from ${keyword}?`,
      a: `Results from ${keyword} vary depending on your starting point and how effectively you implement strategies. Most organizations see initial improvements in ${keyword} within 2-4 weeks, with more significant results appearing after 2-3 months of consistent effort with ${keyword}.`,
    },
    {
      q: `What are the common mistakes to avoid with ${keyword}?`,
      a: `Common mistakes with ${keyword} include not having clear goals, trying to implement too much ${keyword} too quickly, not measuring results from ${keyword}, and giving up too early. Focus on consistency with ${keyword}, measure everything, and be patient with the ${keyword} process.`,
    },
    {
      q: `Can ${keyword} work for my specific industry?`,
      a: `Yes, ${keyword} principles are universal and can be adapted to any industry. While implementation details of ${keyword} may vary, the core concepts and best practices of ${keyword} apply across different sectors and business types.`,
    },
  ];
}

import type { KeywordCluster, SerpGap, SeoScore } from "./types";

export const mockClusters: KeywordCluster[] = [
  { group: "Core Topic", keywords: ["AI content writing", "AI blog generator", "automated blogging"], volume: "18K/mo", difficulty: "62" },
  { group: "Long-tail", keywords: ["how to write SEO blog with AI", "best AI tools for bloggers", "AI writing assistant free"], volume: "6.4K/mo", difficulty: "38" },
  { group: "Comparison", keywords: ["AI vs human writing", "ChatGPT for blogging", "Jasper vs Copy.ai"], volume: "9.1K/mo", difficulty: "55" },
  { group: "Intent: Buy", keywords: ["buy AI writing tool", "AI blog software pricing", "best paid AI writer"], volume: "3.2K/mo", difficulty: "44" },
];

export const mockSerpGaps: SerpGap[] = [
  { topic: "Step-by-step AI blog workflow", covered: false, priority: "high" },
  { topic: "SEO optimization checklist", covered: false, priority: "high" },
  { topic: "Keyword clustering strategy", covered: true, priority: "medium" },
  { topic: "Content freshness signals", covered: false, priority: "medium" },
  { topic: "Internal linking best practices", covered: false, priority: "high" },
  { topic: "FAQ schema markup", covered: true, priority: "low" },
  { topic: "E-E-A-T signals in AI content", covered: false, priority: "high" },
];

export const mockSeoScores: SeoScore[] = [
  { label: "SEO Score", value: 87, color: "#7C3AED" },
  { label: "Keyword Density", value: 72, color: "#2563EB" },
  { label: "Readability", value: 91, color: "#059669" },
  { label: "SERP Coverage", value: 64, color: "#D97706" },
  { label: "Snippet Readiness", value: 78, color: "#7C3AED" },
  { label: "AI Naturalness", value: 83, color: "#2563EB" },
  { label: "CTA Strength", value: 69, color: "#059669" },
];

export const mockBlogContent = {
  title: "How AI Blog Generators Are Revolutionizing SEO Content in 2025",
  metaTitle: "AI Blog Generator: Create SEO-Optimized Content in Minutes | Blogy AI",
  metaDescription: "Discover how AI blog generators use keyword clustering, SERP analysis, and intelligent prompting to produce fully optimized blog posts that rank on Google.",
  sections: [
    {
      heading: "Introduction",
      content: "The content marketing landscape has fundamentally shifted. What once required a team of writers, SEO specialists, and editors can now be orchestrated by an intelligent AI pipeline — one that understands search intent, clusters keywords semantically, and generates content that satisfies both readers and search engines.\n\nBlogy AI represents this new paradigm: not just a writing tool, but a complete SEO content engine."
    },
    {
      heading: "What Is an AI Blog Generator?",
      content: "An AI blog generator is more than a text completion tool. At its core, it's a multi-step reasoning system that:\n\n• Analyzes search intent behind your target keyword\n• Clusters semantically related keywords for topical authority\n• Identifies SERP gaps your competitors haven't covered\n• Structures content around proven ranking frameworks\n• Validates output against real SEO signals"
    },
    {
      heading: "The 7-Step AI Content Pipeline",
      content: "Modern AI content systems operate through a structured pipeline rather than a single prompt. This pipeline approach ensures every piece of content is strategically sound before a single word is written.\n\nStep 1 begins with keyword intent analysis — understanding whether a searcher wants information, wants to buy, or wants to navigate to a specific resource. This single insight shapes everything that follows."
    },
    {
      heading: "Why Keyword Clustering Matters",
      content: "Google's Helpful Content Update made one thing clear: topical authority beats keyword stuffing. By clustering related keywords into semantic groups, AI systems can build content that covers a topic comprehensively — signaling expertise to search engines and providing genuine value to readers."
    },
    {
      heading: "SERP Gap Analysis: The Competitive Edge",
      content: "The most powerful feature of an AI blog engine is its ability to analyze what's already ranking and identify what's missing. These content gaps represent your highest-opportunity topics — areas where you can provide value that competitors haven't addressed."
    },
  ],
  faqs: [
    { q: "Can AI-generated blogs rank on Google?", a: "Yes — when produced through a structured pipeline that respects E-E-A-T signals, keyword intent, and content depth. AI-generated content that provides genuine value is treated the same as human-written content by Google's algorithms." },
    { q: "How long does it take to generate a blog post?", a: "With Blogy AI's pipeline, a fully optimized 2,000-word blog post takes approximately 90 seconds from keyword input to final output." },
    { q: "What makes Blogy AI different from ChatGPT?", a: "ChatGPT is a general-purpose language model. Blogy AI is a purpose-built SEO content engine with keyword clustering, SERP analysis, and real-time SEO validation built into every generation." },
  ],
};

export const promptFlowNodes = [
  { id: "keyword", label: "Keyword", sublabel: "Intent + Context", icon: "🔍" },
  { id: "cluster", label: "Clustering", sublabel: "Semantic Groups", icon: "🧩" },
  { id: "serp", label: "SERP", sublabel: "Gap Analysis", icon: "📊" },
  { id: "prompt", label: "Prompt Arch", sublabel: "AI Reasoning", icon: "🧠" },
  { id: "generate", label: "Generate", sublabel: "Stream Output", icon: "✍️" },
  { id: "validate", label: "Validate", sublabel: "SEO Score", icon: "✅" },
  { id: "output", label: "Output", sublabel: "Final Blog", icon: "🚀" },
];

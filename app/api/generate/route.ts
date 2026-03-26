import { generateBlogWithAI } from "@/lib/aiGenerator";
import { generateAnalyticsReport } from "@/lib/analyticsCalculator";
import type { WorkflowState } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as WorkflowState;

    if (!body.keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const blog = await generateBlogWithAI(body);
    
    // Generate analytics report
    const analytics = generateAnalyticsReport(blog, body.keyword, 5000, 45);

    return NextResponse.json({
      ...blog,
      analytics,
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog" },
      { status: 500 }
    );
  }
}

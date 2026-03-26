"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6" style={{ color: "var(--text)" }}>
          Keyword to Blog.
          <br />
          <span style={{ color: "var(--accent)" }}>Engineered.</span>
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Transform any keyword into a fully SEO-optimized blog post through an intelligent AI pipeline.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/workflow" className="btn-primary flex items-center gap-2">
            Start Now
            <ArrowRight size={16} />
          </Link>
          <Link href="/output" className="btn-ghost">
            View Example
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 opacity-20 animate-pulse" 
          style={{ borderColor: "var(--accent)", animationDuration: "3s" }} />
        <div className="absolute bottom-32 right-20 w-24 h-24 border-2 opacity-15 animate-pulse" 
          style={{ borderColor: "var(--accent-success)", animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full opacity-40" 
          style={{ background: "var(--accent)" }} />
        <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full opacity-30" 
          style={{ background: "var(--accent-secondary)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border-2 opacity-0 animate-fade-in" 
          style={{ 
            borderColor: "var(--accent)", 
            background: "var(--glow)",
            animationDelay: "0.2s"
          }}>
          <Zap size={14} style={{ color: "var(--accent)" }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            AI-Powered SEO Engine
          </span>
        </div>

        {/* Main heading with staggered animation */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6 opacity-0 animate-slide-up" 
          style={{ 
            color: "var(--text)",
            animationDelay: "0.4s",
            textShadow: "4px 4px 0 rgba(255, 140, 66, 0.2)"
          }}>
          KEYWORD
          <br />
          <span className="inline-block opacity-0 animate-slide-up" style={{ color: "var(--accent)", animationDelay: "0.6s" }}>TO BLOG</span>
          <span className="inline-block text-5xl md:text-6xl ml-4 opacity-0 animate-slide-up" style={{ animationDelay: "0.8s" }}>⚡</span>
        </h1>

        <div className="w-24 h-1 mx-auto mb-8 opacity-0 animate-fade-in" 
          style={{ 
            background: "var(--accent)",
            animationDelay: "1s"
          }} />

        <p className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-slide-up" 
          style={{ 
            color: "var(--text-secondary)",
            fontFamily: "var(--font-serif)",
            animationDelay: "1.2s"
          }}>
          Transform any keyword into a fully SEO-optimized blog post through an intelligent AI pipeline. 
          No guesswork. Just results.
        </p>

        <div className="flex items-center justify-center gap-6 opacity-0 animate-fade-in" style={{ animationDelay: "1.4s" }}>
          <Link href="/workflow" className="btn-primary flex items-center gap-3">
            <span>Launch Pipeline</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/output" className="btn-ghost">
            View Sample
          </Link>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-12 mt-20 opacity-0 animate-fade-in" style={{ animationDelay: "1.6s" }}>
          {[
            { label: "SEO Signals", value: "7+" },
            { label: "Avg. Score", value: "92%" },
            { label: "Gen Time", value: "<3min" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

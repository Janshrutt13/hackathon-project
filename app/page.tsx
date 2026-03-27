"use client";
import Hero from "@/components/landing/Hero";
import PipelinePreview from "@/components/landing/PipelinePreview";

export default function LandingPage() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Hero />
      <PipelinePreview />
      <footer className="py-12 text-center border-t-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="text-left">
              <div className="text-2xl font-black mb-2" style={{ color: "var(--accent)" }}>BLOGY AI</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                SEO Blog Engine
              </div>
            </div>
            <div className="flex gap-8 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
              <a href="#" className="transition-colors hover:text-accent" style={{ color: "var(--muted)" }}>
                Docs
              </a>
              <a href="#" className="transition-colors hover:text-accent" style={{ color: "var(--muted)" }}>
                API
              </a>
              <a href="#" className="transition-colors hover:text-accent" style={{ color: "var(--muted)" }}>
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t-2 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            © 2025 BLOGY AI — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </main>
  );
}

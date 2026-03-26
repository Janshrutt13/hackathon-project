import Hero from "@/components/landing/Hero";
import PipelinePreview from "@/components/landing/PipelinePreview";

export default function LandingPage() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Hero />
      <PipelinePreview />
      <footer className="py-8 text-center text-xs border-t" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        © 2025 Blogy AI — SEO Blog Engine
      </footer>
    </main>
  );
}

import Link from "next/link";
import { mockBlogContent } from "@/lib/mockData";

export default function Step7Output() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Pipeline Complete</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Your SEO-optimized blog is ready.</p>
      </div>

      <div className="p-5 rounded-xl border" style={{ background: "rgba(5,150,105,0.05)", borderColor: "rgba(5,150,105,0.3)" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-400 text-lg">✓</span>
          <span className="font-semibold text-sm" style={{ color: "#6EE7B7" }}>All 6 pipeline stages complete</span>
        </div>
        <h3 className="font-bold text-lg leading-snug mb-2" style={{ color: "var(--text)" }}>
          {mockBlogContent.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{mockBlogContent.metaDescription}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Word Count", value: "2,140" },
          { label: "SEO Score", value: "87%" },
          { label: "Read Time", value: "9 min" },
          { label: "Sections", value: "7" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-lg border text-center" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="text-xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/output"
          className="flex-1 py-3 rounded-xl font-semibold text-sm text-white text-center transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}>
          View Full Blog →
        </Link>
        <button className="px-4 py-3 rounded-xl font-semibold text-sm border transition-all hover:border-gray-500"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          Export
        </button>
      </div>
    </div>
  );
}

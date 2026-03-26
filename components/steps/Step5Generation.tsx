"use client";
import { useEffect, useState } from "react";
import { mockBlogContent } from "@/lib/mockData";

const fullText = mockBlogContent.sections[0].content + "\n\n" + mockBlogContent.sections[1].content;

export default function Step5Generation() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(100, Math.round((displayed.length / fullText.length) * 100));

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Blog Generation</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Streaming output in real-time.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "var(--accent)" }} />
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>{progress}%</span>
        {done && <span className="text-xs" style={{ color: "#059669" }}>✓ Complete</span>}
      </div>

      <div className="p-4 rounded-xl border min-h-48 font-mono text-sm leading-relaxed"
        style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
        {displayed}
        {!done && <span className="inline-block w-0.5 h-4 ml-0.5 animate-pulse" style={{ background: "var(--accent)" }} />}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Words", value: done ? "2,140" : "..." },
          { label: "Sections", value: done ? "7" : "..." },
          { label: "Read Time", value: done ? "9 min" : "..." },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-lg border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="text-lg font-bold" style={{ color: "var(--text)" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

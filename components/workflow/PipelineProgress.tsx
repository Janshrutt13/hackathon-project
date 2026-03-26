"use client";
import { useBlogStore } from "@/lib/store";
import { Check } from "lucide-react";

const steps = [
  { num: 1, label: "Keyword", icon: "🔍" },
  { num: 2, label: "Clustering", icon: "🧩" },
  { num: 3, label: "SERP", icon: "📊" },
  { num: 4, label: "Prompt", icon: "🧠" },
  { num: 5, label: "Generate", icon: "✍️" },
  { num: 6, label: "Validate", icon: "✅" },
  { num: 7, label: "Output", icon: "🚀" },
];

export default function PipelineProgress() {
  const { currentStep, stepStatuses } = useBlogStore();

  return (
    <div className="w-full px-8 py-4 border-b flex items-center gap-2 overflow-x-auto"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      {steps.map((step, i) => {
        const status = stepStatuses[i];
        const isActive = step.num === currentStep;
        const isDone = step.num < currentStep;

        return (
          <div key={step.num} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={isActive
                ? { background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.5)" }
                : { border: "1px solid transparent" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={isActive
                  ? { background: "var(--accent)", color: "white" }
                  : isDone
                  ? { background: "var(--accent-success)", color: "white" }
                  : { background: "var(--border)", color: "var(--muted)" }}>
                {isDone ? <Check size={14} /> : <span>{step.icon}</span>}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold leading-none"
                  style={{ color: isActive ? "var(--accent)" : isDone ? "var(--accent-success)" : "var(--muted)" }}>
                  {step.label}
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="w-6 h-px flex-shrink-0"
                style={{ background: isDone ? "var(--accent-success)" : "var(--border)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

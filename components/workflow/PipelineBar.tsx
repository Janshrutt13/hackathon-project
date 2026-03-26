"use client";
import { cn } from "@/lib/utils";
import { promptFlowNodes } from "@/lib/mockData";
import { Check } from "lucide-react";

type Props = { currentStep: number; onStepClick: (step: number) => void };

export default function PipelineBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="w-full px-6 py-4 border-b flex items-center gap-0 overflow-x-auto"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      {promptFlowNodes.map((node, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;
        return (
          <div key={node.id} className="flex items-center gap-0 flex-shrink-0">
            <button onClick={() => onStepClick(step)}
              className={cn("flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left",
                isActive ? "text-white" : isDone ? "hover:opacity-80" : "hover:opacity-70")}
              style={isActive
                ? { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)" }
                : { border: "1px solid transparent" }}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0")}
                style={isActive
                  ? { background: "var(--accent)", color: "white" }
                  : isDone
                  ? { background: "#059669", color: "white" }
                  : { background: "var(--border)", color: "var(--muted)" }}>
                {isDone ? <Check size={10} /> : <span>{node.icon}</span>}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold leading-none mb-0.5"
                  style={{ color: isActive ? "var(--text)" : isDone ? "#6EE7B7" : "var(--muted)" }}>
                  {node.label}
                </div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>{node.sublabel}</div>
              </div>
            </button>
            {i < promptFlowNodes.length - 1 && (
              <div className="w-6 h-px mx-1 flex-shrink-0"
                style={{ background: isDone ? "#059669" : "var(--border)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

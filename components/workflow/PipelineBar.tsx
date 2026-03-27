"use client";
import { cn } from "@/lib/utils";
import { promptFlowNodes } from "@/lib/mockData";
import { Check } from "lucide-react";

type Props = { currentStep: number; onStepClick: (step: number) => void };

export default function PipelineBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="w-full px-6 py-4 border-b-2 flex items-center gap-0 overflow-x-auto"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      {promptFlowNodes.map((node, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;
        return (
          <div key={node.id} className="flex items-center gap-0 flex-shrink-0">
            <button onClick={() => onStepClick(step)}
              className={cn("flex items-center gap-3 px-4 py-3 transition-all text-left border-2",
                isActive ? "" : "border-transparent")}
              style={isActive
                ? { 
                    background: "var(--glow)", 
                    borderColor: "var(--accent)",
                    boxShadow: "3px 3px 0 rgba(255, 140, 66, 0.2)"
                  }
                : isDone
                ? { background: "rgba(127, 216, 88, 0.1)" }
                : {}}>
              <div className={cn("w-8 h-8 border-2 flex items-center justify-center text-xs font-bold flex-shrink-0")}
                style={isActive
                  ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--bg)" }
                  : isDone
                  ? { background: "var(--accent-success)", borderColor: "var(--accent-success)", color: "var(--bg)" }
                  : { background: "transparent", borderColor: "var(--border)", color: "var(--muted)" }}>
                {isDone ? <Check size={14} strokeWidth={3} /> : <span>{node.icon}</span>}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold uppercase tracking-wider leading-none mb-1"
                  style={{ 
                    color: isActive ? "var(--accent)" : isDone ? "var(--accent-success)" : "var(--muted)",
                    fontFamily: "var(--font-mono)"
                  }}>
                  {node.label}
                </div>
                <div className="text-[10px] uppercase tracking-wide" 
                  style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                  {node.sublabel}
                </div>
              </div>
            </button>
            {i < promptFlowNodes.length - 1 && (
              <div className="w-8 h-0.5 mx-1 flex-shrink-0"
                style={{ background: isDone ? "var(--accent-success)" : "var(--border)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

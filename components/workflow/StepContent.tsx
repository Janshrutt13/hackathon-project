import type { WorkflowState } from "@/lib/types";
import Step1KeywordInput from "@/components/steps/Step1KeywordInput";
import Step2Clustering from "@/components/steps/Step2Clustering";
import Step3Serp from "@/components/steps/Step3Serp";
import Step4PromptArch from "@/components/steps/Step4PromptArch";
import Step5Generation from "@/components/steps/Step5Generation";
import Step6Validation from "@/components/steps/Step6Validation";
import Step7Output from "@/components/steps/Step7Output";

type Props = { state: WorkflowState };

export default function StepContent({ state }: Props) {
  const map: Record<number, React.ReactNode> = {
    1: <Step1KeywordInput state={state} />,
    2: <Step2Clustering />,
    3: <Step3Serp />,
    4: <Step4PromptArch />,
    5: <Step5Generation />,
    6: <Step6Validation />,
    7: <Step7Output />,
  };
  return (
    <div className="h-full overflow-y-auto">
      {map[state.currentStep] ?? null}
    </div>
  );
}

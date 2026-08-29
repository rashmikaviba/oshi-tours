"use client";

interface Props {
  currentStep: number;
  totalSteps: number;
  steps: { id: number; title: string }[];
  onStepClick?: (stepId: number) => void;
}

export default function TripPlannerStepper({ currentStep, totalSteps, steps, onStepClick }: Props) {
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className="w-full mb-8">
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] mb-3">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="font-semibold text-[var(--color-green)]">{steps[currentStep - 1]?.title}</span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1.5 bg-[var(--color-green)]/15 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[var(--color-green)] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Pills / Indicators (Desktop & Tablet) */}
      <div className="hidden sm:flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
        {steps.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isClickable = onStepClick && step.id <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
                isCurrent
                  ? "bg-[var(--color-green)] text-[var(--color-beige)] font-semibold shadow-sm"
                  : isCompleted
                  ? "bg-[var(--color-green)]/15 text-[var(--color-green)] hover:bg-[var(--color-green)]/25 cursor-pointer"
                  : "text-[var(--color-green)]/40 cursor-not-allowed"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                isCurrent ? "bg-[var(--color-beige)] text-[var(--color-green)]" : "border border-current"
              }`}>
                {step.id}
              </span>
              <span className="truncate max-w-[90px]">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

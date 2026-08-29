import { motion } from "framer-motion";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-3 text-[var(--color-green)]">
        <p className="font-mono text-sm tracking-widest uppercase opacity-70">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      <div className="w-full h-[3px] bg-[var(--color-green)]/10 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--color-green)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

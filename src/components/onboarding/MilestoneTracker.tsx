import type { VendorOnboardingStep } from "@/types/vendorOnboarding";
import { MILESTONES, MILESTONE_LABELS } from "./onboardingQuestions";

interface MilestoneTrackerProps {
  currentMilestone: VendorOnboardingStep;
  completedMilestones: Set<VendorOnboardingStep>;
}

export function MilestoneTracker({ currentMilestone, completedMilestones }: MilestoneTrackerProps) {
  const currentIdx = MILESTONES.indexOf(currentMilestone);

  return (
    <div className="flex flex-wrap gap-2 lg:gap-3 justify-center">
      {MILESTONES.map((milestone, idx) => {
        const isCompleted = completedMilestones.has(milestone);
        const isCurrent = milestone === currentMilestone;
        const isPast = idx < currentIdx;

        return (
          <span
            key={milestone}
            className={`inline-flex items-center rounded-full text-xs lg:text-sm px-3 py-1.5 lg:px-5 lg:py-2 font-medium transition-colors ${
              isCompleted || isPast
                ? "bg-primary text-white"
                : isCurrent
                  ? "bg-primary/10 text-primary border border-primary"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {MILESTONE_LABELS[milestone]}
          </span>
        );
      })}
    </div>
  );
}

import { Package, UserCircle, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IntroQuestionProps {
  questionId: string;
  heading: string;
  subtitle?: string;
}

const INTRO_CONFIG: Record<string, { icon: LucideIcon; label: string }> = {
  "listing.intro": { icon: Package, label: "First Listing" },
  "account.intro": { icon: UserCircle, label: "Account Setup" },
  "verification.intro": { icon: ShieldCheck, label: "Verification" },
};

export function IntroQuestion({ questionId, heading, subtitle }: IntroQuestionProps) {
  const config = INTRO_CONFIG[questionId];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
      {/* Text */}
      <div className="flex-1 lg:text-left">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
          {config.label}
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-primary leading-tight">
          {heading}
        </h2>
        {subtitle && (
          <p className="mt-3 lg:mt-4 text-base lg:text-lg text-gray-500 leading-relaxed max-w-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Icon / illustration */}
      <div className="flex justify-center lg:justify-end shrink-0">
        <div className="flex h-32 w-32 lg:h-48 lg:w-48 items-center justify-center rounded-full bg-primary/5">
          <Icon className="h-16 w-16 lg:h-24 lg:w-24 text-primary/40" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}

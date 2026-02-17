import { ArrowLeft } from "lucide-react";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import type { VendorOnboardingStep } from "@/types/vendorOnboarding";
import { MILESTONES } from "./onboardingQuestions";

interface OnboardingWizardLayoutProps {
  currentMilestone: VendorOnboardingStep;
  completedMilestones: Set<VendorOnboardingStep>;
  milestoneProgress: Record<string, number>;
  heading: string;
  subtitle?: string;
  isIntro?: boolean;
  error?: string | null;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  isSubmitting: boolean;
  nextLabel?: string;
  children: React.ReactNode;
}

export function OnboardingWizardLayout({
  milestoneProgress,
  heading,
  subtitle,
  isIntro,
  error,
  onBack,
  onNext,
  canGoBack,
  isLastQuestion,
  isSubmitting,
  nextLabel,
  children,
}: OnboardingWizardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-10 max-w-6xl mx-auto">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center h-9 w-9 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <Link href="/">
            <span className="text-lg lg:text-xl font-bold text-primary">
              New<span className="text-secondary">world</span>
            </span>
          </Link>
          <div className="w-9" />
        </div>
      </header>

      {/* Segmented progress bar */}
      <div className="px-4 lg:px-10 pt-4 pb-3 max-w-6xl mx-auto w-full">
        <div className="flex gap-1.5">
          {MILESTONES.map((m) => {
            const pct = Math.round((milestoneProgress[m] ?? 0) * 100);
            return (
              <div
                key={m}
                className="flex-1 h-1.5 rounded-full bg-primary/15 overflow-hidden"
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-4 lg:px-10 w-full">
        {isIntro ? (
          /* Intro pages: full width, no heading (IntroQuestion renders its own) */
          <div className="py-8 lg:py-16 flex-1 w-full max-w-5xl flex flex-col justify-center">
            {children}
          </div>
        ) : (
          /* Regular questions: centered with heading */
          <div className="py-6 lg:py-10 flex-1 w-full max-w-4xl lg:text-center">
            <h1 className="text-2xl lg:text-5xl font-bold text-primary">{heading}</h1>
            {subtitle && (
              <p className="mt-2 lg:mt-3 text-sm lg:text-base text-gray-500">{subtitle}</p>
            )}

            <div className="mt-6 lg:mt-10 lg:mx-auto lg:max-w-2xl">{children}</div>

            {error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}
          </div>
        )}

        {/* Bottom actions */}
        <div className="py-6 lg:py-8 border-t border-gray-100 w-full max-w-5xl flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className="flex-1 lg:flex-none lg:px-14 h-12 lg:h-13 text-base rounded-2xl lg:rounded-2xl disabled:opacity-40"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex-1 lg:flex-none lg:px-14 h-12 lg:h-13 text-base rounded-2xl lg:rounded-2xl"
          >
            {isSubmitting
              ? "Submitting..."
              : isLastQuestion
                ? nextLabel ?? "Submit and Open Seller Hub"
                : isIntro
                  ? "Get Started"
                  : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

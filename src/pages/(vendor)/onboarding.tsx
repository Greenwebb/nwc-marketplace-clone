import { useEffect, useMemo, useState } from "react";
import { useLocation } from "@/lib/router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  VendorOnboardingDraftStorageAdapter,
  type VendorOnboardingGuestDraft,
} from "@/services/persistence/authStorage";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";
import { OnboardingWizardLayout } from "@/components/onboarding/OnboardingWizardLayout";
import { QuestionRenderer } from "@/components/onboarding/QuestionRenderer";
import { QUESTIONS, MILESTONES } from "@/components/onboarding/onboardingQuestions";

const MILESTONE_SET = new Set<string>(MILESTONES);

const initialDraft: VendorOnboardingDraft = {
  accountType: "personal",
  fullName: "",
  address: "",
  dateOfBirth: "",
  nrcNumber: "",
  legalBusinessName: "",
  dba: "",
  businessAddress: "",
  phoneNumber: "",
  emailAddress: "",
  password: "",
  phoneVerificationCode: "",
  nrcDocument: null,
  payoutMethod: "bank",
  bankAccountHolderName: "",
  bankName: "",
  branchCode: "",
  accountNumber: "",
  bankStatement: null,
  mobileMoneyProvider: "",
  mobileMoneyNumber: "",
  itemTitle: "",
  itemCategory: [],
  itemCondition: "",
  itemDescription: "",
  photos: [],
  priceZMW: "",
  pricingType: "fixed",
  shippingCarrier: "",
  shippingCost: "",
  localPickup: false,
};

const readStepFromQuery = (): VendorOnboardingStep | null => {
  const params = new URLSearchParams(window.location.search);
  const step = params.get("step");
  if (!step) return null;
  return MILESTONE_SET.has(step) ? (step as VendorOnboardingStep) : null;
};

const hasStepQuery = () => new URLSearchParams(window.location.search).has("step");

export default function VendorOnboarding() {
  const [, setLocation] = useLocation();
  const {
    user,
    canSell,
    needsVendorOnboarding,
    updateVendorOnboardingDraft,
    setVendorOnboardingStep: saveVendorOnboardingStep,
    completeVendorOnboarding,
    upgradeToVendorFromOnboarding,
    setActiveMode,
  } = useAuth();

  const [initialized, setInitialized] = useState(false);
  const [formData, setFormData] = useState<VendorOnboardingDraft>(initialDraft);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Visible questions (filters out conditionals that don't apply)
  const visibleQuestions = useMemo(
    () => QUESTIONS.filter((q) => !q.isVisible || q.isVisible(formData)),
    [formData],
  );

  const currentQuestion = visibleQuestions[questionIndex];
  const currentMilestone = currentQuestion?.milestone ?? "listing";
  const isLastQuestion = questionIndex === visibleQuestions.length - 1;

  // Completed milestones = all milestones whose questions are behind the current index
  const completedMilestones = useMemo(() => {
    const completed = new Set<VendorOnboardingStep>();
    for (const m of MILESTONES) {
      const questionsForMilestone = visibleQuestions.filter((q) => q.milestone === m);
      if (questionsForMilestone.length === 0) continue;
      const lastIdx = visibleQuestions.indexOf(questionsForMilestone[questionsForMilestone.length - 1]);
      if (lastIdx < questionIndex) completed.add(m);
    }
    return completed;
  }, [visibleQuestions, questionIndex]);

  // Per-milestone progress: { listing: 0.6, account: 0, ... }
  const milestoneProgress = useMemo(() => {
    const progress: Record<string, number> = {};
    for (const m of MILESTONES) {
      const qs = visibleQuestions.filter((q) => q.milestone === m);
      if (qs.length === 0) { progress[m] = 0; continue; }
      const firstIdx = visibleQuestions.indexOf(qs[0]);
      const lastIdx = visibleQuestions.indexOf(qs[qs.length - 1]);
      if (questionIndex > lastIdx) {
        progress[m] = 1; // fully done
      } else if (questionIndex >= firstIdx) {
        progress[m] = (questionIndex - firstIdx) / qs.length;
      } else {
        progress[m] = 0;
      }
    }
    return progress;
  }, [visibleQuestions, questionIndex]);

  // ── Initialization ──
  useEffect(() => {
    if (initialized) return;

    if (user && canSell && !needsVendorOnboarding) {
      VendorOnboardingDraftStorageAdapter.clear();
      setLocation("/vendor/dashboard");
      return;
    }

    // Load draft
    const guestDraft = VendorOnboardingDraftStorageAdapter.load();
    let loadedData = initialDraft;

    if (guestDraft?.data) {
      loadedData = guestDraft.data;
    }
    if (user?.vendorOnboardingData && canSell) {
      loadedData = user.vendorOnboardingData;
    }
    setFormData(loadedData);

    // Resolve question position
    const savedStep = (user && canSell ? user.vendorOnboardingStep : guestDraft?.step) ?? "listing";
    const queryStep = readStepFromQuery();
    const resolvedMilestone = hasStepQuery() ? (queryStep ?? savedStep) : "listing";

    // Build visible questions with loaded data to find position
    const visQ = QUESTIONS.filter((q) => !q.isVisible || q.isVisible(loadedData));

    // Try to restore exact question from saved questionId
    const savedQuestionId = guestDraft?.questionId;
    let startIdx = 0;

    if (savedQuestionId) {
      const exactIdx = visQ.findIndex((q) => q.id === savedQuestionId);
      if (exactIdx >= 0) startIdx = exactIdx;
    } else {
      // Fallback: go to first question of the resolved milestone
      const milestoneIdx = visQ.findIndex((q) => q.milestone === resolvedMilestone);
      if (milestoneIdx >= 0) startIdx = milestoneIdx;
    }

    setQuestionIndex(startIdx);
    setLocation(`/vendor/onboarding?step=${resolvedMilestone}`);
    setInitialized(true);
  }, [initialized, user, canSell, needsVendorOnboarding, setLocation]);

  // If onboarding reaches completed state at any point, exit to seller hub.
  useEffect(() => {
    if (!initialized) return;
    if (user && canSell && !needsVendorOnboarding) {
      VendorOnboardingDraftStorageAdapter.clear();
      setLocation("/vendor/dashboard");
    }
  }, [initialized, user, canSell, needsVendorOnboarding, setLocation]);

  // ── Persist draft ──
  useEffect(() => {
    if (!initialized) return;

    const draft: VendorOnboardingGuestDraft = {
      step: currentMilestone,
      questionId: currentQuestion?.id,
      data: formData,
      updatedAt: new Date().toISOString(),
    };
    VendorOnboardingDraftStorageAdapter.save(draft);

    if (user?.id && canSell) {
      updateVendorOnboardingDraft(formData).catch(() => null);
    }
  }, [
    formData,
    questionIndex,
    initialized,
    user?.id,
    canSell,
    currentMilestone,
    currentQuestion?.id,
    updateVendorOnboardingDraft,
  ]);

  // ── Sync URL and milestone step ──
  useEffect(() => {
    if (!initialized || !currentQuestion) return;

    if (user?.id && canSell && user.vendorOnboardingStep !== currentMilestone) {
      saveVendorOnboardingStep(currentMilestone).catch(() => null);
    }

    const queryStep = readStepFromQuery();
    if (queryStep !== currentMilestone) {
      setLocation(`/vendor/onboarding?step=${currentMilestone}`);
    }
  }, [
    currentMilestone,
    initialized,
    user?.id,
    user?.vendorOnboardingStep,
    canSell,
    setLocation,
    saveVendorOnboardingStep,
    currentQuestion,
  ]);

  // ── Field setter ──
  const setField = <K extends keyof VendorOnboardingDraft>(
    key: K,
    value: VendorOnboardingDraft[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ── Navigation ──
  const goNext = () => {
    if (!currentQuestion) return;

    // Seller hub step always submits completion.
    if (currentMilestone === "seller_hub" || isLastQuestion) {
      complete();
      return;
    }

    const validationError = currentQuestion.validate(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setQuestionIndex((prev) => Math.min(prev + 1, visibleQuestions.length - 1));
  };

  const goBack = () => {
    if (questionIndex > 0) {
      setError(null);
      setQuestionIndex((prev) => prev - 1);
    }
  };

  // ── Checkpoint ──
  const checkpoint = !user
    ? "needs_auth" as const
    : !canSell
      ? "needs_upgrade" as const
      : "ready_to_complete" as const;

  // ── Complete ──
  const complete = async () => {
    setError(null);

    if (!user) {
      const returnTo = encodeURIComponent("/vendor/onboarding?step=seller_hub&resume=1");
      toast.info("Sign in to complete vendor onboarding.");
      setLocation(`/auth/login?returnTo=${returnTo}`);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!canSell) {
        await upgradeToVendorFromOnboarding();
      }

      await completeVendorOnboarding();
      // Mode sync is best-effort; completion redirect should not be blocked by this.
      try {
        await setActiveMode("vendor");
      } catch {
        // no-op
      }
      VendorOnboardingDraftStorageAdapter.clear();
      toast.success("Vendor onboarding completed. Welcome to Seller Hub.");
      setLocation("/vendor/dashboard");
    } catch {
      toast.error("Unable to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) return null;

  return (
    <OnboardingWizardLayout
      currentMilestone={currentMilestone}
      completedMilestones={completedMilestones}
      milestoneProgress={milestoneProgress}
      heading={currentQuestion.heading}
      subtitle={currentQuestion.subtitle}
      isIntro={currentQuestion.inputType === "intro"}
      error={error}
      onBack={goBack}
      onNext={goNext}
      canGoBack={questionIndex > 0}
      isLastQuestion={isLastQuestion}
      isSubmitting={isSubmitting}
    >
      <QuestionRenderer
        key={currentQuestion.id}
        question={currentQuestion}
        formData={formData}
        setField={setField}
        setError={setError}
        checkpoint={checkpoint}
      />
    </OnboardingWizardLayout>
  );
}

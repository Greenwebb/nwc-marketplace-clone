import { Textarea } from "@/components/ui/textarea";
import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

interface TextareaQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
}

export function TextareaQuestion({ questionId, formData, setField }: TextareaQuestionProps) {
  if (questionId !== "listing.description") return null;

  return (
    <Textarea
      value={formData.itemDescription}
      onChange={(e) => setField("itemDescription", e.target.value)}
      placeholder="Describe the features, condition, and any details buyers should know"
      rows={6}
      className="text-base lg:text-lg rounded-2xl resize-none lg:p-4"
      autoFocus
    />
  );
}

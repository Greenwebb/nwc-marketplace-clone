import { Input } from "@/components/ui/input";
import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

interface TextQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
}

const FIELD_CONFIG: Record<string, { field: keyof VendorOnboardingDraft; placeholder: string; type?: string }> = {
  "listing.item_title": { field: "itemTitle", placeholder: "e.g. Samsung Galaxy S24 Ultra 256GB" },
  "account.address": { field: "address", placeholder: "Enter your full address" },
  "verification.phone": { field: "phoneVerificationCode", placeholder: "Enter 6-digit code" },
};

export function TextQuestion({ questionId, formData, setField }: TextQuestionProps) {
  const config = FIELD_CONFIG[questionId];
  if (!config) return null;

  return (
    <Input
      value={formData[config.field] as string}
      onChange={(e) => setField(config.field, e.target.value as never)}
      placeholder={config.placeholder}
      type={config.type ?? "text"}
      className="h-12 lg:h-14 text-base lg:text-lg rounded-2xl"
      autoFocus
    />
  );
}

import { User, Building2, Banknote, Smartphone, Package, PackageCheck, PackageX } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

interface CardOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface CardSelectQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
}

const CARD_CONFIG: Record<string, { field: keyof VendorOnboardingDraft; options: CardOption[] }> = {
  "listing.condition": {
    field: "itemCondition",
    options: [
      { value: "new", label: "New", description: "Brand new, unused, and in original packaging", icon: PackageCheck },
      { value: "used", label: "Used", description: "Previously owned, in working condition", icon: Package },
      { value: "for_parts", label: "For parts or not working", description: "May not function as intended", icon: PackageX },
    ],
  },
  "account.type": {
    field: "accountType",
    options: [
      { value: "personal", label: "Personal", description: "Sell as an individual", icon: User },
      { value: "business", label: "Business", description: "Sell as a registered business", icon: Building2 },
    ],
  },
  "verification.payout_method": {
    field: "payoutMethod",
    options: [
      { value: "bank", label: "Bank Account", description: "Receive payments to your bank account", icon: Banknote },
      { value: "mobile_money", label: "Mobile Money", description: "Receive payments via mobile money", icon: Smartphone },
    ],
  },
};

export function CardSelectQuestion({ questionId, formData, setField }: CardSelectQuestionProps) {
  const config = CARD_CONFIG[questionId];
  if (!config) return null;

  const currentValue = formData[config.field] as string;

  return (
    <div className="space-y-3">
      {config.options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = currentValue === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setField(config.field, opt.value as never)}
            className={`w-full flex items-start gap-4 rounded-2xl border-2 p-4 lg:p-5 text-left transition-all ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-primary lg:text-lg">{opt.label}</p>
              <p className="text-sm lg:text-base text-gray-500 mt-0.5">{opt.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

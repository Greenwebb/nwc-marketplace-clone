import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

interface ReviewQuestionProps {
  formData: VendorOnboardingDraft;
  checkpoint: "needs_auth" | "needs_upgrade" | "ready_to_complete";
}

export function ReviewQuestion({ formData, checkpoint }: ReviewQuestionProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 divide-y divide-gray-100">
        <ReviewRow label="Item" value={formData.itemTitle || "Draft in progress"} />
        <ReviewRow label="Category" value={formData.itemCategory.length > 0 ? formData.itemCategory.join(", ") : "—"} />
        <ReviewRow label="Condition" value={formData.itemCondition || "—"} />
        <ReviewRow
          label="Price"
          value={formData.priceZMW ? `ZMW ${formData.priceZMW}` : "—"}
        />
        <ReviewRow label="Photos" value={`${formData.photos.length} photo(s)`} />
        <ReviewRow
          label="Account"
          value={formData.accountType === "business" ? "Business" : "Personal"}
        />
        <ReviewRow
          label="Payout"
          value={formData.payoutMethod === "bank" ? "Bank Account" : "Mobile Money"}
        />
      </div>

      {checkpoint === "needs_auth" && (
        <p className="text-sm text-amber-700 bg-amber-50 rounded-xl p-3">
          Sign in is required to complete onboarding.
        </p>
      )}
      {checkpoint === "needs_upgrade" && (
        <p className="text-sm text-blue-700 bg-blue-50 rounded-xl p-3">
          Your account will be upgraded to vendor on submit.
        </p>
      )}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
      <span className="text-sm lg:text-base text-gray-500">{label}</span>
      <span className="text-sm lg:text-base font-medium text-primary">{value}</span>
    </div>
  );
}

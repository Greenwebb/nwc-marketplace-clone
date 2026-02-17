import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileCheck } from "lucide-react";
import type { VendorOnboardingDraft, OnboardingFileMeta } from "@/types/vendorOnboarding";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function fileToMeta(file: File): OnboardingFileMeta {
  return { name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) };
}

interface CombinedQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
  setError: (error: string | null) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm lg:text-base font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}

function FileField({
  label,
  file,
  onPick,
}: {
  label: string;
  file: OnboardingFileMeta | null;
  onPick: (file: File) => void;
}) {
  return (
    <Field label={label}>
      <label className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:border-primary/50 transition-colors">
        {file ? (
          <>
            <FileCheck className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm text-primary truncate">{file.name}</span>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-gray-400 shrink-0" />
            <span className="text-sm text-gray-500">Click to upload</span>
          </>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
          }}
          className="hidden"
        />
      </label>
    </Field>
  );
}

export function CombinedQuestion({ questionId, formData, setField, setError }: CombinedQuestionProps) {
  const handleFilePick = (field: "nrcDocument" | "bankStatement") => (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, or PDF files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be 10MB or less.");
      return;
    }
    setError(null);
    setField(field, fileToMeta(file));
  };

  const inputClass = "h-11 lg:h-13 text-sm lg:text-base rounded-xl";

  switch (questionId) {
    case "listing.pricing":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Pricing Type">
            <Select
              value={formData.pricingType}
              onValueChange={(v) => setField("pricingType", v as VendorOnboardingDraft["pricingType"])}
            >
              <SelectTrigger className={`w-full ${inputClass}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Price (ZMW)">
            <Input
              type="number"
              value={formData.priceZMW}
              onChange={(e) => setField("priceZMW", e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </Field>
        </div>
      );

    case "listing.shipping": {
      const CARRIER_OPTIONS = [
        { value: "newworld_cargo", label: "Newworld Cargo Logistics" },
        { value: "other", label: "Other" },
      ];
      const isKnownCarrier = CARRIER_OPTIONS.some(
        (o) => o.value === formData.shippingCarrier
      );
      const selectedCarrier = isKnownCarrier ? formData.shippingCarrier : formData.shippingCarrier ? "other" : "";

      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Delivery Method">
            <div className="grid grid-cols-2 gap-3">
              {CARRIER_OPTIONS.map((opt) => {
                const isActive = selectedCarrier === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      if (opt.value === "other") {
                        setField("shippingCarrier", "");
                      } else {
                        setField("shippingCarrier", opt.value);
                      }
                    }}
                    className={`rounded-xl border-2 px-4 py-3 lg:py-4 text-sm lg:text-base font-medium text-left transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Field>
          {selectedCarrier === "other" && (
            <Field label="Carrier Name">
              <Input
                value={formData.shippingCarrier}
                onChange={(e) => setField("shippingCarrier", e.target.value)}
                placeholder="e.g. DHL, PostNet, local courier"
                className={inputClass}
              />
            </Field>
          )}
          <Field label="Delivery Cost (ZMW)">
            <Input
              type="number"
              value={formData.shippingCost}
              onChange={(e) => setField("shippingCost", e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formData.localPickup}
              onChange={(e) => setField("localPickup", e.target.checked)}
              className="rounded"
            />
            Offer local pickup (optional)
          </label>
        </div>
      );
    }

    case "account.personal_details":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Full Legal Name">
            <Input
              value={formData.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              placeholder="As it appears on your NRC"
              className={inputClass}
            />
          </Field>
          <Field label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setField("dateOfBirth", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="NRC Number">
            <Input
              value={formData.nrcNumber}
              onChange={(e) => setField("nrcNumber", e.target.value)}
              placeholder="e.g. 123456/78/1"
              className={inputClass}
            />
          </Field>
        </div>
      );

    case "account.business_details":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Legal Business Name">
            <Input
              value={formData.legalBusinessName}
              onChange={(e) => setField("legalBusinessName", e.target.value)}
              placeholder="Your registered business name"
              className={inputClass}
            />
          </Field>
          <Field label="DBA (optional)">
            <Input
              value={formData.dba}
              onChange={(e) => setField("dba", e.target.value)}
              placeholder="Doing business as..."
              className={inputClass}
            />
          </Field>
          <Field label="Business Address">
            <Input
              value={formData.businessAddress}
              onChange={(e) => setField("businessAddress", e.target.value)}
              placeholder="Registered business address"
              className={inputClass}
            />
          </Field>
        </div>
      );

    case "account.contact":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Phone Number">
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setField("phoneNumber", e.target.value)}
              placeholder="+260 97X XXX XXX"
              className={inputClass}
            />
          </Field>
          <Field label="Email Address">
            <Input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => setField("emailAddress", e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setField("password", e.target.value)}
              placeholder="Create a secure password"
              className={inputClass}
            />
          </Field>
        </div>
      );

    case "verification.bank_details":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Account Holder Name">
            <Input
              value={formData.bankAccountHolderName}
              onChange={(e) => setField("bankAccountHolderName", e.target.value)}
              placeholder="Name on the account"
              className={inputClass}
            />
          </Field>
          <Field label="Bank Name">
            <Input
              value={formData.bankName}
              onChange={(e) => setField("bankName", e.target.value)}
              placeholder="e.g. Zanaco, Stanbic, FNB"
              className={inputClass}
            />
          </Field>
          <Field label="Branch Code">
            <Input
              value={formData.branchCode}
              onChange={(e) => setField("branchCode", e.target.value)}
              placeholder="Branch code"
              className={inputClass}
            />
          </Field>
          <Field label="Account Number">
            <Input
              value={formData.accountNumber}
              onChange={(e) => setField("accountNumber", e.target.value)}
              placeholder="Your account number"
              className={inputClass}
            />
          </Field>
          <FileField
            label="Bank Statement (less than 3 months)"
            file={formData.bankStatement}
            onPick={handleFilePick("bankStatement")}
          />
        </div>
      );

    case "verification.mobile_money_details":
      return (
        <div className="space-y-4 lg:space-y-5">
          <Field label="Mobile Money Provider">
            <Select
              value={formData.mobileMoneyProvider}
              onValueChange={(v) =>
                setField("mobileMoneyProvider", v as VendorOnboardingDraft["mobileMoneyProvider"])
              }
            >
              <SelectTrigger className={`w-full ${inputClass}`}>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="airtel_money">Airtel Money</SelectItem>
                <SelectItem value="mtn_mobile_money">MTN Mobile Money</SelectItem>
                <SelectItem value="zamtel_money">Zamtel Money</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Mobile Money Number">
            <Input
              value={formData.mobileMoneyNumber}
              onChange={(e) => setField("mobileMoneyNumber", e.target.value)}
              placeholder="+260 97X XXX XXX"
              className={inputClass}
            />
          </Field>
        </div>
      );

    default:
      return null;
  }
}

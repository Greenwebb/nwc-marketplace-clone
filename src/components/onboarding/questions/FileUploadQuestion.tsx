import { useState } from "react";
import { Upload, FileCheck, Loader2, X } from "lucide-react";
import type { VendorOnboardingDraft, OnboardingFileMeta } from "@/types/vendorOnboarding";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface FileUploadQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
  setError: (error: string | null) => void;
}

const FILE_CONFIG: Record<string, { field: "nrcDocument" | "bankStatement" }> = {
  "verification.nrc_upload": { field: "nrcDocument" },
};

function fileToMeta(file: File): OnboardingFileMeta {
  return { name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) };
}

export function FileUploadQuestion({ questionId, formData, setField, setError }: FileUploadQuestionProps) {
  const config = FILE_CONFIG[questionId];
  const [uploading, setUploading] = useState(false);

  if (!config) return null;

  const currentFile = formData[config.field];

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, or PDF files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be 10MB or less.");
      return;
    }

    setError(null);
    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setField(config.field, fileToMeta(file));
    setUploading(false);
    e.target.value = "";
  };

  const handleRemove = () => {
    setField(config.field, null);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-6 lg:p-8 hover:border-primary/50 transition-colors">
      {uploading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <span className="text-sm text-gray-500">Uploading...</span>
        </div>
      ) : currentFile ? (
        <div className="flex items-center gap-4">
          {currentFile.type.startsWith("image/") ? (
            <div className="h-16 w-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
              <img src={currentFile.url} alt={currentFile.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-xl border border-gray-200 bg-gray-50 shrink-0 flex items-center justify-center">
              <FileCheck className="h-7 w-7 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">{currentFile.name}</p>
            <label className="text-xs text-gray-500 hover:text-primary cursor-pointer transition-colors">
              Click to replace
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-3 cursor-pointer py-4">
          <Upload className="h-10 w-10 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Click to upload</span>
          <span className="text-xs text-gray-500">JPEG, PNG, or PDF up to 10MB</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

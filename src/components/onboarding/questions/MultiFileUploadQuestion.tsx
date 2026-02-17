import { useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import type { VendorOnboardingDraft, OnboardingFileMeta } from "@/types/vendorOnboarding";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface MultiFileUploadQuestionProps {
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
  setError: (error: string | null) => void;
}

function fileToMeta(file: File): OnboardingFileMeta {
  return { name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) };
}

export function MultiFileUploadQuestion({ formData, setField, setError }: MultiFileUploadQuestionProps) {
  const photos = formData.photos;
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError(`${file.name}: Only JPEG, PNG, or PDF files are allowed.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name}: File must be 10MB or less.`);
        return;
      }
    }

    setError(null);
    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const incoming: OnboardingFileMeta[] = files.map(fileToMeta);
    setField("photos", [...photos, ...incoming]);
    setUploading(false);

    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setField("photos", photos.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-4 lg:p-6 hover:border-primary/50 transition-colors">
      {/* Photo grid + upload trigger in one unified section */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {photos.map((photo, idx) => (
          <div key={photo.url} className="relative aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
            {photo.type.startsWith("image/") ? (
              <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <button
              type="button"
              onClick={() => removePhoto(idx)}
              className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        ))}

        {/* Uploading placeholder */}
        {uploading && (
          <div className="aspect-square rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        )}

        {/* Add more button (always visible) */}
        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
          <Upload className="h-6 w-6 text-gray-400" />
          <span className="text-xs text-gray-500 text-center px-1">
            {photos.length > 0 ? "Add more" : "Upload"}
          </span>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-400 text-center mt-3">
        JPEG, PNG, or PDF up to 10MB each
      </p>
    </div>
  );
}

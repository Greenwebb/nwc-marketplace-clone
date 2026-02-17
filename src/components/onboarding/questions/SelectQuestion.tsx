import { useState } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

interface SelectQuestionProps {
  questionId: string;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
}

const CATEGORY_OPTIONS = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing & Accessories" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "automotive", label: "Automotive" },
  { value: "books", label: "Books & Media" },
  { value: "health", label: "Health & Beauty" },
  { value: "other", label: "Other" },
];

export function SelectQuestion({ questionId, formData, setField }: SelectQuestionProps) {
  const [search, setSearch] = useState("");

  if (questionId !== "listing.category") return null;

  const raw = formData.itemCategory;
  const selected: string[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      setField("itemCategory", selected.filter((v) => v !== value));
    } else {
      setField("itemCategory", [...selected, value]);
    }
  };

  const remove = (value: string) => {
    setField("itemCategory", selected.filter((v) => v !== value));
  };

  return (
    <div className="w-full space-y-3 text-left">
      {/* Selected badges */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((val) => {
            const opt = CATEGORY_OPTIONS.find((o) => o.value === val);
            return (
              <Badge
                key={val}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-sm rounded-full"
              >
                {opt?.label ?? val}
                <button
                  type="button"
                  onClick={() => remove(val)}
                  className="ml-0.5 hover:text-destructive transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Searchable list */}
      <Command className="border border-gray-200 rounded-2xl" shouldFilter={true}>
        <CommandInput
          placeholder="Search categories..."
          value={search}
          onValueChange={setSearch}
          className="lg:text-base"
        />
        <CommandList>
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandGroup>
            {CATEGORY_OPTIONS.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => toggle(opt.value)}
                  className="cursor-pointer py-2.5 lg:py-3 lg:text-base"
                >
                  <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border ${
                    isSelected
                      ? "bg-primary border-primary text-white"
                      : "border-gray-300"
                  }`}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  {opt.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

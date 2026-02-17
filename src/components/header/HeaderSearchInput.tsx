import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type HeaderSearchInputProps = {
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  mobile?: boolean;
};

export function HeaderSearchInput({ onFocus, onBlur, isFocused = false, mobile = false }: HeaderSearchInputProps) {
  if (mobile) {
    return (
      <div className="relative mt-3 w-full overflow-hidden rounded-2xl bg-white">
        <Input
          type="text"
          placeholder="Search for anything"
          className="border-0 bg-transparent pr-12 text-base text-primary placeholder:text-[#6f7784] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button className="absolute right-0 top-0 flex h-full items-center px-4 text-[#707783] transition-colors hover:text-primary">
          <Search className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-[360px] flex-1 max-w-[760px]">
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-white transition-all ${
          isFocused ? "ring-2 ring-white/45" : ""
        }`}
      >
        <Input
          type="text"
          placeholder="Search for anything"
          className="border-0 bg-transparent pr-14 text-lg text-primary placeholder:text-[#6f7784] focus-visible:ring-0 focus-visible:ring-offset-0"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button className="absolute right-0 top-0 flex h-full items-center px-5 text-[#707783] transition-colors hover:text-primary">
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

import { ChevronDown, Grid3X3 } from "lucide-react";
import { RefObject } from "react";
import { Link } from "wouter";
import { HeaderCategory } from "./headerData";

type CategoryDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  categories: HeaderCategory[];
  containerRef: RefObject<HTMLDivElement | null>;
};

export function CategoryDropdown({
  isOpen,
  onToggle,
  onClose,
  categories,
  containerRef,
}: CategoryDropdownProps) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="group flex h-[48px] items-center gap-2 border-b border-white/30 px-1 text-white transition-colors hover:border-white/70"
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="text-base font-semibold">Categories</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[300px] rounded-2xl border border-[#d8dee8] bg-white py-2 shadow-xl">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/shop?category=${category.slug}`}>
                <a
                  className="group flex items-center gap-3 px-5 py-3 text-[15px] text-primary transition-colors hover:bg-[#eef3fa]"
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5 text-primary group-hover:text-[#172a9c]" strokeWidth={1.5} />
                  <span className="flex-1">{category.name}</span>
                  {category.hasSubmenu && <ChevronDown className="h-4 w-4 -rotate-90 text-primary" />}
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

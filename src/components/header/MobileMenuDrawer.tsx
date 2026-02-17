import { ChevronDown, Heart, User } from "lucide-react";
import { Link } from "@/lib/router";
import { HeaderCategory } from "./headerData";

type MobileMenuDrawerProps = {
  isOpen: boolean;
  categories: HeaderCategory[];
  onClose: () => void;
  onOpenAccount: () => void;
};

export function MobileMenuDrawer({
  isOpen,
  categories,
  onClose,
  onOpenAccount,
}: MobileMenuDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 top-[132px] z-40 overflow-y-auto bg-white min-[1020px]:top-[80px] min-[1020px]:hidden">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-primary">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link key={category.slug} href={`/shop?category=${category.slug}`}>
              <a
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
                onClick={onClose}
              >
                <span>{category.name}</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </a>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6">
          <button
            onClick={onOpenAccount}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
          >
            <User className="h-5 w-5" />
            <span>My Account</span>
          </button>
          <Link href="/wishlist">
            <a
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
              onClick={onClose}
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}


import { HelpCircle, Heart, Package, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@/lib/router";

type AccountDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AccountDrawer({ isOpen, onClose }: AccountDrawerProps) {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      return;
    }

    const timeout = setTimeout(() => setIsRendered(false), 300);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-full w-[480px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-[#dadfe3] p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-primary">Account</h2>
          </div>
          <button onClick={onClose} className="rounded-2xl p-2 transition-colors hover:bg-[#fff]">
            <X className="h-5 w-5 text-primary" />
          </button>
        </div>

        <div className="p-8 pt-2">
          <nav className="space-y-1">
            <Link href="/auth/login">
              <a
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
                onClick={onClose}
              >
                <User className="h-5 w-5 text-primary group-hover:text-[#172a9c]" />
                <span className="text-[15px]">Account Login</span>
              </a>
            </Link>

            <Link href="/wishlist">
              <a
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
                onClick={onClose}
              >
                <Heart className="h-5 w-5 text-primary group-hover:text-[#172a9c]" />
                <span className="text-[15px]">Wishlist</span>
              </a>
            </Link>

            <Link href="/track-order">
              <a
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
                onClick={onClose}
              >
                <Package className="h-5 w-5 text-primary group-hover:text-[#172a9c]" />
                <span className="text-[15px]">Track Order</span>
              </a>
            </Link>

            <Link href="/help-center">
              <a
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-primary transition-colors hover:bg-[#fff]"
                onClick={onClose}
              >
                <HelpCircle className="h-5 w-5 text-primary group-hover:text-[#172a9c]" />
                <span className="text-[15px]">Help Center</span>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}


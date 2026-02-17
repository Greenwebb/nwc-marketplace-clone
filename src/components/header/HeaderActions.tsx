import { Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "@/lib/router";
import { useAuth } from "@/hooks/useAuth";

type HeaderActionsProps = {
  cartCount: number;
  onOpenAccount: () => void;
  onOpenCart: () => void;
};

export function HeaderActions({ cartCount, onOpenAccount, onOpenCart }: HeaderActionsProps) {
  const { isAuthenticated, effectiveRole } = useAuth();
  const dashboardHref = effectiveRole === "vendor" ? "/vendor/dashboard" : "/dashboard";

  return (
    <div className="flex items-center gap-4">
      <button className="hidden items-center gap-2 px-2 py-1.5 text-white transition-colors hover:bg-white/10 xl:flex">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[11px] font-semibold">
          ZM
        </span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[12px] text-white/70">Region</span>
          <span className="text-[16px] font-semibold">ZMW</span>
        </div>
      </button>

      {isAuthenticated ? (
        <Link href={dashboardHref}>
          <a className="hidden items-center gap-2 px-2 py-1.5 text-white transition-colors hover:bg-white/10 min-[1180px]:flex">
            <User className="h-5 w-5" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[12px] text-white/70">Welcome</span>
              <span className="text-[16px] font-semibold">Dashboard</span>
            </div>
          </a>
        </Link>
      ) : (
        <button
          onClick={onOpenAccount}
          className="hidden items-center gap-2 px-2 py-1.5 text-white transition-colors hover:bg-white/10 min-[1180px]:flex"
        >
          <User className="h-5 w-5" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[12px] text-white/70">Welcome</span>
            <span className="text-[16px] font-semibold">Sign in / Register</span>
          </div>
        </button>
      )}

      <Link href="/wishlist">
        <a className="rounded-2xl p-2 text-white transition-colors hover:bg-white/10">
          <Heart className="h-6 w-6" />
        </a>
      </Link>

      <button
        onClick={onOpenCart}
        className="relative rounded-2xl p-2 text-white transition-colors hover:bg-white/10"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e31b63] text-[11px] font-semibold text-white">
          {cartCount}
        </span>
      </button>
    </div>
  );
}


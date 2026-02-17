import { Link } from "@/lib/router";

type BrandLogoProps = {
  mobile?: boolean;
};

export function BrandLogo({ mobile = false }: BrandLogoProps) {
  if (mobile) {
    return (
      <Link href="/">
        <a className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className="text-[34px] font-bold tracking-tight text-white">
              New<span className="text-secondary">world</span>
            </span>
          </div>
          <span className="text-[10px] tracking-wide text-white/75">Marketplace</span>
        </a>
      </Link>
    );
  }

  return (
    <Link href="/">
      <a className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="text-3xl font-bold tracking-tight text-white">
            New<span>world</span>
          </span>
          <div className="mb-2 flex gap-0.5">
            <span className="h-2 w-2 rounded-full bg-secondary" />
          </div>
        </div>
        <span className="text-[11px] tracking-wide text-white/75">Marketplace</span>
      </a>
    </Link>
  );
}


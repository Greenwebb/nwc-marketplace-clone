import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";

interface FeaturedBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  image: string;
  bgColor?: string;
  variant?: "left" | "right";
  showDots?: boolean;
  activeDot?: number;
  totalDots?: number;
}

export default function FeaturedBanner({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  image,
  bgColor = "#FFFFFF",
  variant = "left",
  showDots = false,
  activeDot = 0,
  totalDots = 2,
}: FeaturedBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl  border border-gray-200 h-[300px] md:h-[350px]"
      style={{ backgroundColor: bgColor }}
    >
      <div className={`h-full flex ${variant === "right" ? "flex-row-reverse" : "flex-row"}`}>
        {/* Content Side */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-10">
          {/* Badge */}
          <span className="inline-block text-xs font-bold text-[#11248F] tracking-[0.15em] uppercase mb-3">
            {badge}
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-[28px] font-extrabold text-primary leading-tight mb-2">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[#7C818B] mb-6">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link href={primaryButton.href}>
              <Button
                asChild
                size="default"
                className="h-[44px] rounded-2xl bg-primary px-6 text-sm font-semibold hover:bg-primary/90"
              >
                <a>{primaryButton.text}</a>
              </Button>
            </Link>
            {secondaryButton && (
              <Link href={secondaryButton.href}>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto px-0 pb-0.5 text-sm font-medium text-primary no-underline border-b border-[#1D2128] rounded-2xl hover:text-primary hover:border-primary hover:no-underline"
                >
                  <a>{secondaryButton.text}</a>
                </Button>
              </Link>
            )}
          </div>

          {/* Dot indicators */}
          {showDots && (
            <div className="flex items-center gap-2 mt-6">
              {Array.from({ length: totalDots }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeDot ? "bg-[#1D2128]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Image Side */}
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}


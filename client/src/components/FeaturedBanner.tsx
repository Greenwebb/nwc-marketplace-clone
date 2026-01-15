import { Link } from "wouter";

interface FeaturedBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  image: string;
  bgColor?: string;
  variant?: "left" | "right";
}

export default function FeaturedBanner({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  image,
  bgColor = "#E8F4FD",
  variant = "left",
}: FeaturedBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-sm h-[300px] md:h-[350px]"
      style={{ backgroundColor: bgColor }}
    >
      <div className={`h-full flex ${variant === "right" ? "flex-row-reverse" : "flex-row"}`}>
        {/* Content Side */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-8">
          {/* Badge */}
          <span className="inline-block text-xs font-medium text-[#11248F] tracking-wider uppercase mb-3">
            {badge}
          </span>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-[#1D2128] leading-tight mb-2 whitespace-pre-line">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[#7C818B] mb-6">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href={primaryButton.href}>
              <a className="inline-flex items-center justify-center h-[42px] px-5 bg-[#11248F] text-white text-sm font-medium rounded-sm hover:bg-[#0d1c6e] transition-colors">
                {primaryButton.text}
              </a>
            </Link>
            {secondaryButton && (
              <Link href={secondaryButton.href}>
                <a className="inline-flex items-center justify-center h-[42px] px-5 text-[#1D2128] text-sm font-medium border-b border-[#1D2128] hover:text-[#11248F] hover:border-[#11248F] transition-colors">
                  {secondaryButton.text}
                </a>
              </Link>
            )}
          </div>
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

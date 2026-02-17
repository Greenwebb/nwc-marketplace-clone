import { HeaderBenefit } from "./headerData";

type HeaderBenefitsStripProps = {
  benefits: HeaderBenefit[];
  isMobile: boolean;
};

export function HeaderBenefitsStrip({ benefits, isMobile }: HeaderBenefitsStripProps) {
  return (
    <div className="bg-[#d6e4f7]">
      <div className="container">
        {isMobile ? (
          <div className="benefits-marquee">
            <div className="benefits-marquee-track">
              {[0, 1].map((segment) => (
                <div key={segment} className="benefits-marquee-segment" aria-hidden={segment === 1}>
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={`${segment}-${index}`} className="flex items-center gap-2 whitespace-nowrap pr-10">
                        <Icon className="h-5 w-5 text-[#173089]" />
                        <span className="text-sm font-normal text-[#173089]">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 py-3 text-base text-[#173089]">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                  <Icon className="h-5 w-5 text-[#173089]" />
                  <span className="text-xs">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

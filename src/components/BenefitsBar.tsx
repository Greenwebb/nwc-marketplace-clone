import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Worldwide Delivery",
    description: "20% off for new customers",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "We use secure payment methods",
  },
  {
    icon: RotateCcw,
    title: "60-day Return Policy",
    description: "Return money within 60 days",
  },
  {
    icon: Headphones,
    title: "24/7 Help Center",
    description: "We're available 24/7",
  },
];

export default function BenefitsBar() {
  return (
    <section className="py-8 md:py-12 bg-[#F5F5F7]">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#11248F]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#7C818B]">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

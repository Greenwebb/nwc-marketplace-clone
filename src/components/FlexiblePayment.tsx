import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";

export default function FlexiblePayment() {
  return (
    <section  style={{ height:"220px",backgroundImage: "url('/flexiblepayment.bg.webp')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX:"35%" }} className="py-12 container md:py-16 rounded-full relative overflow-hidden">
   

      <div className="relative z-10">
        <div className="text-center mx-auto">
          <p className="text-xs font-semibold text-[#11248F] uppercase tracking-wider mb-1">
            FLEXIBLE PAYMENT
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-5">
            Shop now, Get Delivered, Instantly
          </h2>
          <Link href="/shop">
            <Button asChild variant="link" className="text-sm font-medium px-0">
              <a>
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}


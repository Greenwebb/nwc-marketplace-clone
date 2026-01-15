import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface Offer {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  image: string;
  link: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Free $50 gift card with Xbox Series X pre-order",
    badge: "FREE GIFT",
    badgeColor: "bg-[#11248F]",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    link: "/shop",
  },
  {
    id: "2",
    title: "Save up to $200 on Select Monitors",
    badge: "SAVE $200",
    badgeColor: "bg-[#11248F]",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    link: "/shop",
  },
  {
    id: "3",
    title: "Save 25% on select Galaxy Z Fold3",
    badge: "SAVE 25%",
    badgeColor: "bg-[#11248F]",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    link: "/shop",
  },
  {
    id: "4",
    title: "Shop great deals on MacBook, iPad, and more.",
    badge: "",
    badgeColor: "",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    link: "/shop",
  },
];

export default function FeaturedOffers() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D2128]">Our Featured Offers</h2>
          <Link href="/shop">
            <a className="text-sm text-[#11248F] hover:underline flex items-center gap-1">
              See All Offers
              <ChevronRight className="h-4 w-4" />
            </a>
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <Link key={offer.id} href={offer.link}>
              <a className="group block bg-[#F5F5F7] rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image Container */}
                <div className="relative aspect-square p-6">
                  {offer.badge && (
                    <span
                      className={`absolute top-4 left-4 ${offer.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {offer.badge}
                    </span>
                  )}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-4 bg-white">
                  <h3 className="text-sm font-medium text-[#1D2128] mb-3 line-clamp-2 min-h-[40px]">
                    {offer.title}
                  </h3>
                  <button className="w-full h-10 bg-[#11248F] text-white text-sm font-medium rounded-sm hover:bg-[#0d1c6e] transition-colors">
                    Shop Now
                  </button>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

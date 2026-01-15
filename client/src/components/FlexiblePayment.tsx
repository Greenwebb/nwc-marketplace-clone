import { Link } from "wouter";

export default function FlexiblePayment() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#E8EEF3] to-[#F5F7FA] relative overflow-hidden">
      {/* Decorative curved shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute left-0 top-0 w-64 h-64 opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#11248F"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.8,76.8C25.8,84.6,8.8,87.6,-7.2,87.2C-23.2,86.8,-38.4,82.9,-51.8,75.1C-65.2,67.3,-76.8,55.6,-83.6,41.4C-90.4,27.2,-92.4,10.6,-90.2,-5.2C-88,-21,-81.6,-36,-72.8,-49.4C-64,-62.8,-52.8,-74.6,-39.2,-82.2C-25.6,-89.8,-10.4,-93.2,3.6,-98.8C17.6,-104.4,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute right-0 bottom-0 w-96 h-96 opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#11248F"
            d="M41.3,-72.5C54.4,-66.3,66.6,-57.5,74.8,-45.4C83,-33.3,87.2,-18,88.1,-2.9C89,13.2,86.6,29.1,79.4,42.8C72.2,56.5,60.2,68,46.1,75.8C32,83.6,16,87.7,0.5,86.8C-15,85.9,-30,79.9,-43.8,71.9C-57.6,63.9,-70.2,53.9,-78.4,40.8C-86.6,27.7,-90.4,11.5,-89.2,-4.2C-88,-19.9,-81.8,-35.1,-72.4,-47.8C-63,-60.5,-50.4,-70.7,-36.8,-76.6C-23.2,-82.5,-8.6,-84.1,4.6,-91.3C17.8,-98.5,28.2,-78.7,41.3,-72.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-[#11248F] uppercase tracking-wider mb-3">
            FLEXIBLE PAYMENT
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1D2128] mb-4">
            Shop now, Pay later, No fees
          </h2>
          <Link href="/shop">
            <a className="inline-flex items-center text-sm font-medium text-[#11248F] hover:underline">
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
          </Link>
        </div>
      </div>
    </section>
  );
}

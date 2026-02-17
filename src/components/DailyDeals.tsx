import { useState, useEffect } from "react";
import { Link } from "@/lib/router";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DailyDeals() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 16, minutes: 15, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer for demo
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D8125D] to-[#FF6B6B] p-6 md:p-8">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white/5"></div>

      <div className="relative z-10">
        {/* Badge */}
        <span className="inline-block text-xs font-medium text-white/80 tracking-wider uppercase mb-2">
          DEAL OF THE DAYS
        </span>

        {/* Timer */}
        <div className="flex items-center gap-1 mb-4">
          <div className="bg-white rounded-2xl px-2 py-1">
            <span className="text-lg font-bold text-primary">{formatTime(timeLeft.hours)}</span>
          </div>
          <span className="text-white font-bold">:</span>
          <div className="bg-white rounded-2xl px-2 py-1">
            <span className="text-lg font-bold text-primary">{formatTime(timeLeft.minutes)}</span>
          </div>
          <span className="text-white font-bold">:</span>
          <div className="bg-white rounded-2xl px-2 py-1">
            <span className="text-lg font-bold text-primary">{formatTime(timeLeft.seconds)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Daily Deals
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-white/80 mb-6">
          Today's featured deals and top tech.
        </p>

        {/* CTA Button */}
        <Link href="/shop?sale=true">
          <a className="inline-flex items-center justify-center h-[46px] px-6 bg-white text-[#D8125D] text-sm font-medium rounded-2xl hover:bg-white/90 transition-colors">
            Shop Now
          </a>
        </Link>
      </div>
    </div>
  );
}


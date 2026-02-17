import { Button } from "@/components/ui/button";
import { Rocket, Award, Trophy, HelpCircle, MessageCircle, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              We hope you'll consider joining our rapidly growing team
            </h1>
            <p className="text-[#7C818B] mb-8">
              Take a look at these current vacancies, and get in touch if something catches your eye.
            </p>
            <Button className="bg-[#1D2128] hover:bg-primary text-white px-8 h-12">
              View Open Roles
            </Button>
          </div>

          {/* Right Team Photos Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-full overflow-hidden bg-[#4F6BF6]">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                  👨
                </div>
              </div>
              <div className="relative w-full aspect-square rounded-2xl  overflow-hidden bg-[#00BCD4]">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                  👩
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative w-full aspect-square rounded-2xl  overflow-hidden bg-[#FFA726]">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                  👩
                </div>
              </div>
              <div className="relative w-full aspect-square rounded-2xl  overflow-hidden bg-[#EF5350]">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                  👨
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-[#D4F1E8] py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary text-center mb-4">
            Get to know us
          </h2>
          <p className="text-[#7C818B] text-center mb-12">
            Where every day matters
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1D2128] text-white p-8 text-center">
              <div className="text-5xl font-bold mb-2">56</div>
              <div className="text-sm opacity-80">People</div>
            </div>
            <div className="bg-[#1D2128] text-white p-8 text-center">
              <div className="text-5xl font-bold mb-2">4</div>
              <div className="text-sm opacity-80">Countries</div>
            </div>
            <div className="bg-[#1D2128] text-white p-8 text-center">
              <div className="text-5xl font-bold mb-2">768</div>
              <div className="text-sm opacity-80">Donuts per day</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container py-20">
        <div className="text-center mb-16">
          <p className="text-sm text-[#7C818B] mb-2">Our values</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary max-w-3xl mx-auto">
            Our values are what make us unique, drive our company culture, and govern everything we do.
          </h2>
        </div>

        {/* Values Grid */}
        <div className="space-y-16">
          {/* Value 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                🤝
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-[#11248F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Make service your mission
                  </h3>
                  <p className="text-[#7C818B]">
                    Give the highest level of support to our partners and to one another.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-[#11248F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Strive for excellence
                  </h3>
                  <p className="text-[#7C818B]">
                    Don't settle for second best.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-[#11248F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Win Together
                  </h3>
                  <p className="text-[#7C818B]">
                    We stand on each other's shoulders, offer help, and focus on victories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Value 2 - Reversed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-[#11248F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Strive for excellence
                  </h3>
                  <p className="text-[#7C818B]">
                    Don't settle for second best.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-[#11248F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Win Together
                  </h3>
                  <p className="text-[#7C818B]">
                    We stand on each other's shoulders, offer help, and focus on victories.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 lg:order-2">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                💼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="bg-[#F5F5F7] py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Los Angeles */}
            <div className="text-center">
              <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  🌴
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Los Angeles</h3>
              <p className="text-sm text-[#7C818B]">
                1140 Main Street Los Angeles, CA 90291
                <br />
                United States
              </p>
            </div>

            {/* California */}
            <div className="text-center">
              <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-orange-200 to-orange-300 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  ☀️
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">California</h3>
              <p className="text-sm text-[#7C818B]">
                9000 California St #615 Omaha
                <br />
                United States
              </p>
            </div>

            {/* New York */}
            <div className="text-center">
              <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  🗽
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">New York</h3>
              <p className="text-sm text-[#7C818B]">
                111 Broadway 10011 New York
                <br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-[#7C818B] mb-2">Frequently asked questions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Find an answer by searching a question or keywords
          </h2>
          <Button className="bg-[#1D2128] hover:bg-primary text-white px-8 h-12">
            Go to FAQs
          </Button>
        </div>
      </div>

      {/* Bottom CTA Cards */}
      <div className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Us */}
          <div className="text-center p-8 border border-[#DADFE3] rounded-2xl  hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-[#11248F]" />
              </div>
            </div>
            <h3 className="font-semibold text-primary mb-2">
              Didn't find what you were looking for?
            </h3>
            <button className="text-[#11248F] font-medium hover:underline">
              Contact Us
            </button>
          </div>

          {/* Help Center */}
          <div className="text-center p-8 border border-[#DADFE3] rounded-2xl  hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-[#11248F]" />
              </div>
            </div>
            <h3 className="font-semibold text-primary mb-2">
              Have we can help you here?
            </h3>
            <button className="text-[#11248F] font-medium hover:underline">
              Help Center
            </button>
          </div>

          {/* Give Feedback */}
          <div className="text-center p-8 border border-[#DADFE3] rounded-2xl  hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-[#11248F]" />
              </div>
            </div>
            <h3 className="font-semibold text-primary mb-2">
              We'd love to hear what you think!
            </h3>
            <button className="text-[#11248F] font-medium hover:underline">
              Give Feedback
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

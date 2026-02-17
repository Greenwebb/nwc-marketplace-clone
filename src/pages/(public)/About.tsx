import { Button } from "@/components/ui/button";
import { Palette, ShoppingBag, TrendingUp, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const partners = [
    "dyson", "Intel", "cisco", "nvidia", "Lenovo", "bose",
    "apple", "brother", "LG", "SONY", "samsung", "Google"
  ];

  const timeline = [
    {
      year: "Founded in 2009",
      title: "The Beginning",
      description: "We started with a simple idea: to make great design accessible to everyone."
    },
    {
      year: "Expanded in 2015",
      title: "Growing Team",
      description: "Our team grew from 5 to 50 people, and we opened our first international office."
    },
    {
      year: "Went Public in 2020",
      title: "IPO Success",
      description: "We went public and raised $100M to expand our product line and reach."
    },
    {
      year: "Global Expansion 2023",
      title: "Worldwide Presence",
      description: "We now operate in 50+ countries with over 200 team members worldwide."
    }
  ];

  const team = [
    { name: "Thomas Moore", role: "Co-Founder & CEO", color: "bg-orange-200" },
    { name: "Oscar Burns", role: "Co-Founder & Managing Director", color: "bg-blue-200" },
    { name: "David Evans", role: "Development Manager", color: "bg-purple-400" },
    { name: "Jessica Smith", role: "Customer Service Manager", color: "bg-pink-200" }
  ];

  const investors = [
    { name: "Sarah Johnson", company: "Venture Capital", color: "bg-purple-300" },
    { name: "Mike Chen", company: "Tech Ventures", color: "bg-green-300" },
    { name: "Emily Davis", company: "Growth Partners", color: "bg-red-300" },
    { name: "Robert Hall", company: "Innovation Fund", color: "bg-blue-300" },
    { name: "Amanda Lee", company: "Future Investments", color: "bg-yellow-300" },
    { name: "James Wilson", company: "Capital Group", color: "bg-pink-300" },
    { name: "Jennifer Brown", company: "Equity Partners", color: "bg-green-400" },
    { name: "Tom Anderson", company: "Seed Fund", color: "bg-orange-300" },
    { name: "Rebecca Clark", company: "Angel Investors", color: "bg-cyan-300" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              We believe that great design should be available to everyone
            </h1>
          </div>
          <div className="relative w-full aspect-video rounded-2xl  overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🏢
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#FFF9E6] py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Good for people, good for the planet
              </h2>
            </div>
            <div className="space-y-4 text-[#7C818B]">
              <p>
                We're not here either to overwhelm people or completely wash over the climate crisis we're in. We want to give people the facts and help them make informed choices.
              </p>
              <p>
                Innovation and disruption happen when people come together to do what they love. We believe that the best products come from teams that are diverse, collaborative, and passionate about what they do.
              </p>
              <p>
                We're committed to sustainability, inclusion, and creating products that make a positive impact on the world. Our mission is to empower people to create spaces that reflect their values and aspirations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <p className="text-sm text-[#7C818B] mb-2">Trusted by</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            We work with the best partners
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 border border-[#DADFE3] rounded-2xl  hover:shadow-md transition-shadow"
            >
              <span className="text-lg font-semibold text-[#7C818B]">{partner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#F5F5F7] py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-[#7C818B] mb-2">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
              We give you the power to create spaces that are right for you
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <Palette className="h-8 w-8 text-[#11248F]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Choose a Theme</h3>
              <p className="text-[#7C818B]">
                Download the design of your choice from our marketplace and customize it to match your brand.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-[#11248F]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Add products</h3>
              <p className="text-[#7C818B]">
                Add as many products as you like, set up your inventory, and start selling to customers worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-[#11248F]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Start Selling</h3>
              <p className="text-[#7C818B]">
                We provide marketing, analytics, and support to help you grow your business and reach more customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Timeline */}
      <div className="bg-[#D4F1E8] py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-[#7C818B] mb-2">Milestones</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Company History Timeline
            </h2>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#11248F] font-semibold mb-1">{item.year}</p>
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-[#7C818B]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <p className="text-sm text-[#7C818B] mb-2">Meet our team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Here is the team at the helm of the ship
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className={`w-32 h-32 rounded-full ${member.color} mx-auto mb-4 flex items-center justify-center text-4xl`}>
                👤
              </div>
              <h3 className="font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-sm text-[#7C818B]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investors Section */}
      <div className="bg-[#F5F5F7] py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-[#7C818B] mb-2">Our backers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              We're lucky to be supported by some of the best investors in the world
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {investors.map((investor, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 rounded-full ${investor.color} mx-auto mb-3 flex items-center justify-center text-2xl`}>
                  👤
                </div>
                <h4 className="font-semibold text-primary text-sm mb-1">{investor.name}</h4>
                <p className="text-xs text-[#7C818B]">{investor.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-[#7C818B] mb-2">Purchase Newworld Marketplace</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Purchase the Newworld Marketplace now and make everything easier
          </h2>
          <Button className="bg-[#1D2128] hover:bg-primary text-white px-8 h-12">
            Choose Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

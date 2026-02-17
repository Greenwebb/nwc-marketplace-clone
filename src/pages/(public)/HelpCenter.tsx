import { Search, ShoppingBag, User, RefreshCw, Plane, CreditCard, MessageCircle } from 'lucide-react';
import { Link } from "@/lib/router";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Input } from "@/components/ui/input";

export default function HelpCenter() {
  const faqCategories = [
    {
      title: 'Orders & Purchases',
      icon: ShoppingBag,
      links: [
        'Store pickup',
        'Cancel an order',
        'Track a package',
        'In-Store Consultation',
        'Shop with an expert'
      ]
    },
    {
      title: 'Account',
      icon: User,
      links: [
        'Manage payment methods',
        'Manage Your Rewards',
        'Manage your account',
        'Account Settings',
        'Help with password'
      ]
    },
    {
      title: 'Returns & Refunds',
      icon: RefreshCw,
      links: [
        'I would like to return my order',
        'What if my order is damaged?',
        'How do I cancel an order?',
        'I\'ve received a faulty/damaged item',
        'How will I be refunded?'
      ]
    },
    {
      title: 'Shipping & Tracking',
      icon: Plane,
      links: [
        'Buying with local pickup',
        'Saving through combined shipping',
        'Delivery date options for buyers',
        'Shipping rates for buyers',
        'Tracking your item'
      ]
    },
    {
      title: 'Fees & billing',
      icon: CreditCard,
      links: [
        'Refunds and Disputes',
        'Getting Paid',
        'Fees and Reporting',
        'Getting Started',
        'View More'
      ]
    },
    {
      title: 'Other',
      icon: MessageCircle,
      links: [
        'Trade-In',
        'Gift Cards',
        'Getting Receipt Copies',
        'In-Store Consultation',
        'View More'
      ]
    }
  ];

  const popularSections = [
    'Shop with an expert',
    'Help with password',
    'Tracking your item'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-[#A8E6CF] to-[#8FD9B6] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Our crew of superheroes are standing by for Help & Support!
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl  shadow-lg p-2 mb-6">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search help topics"
                  className="flex-1 border-0 text-base shadow-none focus-visible:ring-0"
                />
                <button className="bg-primary text-white p-3 rounded-2xl hover:bg-[#1E3A8A] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Popular Sections */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-gray-700">Popular sections:</span>
              {popularSections.map((section, index) => (
                <span key={index}>
                  <Link href="#" className="text-primary underline hover:text-primary transition-colors">
                    {section}
                  </Link>
                  {index < popularSections.length - 1 && <span className="text-gray-400 mx-1">,</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl  p-8 hover:shadow-lg transition-shadow"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  
                  {/* Category Title */}
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {category.title}
                  </h3>
                  
                  {/* FAQ Links */}
                  <ul className="space-y-3 mb-6">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href="#"
                          className="text-gray-600 hover:text-primary transition-colors text-sm"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  {/* View More Link */}
                  <Link
                    href="#"
                    className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    View More
                    <span>→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF4D6] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-600 mb-3">Still need help?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Get help with common questions or reach out to our support team.
            </h2>
            <Link href="/contact">
              <button className="bg-primary text-white px-8 py-4 rounded-2xl text-base font-medium hover:bg-gray-800 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


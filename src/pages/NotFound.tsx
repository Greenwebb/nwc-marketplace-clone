import { Package, MessageCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from "@/lib/router";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Sad Box Illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Package className="w-32 h-32 md:w-40 md:h-40 text-gray-800" strokeWidth={1.5} />
                {/* Sad face overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-7xl" style={{ marginTop: '-10px' }}>
                    <span className="text-gray-800">☹</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Whoops
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              We're sorry! This page is currently unavailable. Please try again later.
            </p>

            {/* Go to Homepage Button */}
            <Link href="/">
              <a>
                <Button
                  className="bg-primary hover:bg-gray-800 text-white px-8 py-6 text-base font-medium h-auto"
                >
                  Go to Homepage
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Help Center */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  How can we help you today?
                </p>
                <Link href="/help-center">
                  <a className="text-base font-medium text-primary hover:text-primary transition-colors underline">
                    Help Center
                  </a>
                </Link>
              </div>

              {/* Contact Us */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Didn't find what you were looking for?
                </p>
                <Link href="/contact">
                  <a className="text-base font-medium text-primary hover:text-primary transition-colors underline">
                    Contact Us
                  </a>
                </Link>
              </div>

              {/* Give Feedback */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  We'd love to hear what you think!
                </p>
                <Link href="/contact">
                  <a className="text-base font-medium text-primary hover:text-primary transition-colors underline">
                    Give Feedback
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


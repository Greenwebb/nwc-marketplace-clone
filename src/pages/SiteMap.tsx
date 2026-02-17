import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SiteMap() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary text-center">
            Site Map
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Navigate through our marketplace using the comprehensive site map below. Find all the important pages and sections of our website organized for your convenience.
            </p>

            <p className="text-base text-gray-700 leading-relaxed mb-8">
              Our marketplace offers a wide range of products across multiple categories including electronics, fashion, home goods, and more. Browse through our featured collections, check out new arrivals, or explore special deals and promotions. We're committed to providing you with the best online shopping experience.
            </p>

            <div className="mb-8">
              <ul className="space-y-3 list-disc list-inside text-base text-gray-700">
                <li>Browse our extensive product catalog organized by categories and subcategories</li>
                <li>Access your account dashboard to manage orders, wishlist, and personal information</li>
                <li>Track your orders in real-time from purchase to delivery</li>
                <li>Get help from our comprehensive FAQ section and customer support resources</li>
              </ul>
            </div>

            <p className="text-base text-gray-700 leading-relaxed mb-6">
              We continuously update our platform with new features and improvements to enhance your shopping experience. Our secure payment system ensures your transactions are safe, and our customer service team is always ready to assist you with any questions or concerns.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              Whether you're looking for the latest tech gadgets, trendy fashion items, or everyday essentials, our marketplace has everything you need. Start exploring today and discover why thousands of customers trust us for their online shopping needs.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

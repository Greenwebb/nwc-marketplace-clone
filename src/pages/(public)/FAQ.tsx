import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from "@/lib/router";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const categories: FAQCategory[] = [
    {
      id: 'orders',
      title: 'Orders & Purchases',
      items: [
        {
          question: 'Where is my order?',
          answer: 'You can track your order by logging into your account and viewing your order history. We\'ll also send you tracking information via email once your order ships.'
        },
        {
          question: 'How do I cancel or edit an order?',
          answer: 'You can cancel or edit your order within 24 hours of placing it by contacting our customer service team or accessing your order through your account dashboard.'
        },
        {
          question: 'Why was my order canceled?',
          answer: 'Orders may be canceled due to payment issues, stock availability, or verification requirements. We\'ll always notify you via email if your order is canceled.'
        },
        {
          question: 'I didn\'t receive all of my order?',
          answer: 'If you\'re missing items from your order, please contact our support team with your order number and we\'ll investigate and resolve the issue promptly.'
        },
        {
          question: 'What if there is a problem with my order?',
          answer: 'Contact our customer service team immediately if there\'s any issue with your order. We\'re here to help resolve any problems quickly.'
        },
        {
          question: 'How do I get a return label?',
          answer: 'Return labels can be generated from your account dashboard under order history, or you can request one from our customer service team.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email to reset your password.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Log into your account, go to Account Settings, and select "Change Password" to update your password.'
        },
        {
          question: 'How do I cancel my account?',
          answer: 'You can cancel your account at any time by contacting our support team or through your account settings page.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      items: [
        {
          question: 'Where is my refund?',
          answer: 'Refunds are typically processed within 5-10 business days after we receive your returned item. You\'ll receive an email confirmation once the refund is issued.'
        },
        {
          question: 'How do I return my order?',
          answer: 'To return an item, log into your account, go to order history, select the item you want to return, and follow the return instructions.'
        },
        {
          question: 'What is the return policy?',
          answer: 'We offer a 60-day return policy on most items. Items must be in original condition with tags attached. Some exclusions may apply.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Tracking',
      items: [
        {
          question: 'How will I see if I get free shipping?',
          answer: 'Free shipping is automatically applied at checkout when your order meets the minimum purchase requirement, which is displayed on our website.'
        },
        {
          question: 'How do I change my delivery address?',
          answer: 'You can change your delivery address within 24 hours of placing your order by contacting customer service or updating it in your account.'
        },
        {
          question: 'My order hasn\'t arrived yet. Where is it?',
          answer: 'Check your tracking information in your account or the email we sent. If your order is delayed beyond the estimated delivery date, please contact us.'
        },
        {
          question: 'Do you deliver to my postcode?',
          answer: 'We deliver to most locations. Enter your postcode at checkout to verify delivery availability in your area.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Fees & billing',
      items: [
        {
          question: 'How and when do I get paid?',
          answer: 'For sellers, payments are processed according to your payment schedule settings and typically arrive within 2-5 business days.'
        },
        {
          question: 'What are my payment options?',
          answer: 'We accept major credit cards, debit cards, PayPal, and other secure payment methods displayed at checkout.'
        }
      ]
    },
    {
      id: 'other',
      title: 'Other',
      items: [
        {
          question: 'Why did I receive a notification?',
          answer: 'We send notifications for order updates, shipping confirmations, and important account information. You can manage notification preferences in your account settings.'
        },
        {
          question: 'Where can I get more information?',
          answer: 'Visit our Help Center for comprehensive guides and information, or contact our customer service team for personalized assistance.'
        },
        {
          question: 'Where can I view store locations and hours?',
          answer: 'Store locations and hours are available on our Store Locator page. You can search by city or zip code to find stores near you.'
        },
        {
          question: 'What is the Seller Feedback Rating?',
          answer: 'The Seller Feedback Rating is a score based on customer reviews and ratings that helps buyers evaluate seller reliability and service quality.'
        }
      ]
    }
  ];

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0F0] to-[#FFE8E8] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Have questions?<br />We have answers!
            </h1>
            <p className="text-lg text-gray-700">
              Everything you need to know about the product and billing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Navigation - Desktop */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <nav className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => scrollToCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Mobile Category Tabs */}
              <div className="lg:hidden overflow-x-auto">
                <div className="flex gap-2 pb-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`px-4 py-2 rounded-2xl whitespace-nowrap transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-9">
                <div className="space-y-12">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      id={`category-${category.id}`}
                      className="scroll-mt-24"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                        {category.title}
                      </h2>
                      
                      <div className="space-y-4">
                        {category.items.map((item, index) => {
                          const key = `${category.id}-${index}`;
                          const isOpen = openItems[key];
                          
                          return (
                            <div
                              key={index}
                              className="border-2 border-[#A8E6CF] rounded-2xl  overflow-hidden"
                            >
                              <button
                                onClick={() => toggleItem(category.id, index)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                              >
                                <span className="text-base md:text-lg font-medium text-primary pr-4">
                                  {item.question}
                                </span>
                                {isOpen ? (
                                  <Minus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                ) : (
                                  <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                )}
                              </button>
                              
                              {isOpen && (
                                <div className="px-6 py-4 bg-white border-t border-gray-200">
                                  <p className="text-gray-700 leading-relaxed">
                                    {item.answer}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-br from-[#A8E6CF] to-[#8FD9B6] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-700 mb-3">How can we help you?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Our crew of superheroes are<br />standing by for<br />Help & Support!
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/help-center">
                <button className="bg-primary text-white px-8 py-3 rounded-2xl text-base font-medium hover:bg-gray-800 transition-colors">
                  Help Center
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white text-primary px-8 py-3 rounded-2xl text-base font-medium hover:bg-gray-100 transition-colors border border-gray-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


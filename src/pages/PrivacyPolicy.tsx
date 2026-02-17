import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalSidebar from '../components/LegalSidebar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary text-center">
            Legal
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <LegalSidebar activePage="privacy-policy" />

            {/* Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Privacy Policy
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Last Revised: September 16, 2022
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Our Privacy Policy
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    This Privacy Policy describes how we collect, use, and protect your personal information when you use our marketplace platform. We are committed to ensuring that your privacy is protected and that any information you provide is handled responsibly and in accordance with applicable data protection laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Information We Collect
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We collect information that you provide directly to us, including your name, email address, shipping address, payment information, and order history. We also automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, pages visited, and time spent on our site. This information helps us improve our services and provide you with a better shopping experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    How We Use Your Information
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, and improve our platform. We may also use your information to send you promotional emails about new products, special offers, or other information we think you may find interesting. You can opt out of these communications at any time by clicking the unsubscribe link in any email we send you.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Information Sharing
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, conducting our business, or servicing you, as long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Data Security
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems. All payment transactions are processed through secure payment gateways and are not stored or processed on our servers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Your Rights
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    You have the right to access, update, or delete your personal information at any time. You can do this by logging into your account or contacting us directly. You also have the right to object to certain processing of your data and to request that we restrict processing of your information in certain circumstances. If you have any questions about your privacy rights, please contact our customer support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

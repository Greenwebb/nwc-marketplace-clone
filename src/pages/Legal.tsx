import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalSidebar from '../components/LegalSidebar';

export default function Legal() {
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
            <LegalSidebar activePage="legal" />

            {/* Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Terms of use
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Last Revised: May 1, 2023
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Introduction
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Welcome to our marketplace platform. By accessing or using our website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    General
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to decompile or reverse engineer any software contained on our website, or remove any copyright or other proprietary notations from the materials.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Personal Information
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Liability
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    In no event shall our company or its suppliers be liable for any damages including, without limitation, damages for loss of data or profit, or due to business interruption arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Indemnity
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless our company, its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities and expenses relating to or arising out of your use of or inability to use the site or services, any user postings made by you, your violation of any terms of this agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations.
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

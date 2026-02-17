import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalSidebar from '../components/LegalSidebar';

export default function TermsOfUse() {
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
            <LegalSidebar activePage="terms-of-use" />

            {/* Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Terms of use
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Last Revised: May 11, 2023
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
                    Use License
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to decompile or reverse engineer any software contained on our website, or remove any copyright or other proprietary notations from the materials.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    User Accounts
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Prohibited Activities
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    You may not use our platform for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction including but not limited to copyright laws. You may not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Limitation of Liability
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    In no event shall our company or its suppliers be liable for any damages including, without limitation, damages for loss of data or profit, or due to business interruption arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Modifications
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We may revise these Terms of Use for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Use. We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
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

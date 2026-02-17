import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual tracking logic
    console.log('Tracking order:', { orderId, email });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Track Order
            </h1>
            <p className="text-base text-gray-600">
              To track your order please enter your Order ID in the box below and press the "Track" button. 
              This was given to you on your receipt and in the confirmation email you should have received.
            </p>
          </div>

          {/* Tracking Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleTrack} className="border-2 border-gray-200 rounded-2xl  p-8 md:p-10">
              <div className="space-y-6">
                {/* Order ID Field */}
                <div>
                  <Label htmlFor="orderId" className="text-base font-medium text-primary mb-2 block">
                    Order ID
                  </Label>
                  <Input
                    id="orderId"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Found in your order confirmation email."
                    className="h-12 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Billing Email Field */}
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-primary mb-2 block">
                    Billing email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email you used during checkout."
                    className="h-12 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Track Button */}
                <Button
                  type="submit"
                  className="w-full h-12 hover:bg-[#1E3A8A] text-white text-base font-medium"
                >
                  Track
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Call Section */}
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Call</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Call us from 8am to 12am ET.
                </p>
                <a
                  href="tel:1-866-237-8289"
                  className="text-base font-medium text-primary hover:text-[#1E3A8A] transition-colors"
                >
                  1-866-237-8289
                </a>
              </div>

              {/* Email Section */}
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Our response time is 1 to 3 business days.
                </p>
                <a
                  href="/contact"
                  className="text-base font-medium text-primary hover:text-[#1E3A8A] transition-colors"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Store, ShoppingBag } from 'lucide-react';
import { updateAuthUserRole } from '@/lib/mockAuth';
import { toast } from 'sonner';

interface RoleSelectionProps {
  onComplete: () => void;
}

export function RoleSelection({ onComplete }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'vendor' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleRoleSelect = async () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    try {
      setIsSaving(true);
      updateAuthUserRole(selectedRole);
      toast.success(`Welcome! You're now registered as a ${selectedRole}`);
      onComplete();
    } catch (error) {
      toast.error('Failed to update role. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Newworld Marketplace Marketplace</h1>
          <p className="text-gray-600">Choose how you'd like to use our platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Customer Card */}
          <Card
            className={`p-8 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === 'customer' 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:border-blue-300'
            }`}
            onClick={() => setSelectedRole('customer')}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                selectedRole === 'customer' ? 'bg-blue-500' : 'bg-blue-100'
              }`}>
                <ShoppingBag className={`w-8 h-8 ${
                  selectedRole === 'customer' ? 'text-white' : 'text-blue-600'
                }`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to buy</h3>
              <p className="text-gray-600 mb-4">
                Browse thousands of products from verified vendors, enjoy secure payments, and fast delivery.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Access to all marketplace products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Order tracking and history</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Wishlist and favorites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Secure payment methods</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Vendor Card */}
          <Card
            className={`p-8 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === 'vendor' 
                ? 'ring-2 ring-green-500 bg-green-50' 
                : 'hover:border-green-300'
            }`}
            onClick={() => setSelectedRole('vendor')}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                selectedRole === 'vendor' ? 'bg-green-500' : 'bg-green-100'
              }`}>
                <Store className={`w-8 h-8 ${
                  selectedRole === 'vendor' ? 'text-white' : 'text-green-600'
                }`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to sell</h3>
              <p className="text-gray-600 mb-4">
                Start your online store, reach thousands of customers, and grow your business with our platform.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Create and manage your store</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>List unlimited products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Order and inventory management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Sales analytics and reports</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={handleRoleSelect}
            disabled={!selectedRole || isSaving}
            size="lg"
            className="px-12"
          >
            {isSaving ? 'Setting up your account...' : 'Continue'}
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            You can change your role later in account settings
          </p>
        </div>
      </div>
    </div>
  );
}

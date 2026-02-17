import { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Check, 
  AlertCircle,
  Package,
  DollarSign,
  UserCheck,
  Image as ImageIcon,
  X,
  Info,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

// --- Types ---

type OnboardingData = {
  step1: {
    category: string;
    title: string;
    description: string;
    condition: string;
  };
  step2: {
    price: string;
    pricingType: "fixed" | "auction";
    shippingMethod: string;
    shippingCost: string;
  };
  step3: {
    images: string[];
    fullName: string;
    dateOfBirth: string;
    idNumber: string;
  };
};

// --- Initial State ---

const INITIAL_DATA: OnboardingData = {
  step1: {
    category: "",
    title: "",
    description: "",
    condition: "new",
  },
  step2: {
    price: "",
    pricingType: "fixed",
    shippingMethod: "standard",
    shippingCost: "0",
  },
  step3: {
    images: [],
    fullName: "",
    dateOfBirth: "",
    idNumber: "",
  },
};

// --- eBay Brand Colors ---
const EBAY_BLUE = "#0053a0";
const EBAY_RED = "#e53238";
const EBAY_YELLOW = "#f5af02";
const EBAY_GREEN = "#86b817";

export default function VendorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // --- Handlers ---

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Draft listing created successfully!");
      
      // Redirect to eBay authentication (mock)
      toast.info("Redirecting to eBay authentication...");
      setTimeout(() => {
        window.location.href = "https://ebay.com/auth/signup?draftId=ebay-zm-" + Math.random().toString(36).substr(2, 9);
      }, 1500);
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Validation ---

  const isStep1Valid = () => {
    const { category, title, description } = formData.step1;
    return category !== "" && title.length >= 10 && description.length >= 20;
  };

  const isStep2Valid = () => {
    const { price, shippingCost } = formData.step2;
    return price !== "" && !isNaN(Number(price)) && Number(price) > 0 && shippingCost !== "";
  };

  const isStep3Valid = () => {
    const { fullName, dateOfBirth, idNumber, images } = formData.step3;
    return fullName !== "" && dateOfBirth !== "" && idNumber !== "" && images.length > 0;
  };

  const isCurrentStepValid = () => {
    if (currentStep === 1) return isStep1Valid();
    if (currentStep === 2) return isStep2Valid();
    if (currentStep === 3) return isStep3Valid();
    return false;
  };

  // --- eBay Styled Components ---

  const ProgressStepper = () => {
    const steps = [
      { id: 1, label: "Item details" },
      { id: 2, label: "Pricing" },
      { id: 3, label: "Verification" }
    ];

    return (
      <div className="w-full py-8 px-4 bg-white border-b mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep > step.id 
                      ? "bg-black border-black text-white" 
                      : currentStep === step.id 
                        ? "bg-white border-black text-black font-bold" 
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className={`mt-2 text-xs font-medium ${currentStep === step.id ? "text-black" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const EBayButton = ({ children, variant = "primary", ...props }: any) => {
    const baseStyles = "rounded-full px-8 py-2.5 font-bold transition-all duration-200 text-sm";
    const variants: any = {
      primary: "bg-[#0053a0] hover:bg-[#004080] text-white disabled:opacity-50",
      secondary: "bg-white border-2 border-[#0053a0] text-[#0053a0] hover:bg-blue-50",
      tertiary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
      destructive: "bg-[#e53238] hover:bg-[#c42b30] text-white"
    };

    return (
      <Button className={`${baseStyles} ${variants[variant]}`} {...props}>
        {children}
      </Button>
    );
  };

  const EBayInput = ({ label, helper, error, ...props }: any) => (
    <div className="space-y-1.5">
      <Label className="text-sm font-bold text-gray-700">{label}</Label>
      <Input 
        className="rounded-2xl border-gray-300 focus:border-black focus:ring-0 transition-all h-11" 
        {...props} 
      />
      {helper && <p className="text-xs text-gray-500 flex items-center gap-1"><Info className="h-3 w-3" /> {helper}</p>}
      {error && <p className="text-xs text-[#e53238] flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {error}</p>}
    </div>
  );

  // --- Step Components ---

  const Step1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
        <Info className="h-5 w-5 text-[#0053a0] shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-bold">Selling in Zambia</p>
          <p>We'll help you set up your international seller account. Your items will be visible to millions of buyers worldwide.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Category</Label>
          <Select 
            value={formData.step1.category} 
            onValueChange={(val) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, category: val } }))}
          >
            <SelectTrigger className="h-11 rounded-2xl border-gray-300">
              <SelectValue placeholder="Select the best category for your item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
              <SelectItem value="fashion">Fashion & Accessories</SelectItem>
              <SelectItem value="home">Home, Garden & Tools</SelectItem>
              <SelectItem value="collectibles">Collectibles & Art</SelectItem>
              <SelectItem value="parts">Vehicle Parts & Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <EBayInput 
          label="Listing Title"
          placeholder="e.g. Apple iPhone 13 Pro Max - 256GB - Graphite - Unlocked"
          value={formData.step1.title}
          onChange={(e: any) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, title: e.target.value } }))}
          helper="Include key details like brand, model, and color. (Min 10 chars)"
        />

        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Description</Label>
          <Textarea 
            placeholder="Tell buyers about your item's features, condition, and what's included..." 
            className="min-h-[180px] rounded-2xl border-gray-300 focus:border-black focus:ring-0"
            value={formData.step1.description}
            onChange={(e) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, description: e.target.value } }))}
          />
          <p className="text-xs text-gray-500">Be as detailed as possible to avoid buyer questions. (Min 20 chars)</p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-bold text-gray-700">Condition</Label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "new", label: "New", desc: "Brand new, unused, unopened" },
              { id: "used", label: "Used", desc: "Previously owned, shows wear" },
              { id: "refurbished", label: "Refurbished", desc: "Professionally restored" }
            ].map((cond) => (
              <button
                key={cond.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, step1: { ...prev.step1, condition: cond.id } }))}
                className={`flex-1 min-w-[140px] p-4 rounded-xl border-2 text-left transition-all ${
                  formData.step1.condition === cond.id 
                    ? "border-black bg-gray-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-bold text-sm">{cond.label}</p>
                <p className="text-xs text-gray-500 mt-1">{cond.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <Label className="text-sm font-bold text-gray-700">Pricing Format</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setFormData(prev => ({ ...prev, step2: { ...prev.step2, pricingType: "fixed" } }))}
            className={`p-5 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
              formData.step2.pricingType === "fixed" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.step2.pricingType === "fixed" ? "border-black" : "border-gray-300"}`}>
              {formData.step2.pricingType === "fixed" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
            </div>
            <div>
              <p className="font-bold">Fixed Price</p>
              <p className="text-xs text-gray-500 mt-1">Buyers can purchase immediately at your set price.</p>
            </div>
          </button>
          <button 
            onClick={() => setFormData(prev => ({ ...prev, step2: { ...prev.step2, pricingType: "auction" } }))}
            className={`p-5 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
              formData.step2.pricingType === "auction" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.step2.pricingType === "auction" ? "border-black" : "border-gray-300"}`}>
              {formData.step2.pricingType === "auction" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
            </div>
            <div>
              <p className="font-bold">Auction</p>
              <p className="text-xs text-gray-500 mt-1">Let buyers bid. Highest bidder wins at the end.</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-1.5">
          <Label className="text-sm font-bold text-gray-700">Price (USD)</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="pl-8 h-11 rounded-2xl border-gray-300 focus:border-black focus:ring-0 font-bold text-lg"
              value={formData.step2.price}
              onChange={(e) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, price: e.target.value } }))}
            />
          </div>
          <p className="text-xs text-gray-500">Set a competitive price based on similar items.</p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-bold text-gray-700">Shipping Cost (USD)</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="pl-8 h-11 rounded-2xl border-gray-300 focus:border-black focus:ring-0 font-bold text-lg"
              value={formData.step2.shippingCost}
              onChange={(e) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, shippingCost: e.target.value } }))}
            />
          </div>
          <p className="text-xs text-gray-500">Enter 0 for Free Shipping (Recommended).</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold text-gray-700">International Shipping Method</Label>
        <Select 
          value={formData.step2.shippingMethod} 
          onValueChange={(val) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, shippingMethod: val } }))}
        >
          <SelectTrigger className="h-11 rounded-2xl border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard International Shipping (7-14 days)</SelectItem>
            <SelectItem value="expedited">Expedited International Shipping (3-5 days)</SelectItem>
            <SelectItem value="economy">Economy International Shipping (14-21 days)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const Step3 = () => {
    const addMockImage = () => {
      const mockImages = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
      ];
      const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
      setFormData(prev => ({ 
        ...prev, 
        step3: { ...prev.step3, images: [...prev.step3.images, randomImg] } 
      }));
    };

    const removeImage = (index: number) => {
      setFormData(prev => ({
        ...prev,
        step3: { ...prev.step3, images: prev.step3.images.filter((_, i) => i !== index) }
      }));
    };

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          <Label className="text-sm font-bold text-gray-700">Photos</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.step3.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border group">
                <img src={img} alt="Product" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {formData.step3.images.length < 8 && (
              <button 
                onClick={addMockImage}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-gray-50 transition-all"
              >
                <Camera className="h-6 w-6 text-gray-400" />
                <span className="text-xs font-bold text-gray-500">Add Photos</span>
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">Add up to 8 photos. High-quality photos help sell items faster.</p>
        </div>

        <div className="pt-6 border-t space-y-6">
          <div className="flex items-center gap-2 text-[#0053a0]">
            <UserCheck className="h-5 w-5" />
            <h3 className="font-bold">Seller Verification (Zambia)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EBayInput 
              label="Full Legal Name"
              placeholder="As shown on your ID"
              value={formData.step3.fullName}
              onChange={(e: any) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, fullName: e.target.value } }))}
            />
            <EBayInput 
              label="Date of Birth"
              type="date"
              value={formData.step3.dateOfBirth}
              onChange={(e: any) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, dateOfBirth: e.target.value } }))}
            />
            <div className="md:col-span-2">
              <EBayInput 
                label="National ID / Passport Number"
                placeholder="Enter your Zambian ID or Passport number"
                value={formData.step3.idNumber}
                onChange={(e: any) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, idNumber: e.target.value } }))}
                helper="This is required for KYC verification to receive payouts."
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-20">
      {/* eBay Header Mock */}
      <header className="bg-white border-b py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold tracking-tighter" style={{ color: EBAY_RED }}>e</span>
            <span className="text-2xl font-bold tracking-tighter" style={{ color: EBAY_BLUE }}>b</span>
            <span className="text-2xl font-bold tracking-tighter" style={{ color: EBAY_YELLOW }}>a</span>
            <span className="text-2xl font-bold tracking-tighter" style={{ color: EBAY_GREEN }}>y</span>
            <span className="ml-2 text-sm font-medium text-gray-500 self-end mb-1">Seller Onboarding</span>
          </div>
          <button className="text-sm font-bold text-[#0053a0] hover:underline">Save and exit</button>
        </div>
      </header>

      <ProgressStepper />

      <main className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentStep === 1 && "Tell us what you're selling"}
            {currentStep === 2 && "Set your price and shipping"}
            {currentStep === 3 && "Verify your identity"}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentStep === 1 && "Provide accurate details to help buyers find your item."}
            {currentStep === 2 && "Choose how you want to sell and how much it will cost."}
            {currentStep === 3 && "We need a few more details to set up your payouts in Zambia."}
          </p>
        </div>

        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-8 bg-white">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
          </CardContent>
          <CardFooter className="p-8 bg-gray-50 border-t flex justify-between items-center">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center gap-2 font-bold text-sm transition-colors ${
                currentStep === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            
            <EBayButton 
              onClick={handleNext}
              disabled={!isCurrentStepValid() || isSubmitting}
              className="min-w-[160px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                currentStep === totalSteps ? "List your item" : "Next"
              )}
            </EBayButton>
          </CardFooter>
        </Card>

        <div className="mt-8 flex items-center justify-center gap-8 text-[11px] text-gray-400 uppercase tracking-widest font-bold">
          <span>Secure Checkout</span>
          <span>•</span>
          <span>Global Shipping</span>
          <span>•</span>
          <span>Seller Protection</span>
        </div>
      </main>
    </div>
  );
}

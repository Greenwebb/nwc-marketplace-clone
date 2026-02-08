import { useState } from "react";
import { useLocation } from "wouter";
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
  X
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
import { Progress } from "@/components/ui/progress";
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

export default function VendorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

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

  // --- Step Components ---

  const Step1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={formData.step1.category} 
          onValueChange={(val) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, category: val } }))}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
            <SelectItem value="collectibles">Collectibles</SelectItem>
            <SelectItem value="parts">Auto Parts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Listing Title</Label>
        <Input 
          id="title" 
          placeholder="e.g. iPhone 13 Pro Max - 256GB - Graphite" 
          value={formData.step1.title}
          onChange={(e) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, title: e.target.value } }))}
        />
        <p className="text-xs text-muted-foreground">Minimum 10 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Describe your item in detail..." 
          className="min-h-[150px]"
          value={formData.step1.description}
          onChange={(e) => setFormData(prev => ({ ...prev, step1: { ...prev.step1, description: e.target.value } }))}
        />
        <p className="text-xs text-muted-foreground">Minimum 20 characters</p>
      </div>

      <div className="space-y-2">
        <Label>Condition</Label>
        <div className="flex gap-4">
          {["new", "used", "refurbished"].map((cond) => (
            <button
              key={cond}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, step1: { ...prev.step1, condition: cond } }))}
              className={`px-4 py-2 rounded-full border text-sm capitalize transition-colors ${
                formData.step1.condition === cond 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background hover:border-primary"
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Pricing Type</Label>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-all ${formData.step2.pricingType === "fixed" ? "border-primary ring-1 ring-primary" : ""}`}
            onClick={() => setFormData(prev => ({ ...prev, step2: { ...prev.step2, pricingType: "fixed" } }))}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-full ${formData.step2.pricingType === "fixed" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Fixed Price</p>
                <p className="text-xs text-muted-foreground">Buy It Now</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className={`cursor-pointer transition-all ${formData.step2.pricingType === "auction" ? "border-primary ring-1 ring-primary" : ""}`}
            onClick={() => setFormData(prev => ({ ...prev, step2: { ...prev.step2, pricingType: "auction" } }))}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-full ${formData.step2.pricingType === "auction" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Auction</p>
                <p className="text-xs text-muted-foreground">Highest bidder wins</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (USD)</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="price" 
            type="number" 
            placeholder="0.00" 
            className="pl-9"
            value={formData.step2.price}
            onChange={(e) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, price: e.target.value } }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Shipping Options</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingMethod" className="text-xs">Method</Label>
            <Select 
              value={formData.step2.shippingMethod} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, shippingMethod: val } }))}
            >
              <SelectTrigger id="shippingMethod">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard International Shipping</SelectItem>
                <SelectItem value="expedited">Expedited International Shipping</SelectItem>
                <SelectItem value="economy">Economy International Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingCost" className="text-xs">Cost (USD)</Label>
            <Input 
              id="shippingCost" 
              type="number" 
              placeholder="0.00" 
              value={formData.step2.shippingCost}
              onChange={(e) => setFormData(prev => ({ ...prev, step2: { ...prev.step2, shippingCost: e.target.value } }))}
            />
            <p className="text-[10px] text-muted-foreground">Enter 0 for Free Shipping</p>
          </div>
        </div>
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
      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Product Pictures</Label>
          <div className="grid grid-cols-3 gap-4">
            {formData.step3.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                <img src={img} alt="Product" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {formData.step3.images.length < 6 && (
              <button 
                onClick={addMockImage}
                className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Add Photo</span>
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Add at least 1 photo. Max 6.</p>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-primary">
            <UserCheck className="h-5 w-5" />
            <h3 className="font-semibold">Initial KYC</h3>
          </div>
          <p className="text-xs text-muted-foreground">We need a few details to verify your identity as a seller in Zambia.</p>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name</Label>
              <Input 
                id="fullName" 
                placeholder="As it appears on your ID" 
                value={formData.step3.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, fullName: e.target.value } }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  value={formData.step3.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, dateOfBirth: e.target.value } }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNum">ID / Passport Number</Label>
                <Input 
                  id="idNum" 
                  placeholder="Number" 
                  value={formData.step3.idNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, step3: { ...prev.step3, idNumber: e.target.value } }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg">
            <Package className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">eBay Zambia</h1>
          <p className="text-slate-500 mt-2">Seller Onboarding Wizard</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Step {currentStep} of {totalSteps}</p>
              <h2 className="text-xl font-bold text-slate-800">
                {currentStep === 1 && "Category & Product Info"}
                {currentStep === 2 && "Pricing & Shipping"}
                {currentStep === 3 && "Pictures & Initial KYC"}
              </h2>
            </div>
            <span className="text-sm font-medium text-slate-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Wizard Card */}
        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-8">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
          </CardContent>
          
          <CardFooter className="p-8 bg-slate-50/50 border-t flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isCurrentStepValid() || isSubmitting}
              className="min-w-[140px] gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === totalSteps ? "List it" : "Next Step"}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Help Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Need help? Contact eBay Zambia Support</span>
        </div>
      </div>
    </div>
  );
}

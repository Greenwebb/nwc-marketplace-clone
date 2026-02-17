import type { OnboardingQuestion, VendorOnboardingStep } from "@/types/vendorOnboarding";

export const MILESTONES: VendorOnboardingStep[] = [
  "listing",
  "account",
  "verification_payment",
  "seller_hub",
];

export const MILESTONE_LABELS: Record<VendorOnboardingStep, string> = {
  listing: "First Listing",
  account: "Account",
  verification_payment: "Verification",
  seller_hub: "Seller Hub",
};

export const QUESTIONS: OnboardingQuestion[] = [
  // ── Intro: First Listing ──
  {
    id: "listing.intro",
    milestone: "listing",
    heading: "Create your first listing",
    subtitle: "Tell buyers what you're selling, set your price, and add photos. It only takes a few minutes.",
    fields: [],
    inputType: "intro",
    validate: () => null,
  },
  // ── Milestone 1: First Listing ──
  {
    id: "listing.item_title",
    milestone: "listing",
    heading: "What are you selling?",
    subtitle: "Enter a title that describes your item",
    fields: ["itemTitle"],
    inputType: "text",
    validate: (d) => (!d.itemTitle.trim() ? "Item title is required." : null),
  },
  {
    id: "listing.category",
    milestone: "listing",
    heading: "Select a category",
    subtitle: "Choose one or more categories that fit your item",
    fields: ["itemCategory"],
    inputType: "select",
    validate: (d) => (d.itemCategory.length === 0 ? "At least one category is required." : null),
  },
  {
    id: "listing.condition",
    milestone: "listing",
    heading: "Select condition",
    subtitle: "Disclose the condition to set buyer expectations",
    fields: ["itemCondition"],
    inputType: "card-select",
    validate: (d) => (!d.itemCondition.trim() ? "Condition is required." : null),
  },
  {
    id: "listing.description",
    milestone: "listing",
    heading: "Describe your item",
    subtitle: "Help buyers know exactly what you're selling",
    fields: ["itemDescription"],
    inputType: "textarea",
    validate: (d) => (!d.itemDescription.trim() ? "Description is required." : null),
  },
  {
    id: "listing.photos",
    milestone: "listing",
    heading: "Add photos",
    subtitle: "Upload at least one photo of your item",
    fields: ["photos"],
    inputType: "file-upload-multi",
    validate: (d) => (d.photos.length === 0 ? "At least one photo is required." : null),
  },
  {
    id: "listing.pricing",
    milestone: "listing",
    heading: "Set your price",
    subtitle: "Choose a pricing type and enter the amount in ZMW",
    fields: ["pricingType", "priceZMW"],
    inputType: "combined",
    validate: (d) => {
      if (!d.priceZMW.trim()) return "Price is required.";
      if (Number(d.priceZMW) <= 0) return "Price must be greater than 0.";
      return null;
    },
  },
  {
    id: "listing.shipping",
    milestone: "listing",
    heading: "Delivery method",
    subtitle: "How will you deliver this item?",
    fields: ["shippingCarrier", "shippingCost", "localPickup"],
    inputType: "combined",
    validate: (d) => {
      if (!d.shippingCarrier.trim()) return "Delivery method is required.";
      if (!d.shippingCost.trim()) return "Delivery cost is required.";
      if (Number(d.shippingCost) < 0) return "Delivery cost cannot be negative.";
      return null;
    },
  },

  // ── Intro: Account ──
  {
    id: "account.intro",
    milestone: "account",
    heading: "Set up your account",
    subtitle: "We need a few details to verify your identity and keep your account secure.",
    fields: [],
    inputType: "intro",
    validate: () => null,
  },
  // ── Milestone 2: Account ──
  {
    id: "account.type",
    milestone: "account",
    heading: "Account type",
    subtitle: "How would you like to sell?",
    fields: ["accountType"],
    inputType: "card-select",
    validate: () => null,
  },
  {
    id: "account.personal_details",
    milestone: "account",
    heading: "Your personal details",
    subtitle: "We need this to verify your identity",
    fields: ["fullName", "dateOfBirth", "nrcNumber"],
    inputType: "combined",
    isVisible: (d) => d.accountType === "personal",
    validate: (d) => {
      if (!d.fullName.trim()) return "Full name is required.";
      if (!d.dateOfBirth) return "Date of birth is required.";
      if (!d.nrcNumber.trim()) return "NRC number is required.";
      return null;
    },
  },
  {
    id: "account.business_details",
    milestone: "account",
    heading: "Your business details",
    fields: ["legalBusinessName", "dba", "businessAddress"],
    inputType: "combined",
    isVisible: (d) => d.accountType === "business",
    validate: (d) => {
      if (!d.legalBusinessName.trim()) return "Legal business name is required.";
      if (!d.businessAddress.trim()) return "Business address is required.";
      return null;
    },
  },
  {
    id: "account.address",
    milestone: "account",
    heading: "Your address",
    subtitle: "Where are you located?",
    fields: ["address"],
    inputType: "address-map",
    validate: (d) => (!d.address.trim() ? "Address is required." : null),
  },
  {
    id: "account.contact",
    milestone: "account",
    heading: "Contact & security",
    subtitle: "We'll use these to reach you and secure your account",
    fields: ["phoneNumber", "emailAddress", "password"],
    inputType: "combined",
    validate: (d) => {
      if (!d.phoneNumber.trim()) return "Phone number is required.";
      if (!d.emailAddress.trim()) return "Email address is required.";
      if (!d.password.trim()) return "Password is required.";
      return null;
    },
  },

  // ── Intro: Verification & Payment ──
  {
    id: "verification.intro",
    milestone: "verification_payment",
    heading: "Verify & get paid",
    subtitle: "Verify your identity and set up your preferred payout method so you can start earning.",
    fields: [],
    inputType: "intro",
    validate: () => null,
  },
  // ── Milestone 3: Verification & Payment ──
  {
    id: "verification.phone",
    milestone: "verification_payment",
    heading: "Verify your phone",
    subtitle: "Enter the code sent to your phone number",
    fields: ["phoneVerificationCode"],
    inputType: "text",
    validate: (d) =>
      !d.phoneVerificationCode.trim() ? "Verification code is required." : null,
  },
  {
    id: "verification.nrc_upload",
    milestone: "verification_payment",
    heading: "Upload your NRC",
    subtitle: "Take a photo or upload a scan of your National Registration Card",
    fields: ["nrcDocument"],
    inputType: "file-upload",
    validate: (d) => (!d.nrcDocument ? "NRC document is required." : null),
  },
  {
    id: "verification.payout_method",
    milestone: "verification_payment",
    heading: "Choose payout method",
    subtitle: "How would you like to receive payments?",
    fields: ["payoutMethod"],
    inputType: "card-select",
    validate: () => null,
  },
  {
    id: "verification.bank_details",
    milestone: "verification_payment",
    heading: "Bank account details",
    subtitle: "We'll send your earnings to this account",
    fields: ["bankAccountHolderName", "bankName", "branchCode", "accountNumber", "bankStatement"],
    inputType: "combined",
    isVisible: (d) => d.payoutMethod === "bank",
    validate: (d) => {
      if (!d.bankAccountHolderName.trim()) return "Account holder name is required.";
      if (!d.bankName.trim()) return "Bank name is required.";
      if (!d.branchCode.trim()) return "Branch code is required.";
      if (!d.accountNumber.trim()) return "Account number is required.";
      if (!d.bankStatement) return "Bank statement is required.";
      return null;
    },
  },
  {
    id: "verification.mobile_money_details",
    milestone: "verification_payment",
    heading: "Mobile money details",
    subtitle: "We'll send your earnings to this number",
    fields: ["mobileMoneyProvider", "mobileMoneyNumber"],
    inputType: "combined",
    isVisible: (d) => d.payoutMethod === "mobile_money",
    validate: (d) => {
      if (!d.mobileMoneyProvider) return "Provider is required.";
      if (!d.mobileMoneyNumber.trim()) return "Mobile money number is required.";
      return null;
    },
  },

  // ── Milestone 4: Seller Hub ──
  {
    id: "seller_hub.review",
    milestone: "seller_hub",
    heading: "Review and submit",
    subtitle: "Your account, verification, payout details, and first listing are ready.",
    fields: [],
    inputType: "review",
    validate: () => null,
  },
];

export type AccountType = "personal" | "business";

export type PayoutMethod = "bank" | "mobile_money";

export type MobileMoneyProvider = "airtel_money" | "mtn_mobile_money" | "zamtel_money";

export type VendorOnboardingStep = "account" | "verification_payment" | "listing" | "seller_hub";

export type VendorOnboardingStatus = "not_started" | "in_progress" | "completed";

export type OnboardingFileMeta = {
  name: string;
  type: string;
  size: number;
  url: string;
};

export type OnboardingQuestionInputType =
  | "intro"
  | "text"
  | "select"
  | "card-select"
  | "textarea"
  | "file-upload"
  | "file-upload-multi"
  | "combined"
  | "address-map"
  | "review";

export type OnboardingQuestion = {
  id: string;
  milestone: VendorOnboardingStep;
  heading: string;
  subtitle?: string;
  fields: (keyof VendorOnboardingDraft)[];
  validate: (draft: VendorOnboardingDraft) => string | null;
  isVisible?: (draft: VendorOnboardingDraft) => boolean;
  inputType: OnboardingQuestionInputType;
};

export type VendorOnboardingDraft = {
  accountType: AccountType;
  fullName: string;
  address: string;
  dateOfBirth: string;
  nrcNumber: string;
  legalBusinessName: string;
  dba: string;
  businessAddress: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  phoneVerificationCode: string;
  nrcDocument: OnboardingFileMeta | null;
  payoutMethod: PayoutMethod;
  bankAccountHolderName: string;
  bankName: string;
  branchCode: string;
  accountNumber: string;
  bankStatement: OnboardingFileMeta | null;
  mobileMoneyProvider: MobileMoneyProvider | "";
  mobileMoneyNumber: string;
  itemTitle: string;
  itemCategory: string[];
  itemCondition: string;
  itemDescription: string;
  photos: OnboardingFileMeta[];
  priceZMW: string;
  pricingType: "fixed" | "auction";
  shippingCarrier: string;
  shippingCost: string;
  localPickup: boolean;
};

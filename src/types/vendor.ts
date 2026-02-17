export type VendorOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type VendorOrder = {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  amountZMW: number;
  status: VendorOrderStatus;
  timestamp: string;
  lastUpdated: string;
  quantity: number;
  deliveryMethod: "pickup" | "delivery";
  deliveryLocation: string;
  deliveryCostZMW: number;
};

export type VendorProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: "new" | "used";
  priceZMW: number;
  deliveryAvailable: boolean;
  deliveryCostZMW: number;
  image: string;
  active: boolean;
};

export type VendorSettingsSection =
  | "basic"
  | "payment"
  | "business"
  | "social"
  | "notifications"
  | "security";

export type VendorSettings = {
  basic: {
    storeName: string;
    supportEmail: string;
    supportPhone: string;
  };
  payment: {
    payoutMethod: "bank" | "mobile_money";
    accountName: string;
    accountNumber: string;
  };
  business: {
    legalBusinessName: string;
    taxId: string;
    businessAddress: string;
  };
  social: {
    facebook: string;
    instagram: string;
    website: string;
  };
  notifications: {
    newOrder: boolean;
    payout: boolean;
    marketing: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    loginAlerts: boolean;
  };
};


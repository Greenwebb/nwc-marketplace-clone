import type { VendorOrderStatus, VendorSettingsSection } from "@/types/vendor";

export const ORDER_STATUS_OPTIONS: VendorOrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export const ORDER_STATUS_LABELS: Record<VendorOrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const SETTINGS_SECTIONS: { key: VendorSettingsSection; label: string; description: string }[] = [
  { key: "basic", label: "Basic Info", description: "Store name and support contacts" },
  { key: "payment", label: "Payment", description: "Payout details" },
  { key: "business", label: "Business", description: "Legal business information" },
  { key: "social", label: "Social", description: "Social links and website" },
  { key: "notifications", label: "Notifications", description: "Delivery and payout alerts" },
  { key: "security", label: "Security", description: "Account security preferences" },
];


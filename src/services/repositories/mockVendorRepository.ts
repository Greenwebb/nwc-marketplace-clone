import { nanoid } from "nanoid";
import type { VendorRepository, VendorRequestContext } from "@/services/repositories/vendorRepository";
import type {
  VendorOrder,
  VendorOrderStatus,
  VendorProduct,
  VendorSettings,
  VendorSettingsSection,
} from "@/types/vendor";

const ORDERS_KEY = "nwc.vendor.v1.orders";
const PRODUCTS_KEY = "nwc.vendor.v1.products";
const SETTINGS_KEY = "nwc.vendor.v1.settings";

class AuthError extends Error {
  status: 401 | 403;

  constructor(status: 401 | 403, message: string) {
    super(message);
    this.status = status;
  }
}

const seedOrders = (): VendorOrder[] => [
  {
    id: "ord_1",
    orderNumber: "ORD-2AF92126",
    productName: "Website development",
    customerName: "George Munganga",
    customerPhone: "+260972827372",
    amountZMW: 50000,
    status: "pending",
    timestamp: "2026-02-17T10:30:00.000Z",
    lastUpdated: "2026-02-17T10:30:00.000Z",
    quantity: 1,
    deliveryMethod: "pickup",
    deliveryLocation: "Lusaka",
    deliveryCostZMW: 0,
  },
  {
    id: "ord_2",
    orderNumber: "ORD-3BC10111",
    productName: "Logo redesign",
    customerName: "Alice M.",
    customerPhone: "+260966000111",
    amountZMW: 18000,
    status: "processing",
    timestamp: "2026-02-16T14:20:00.000Z",
    lastUpdated: "2026-02-16T16:20:00.000Z",
    quantity: 1,
    deliveryMethod: "delivery",
    deliveryLocation: "Kabulonga",
    deliveryCostZMW: 250,
  },
];

const seedProducts = (): VendorProduct[] => [
  {
    id: "prd_1",
    name: "Website development",
    description: "Professional responsive website for small businesses.",
    category: "services",
    condition: "new",
    priceZMW: 50000,
    deliveryAvailable: true,
    deliveryCostZMW: 0,
    image: "https://placehold.co/640x360?text=Website+Development",
    active: true,
  },
  {
    id: "prd_2",
    name: "Brand identity package",
    description: "Logo, color system, and social templates.",
    category: "design",
    condition: "new",
    priceZMW: 22000,
    deliveryAvailable: true,
    deliveryCostZMW: 0,
    image: "https://placehold.co/640x360?text=Brand+Identity",
    active: true,
  },
];

const seedSettings = (): VendorSettings => ({
  basic: {
    storeName: "George's Store",
    supportEmail: "support@georgestore.example",
    supportPhone: "+260972827372",
  },
  payment: {
    payoutMethod: "bank",
    accountName: "George Munganga",
    accountNumber: "0102450069001",
  },
  business: {
    legalBusinessName: "George Studios Ltd",
    taxId: "TPIN-10022026",
    businessAddress: "Lusaka, Zambia",
  },
  social: {
    facebook: "https://facebook.com/georgestore",
    instagram: "https://instagram.com/georgestore",
    website: "https://georgestore.example",
  },
  notifications: {
    newOrder: true,
    payout: true,
    marketing: false,
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts: true,
  },
});

const readJson = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeJson = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

const ensureOrders = (): VendorOrder[] => {
  const cached = readJson<VendorOrder[]>(ORDERS_KEY);
  if (cached) return cached;
  const seeded = seedOrders();
  writeJson(ORDERS_KEY, seeded);
  return seeded;
};

const ensureProducts = (): VendorProduct[] => {
  const cached = readJson<VendorProduct[]>(PRODUCTS_KEY);
  if (cached) return cached;
  const seeded = seedProducts();
  writeJson(PRODUCTS_KEY, seeded);
  return seeded;
};

const ensureSettings = (): VendorSettings => {
  const cached = readJson<VendorSettings>(SETTINGS_KEY);
  if (cached) return cached;
  const seeded = seedSettings();
  writeJson(SETTINGS_KEY, seeded);
  return seeded;
};

const enforceVendorContext = (ctx: VendorRequestContext) => {
  if (ctx.authStatus !== "authenticated") {
    throw new AuthError(401, "Authentication required");
  }

  if (!ctx.capabilities.includes("can_sell") || ctx.activeMode !== "vendor") {
    throw new AuthError(403, "Vendor mode is required");
  }
};

const updateOrders = (orders: VendorOrder[]) => {
  writeJson(ORDERS_KEY, orders);
};

const updateProducts = (products: VendorProduct[]) => {
  writeJson(PRODUCTS_KEY, products);
};

const updateSettings = (settings: VendorSettings) => {
  writeJson(SETTINGS_KEY, settings);
};

const allowedTransitions: Record<VendorOrderStatus, VendorOrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["ready", "cancelled"],
  ready: ["out_for_delivery", "delivered", "cancelled"],
  out_for_delivery: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export const mockVendorRepository: VendorRepository = {
  async listOrders(ctx) {
    enforceVendorContext(ctx);
    return ensureOrders();
  },
  async getOrderById(ctx, orderId) {
    enforceVendorContext(ctx);
    return ensureOrders().find((o) => o.id === orderId) ?? null;
  },
  async updateOrderStatus(ctx, orderId, nextStatus) {
    enforceVendorContext(ctx);
    const orders = ensureOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx < 0) return null;
    const current = orders[idx];
    if (!allowedTransitions[current.status].includes(nextStatus)) {
      throw new AuthError(403, "Invalid status transition");
    }
    const updated: VendorOrder = {
      ...current,
      status: nextStatus,
      lastUpdated: new Date().toISOString(),
    };
    orders[idx] = updated;
    updateOrders(orders);
    return updated;
  },
  async listProducts(ctx) {
    enforceVendorContext(ctx);
    return ensureProducts();
  },
  async getProductById(ctx, productId) {
    enforceVendorContext(ctx);
    return ensureProducts().find((p) => p.id === productId) ?? null;
  },
  async createProduct(ctx, payload) {
    enforceVendorContext(ctx);
    const products = ensureProducts();
    const next: VendorProduct = { ...payload, id: `prd_${nanoid(8)}` };
    const updated = [next, ...products];
    updateProducts(updated);
    return next;
  },
  async updateProduct(ctx, productId, payload) {
    enforceVendorContext(ctx);
    const products = ensureProducts();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx < 0) return null;
    const next = { ...products[idx], ...payload };
    products[idx] = next;
    updateProducts(products);
    return next;
  },
  async deleteProduct(ctx, productId) {
    enforceVendorContext(ctx);
    const products = ensureProducts();
    const remaining = products.filter((p) => p.id !== productId);
    if (remaining.length === products.length) return false;
    updateProducts(remaining);
    return true;
  },
  async getSettings(ctx) {
    enforceVendorContext(ctx);
    return ensureSettings();
  },
  async updateSettingsSection<K extends VendorSettingsSection>(
    ctx: VendorRequestContext,
    section: K,
    patch: Partial<VendorSettings[K]>,
  ): Promise<VendorSettings> {
    enforceVendorContext(ctx);
    const current = ensureSettings();
    const next: VendorSettings = {
      ...current,
      [section]: { ...current[section], ...patch },
    };
    updateSettings(next);
    return next;
  },
};


import type { ActiveMode, AuthStatus, Capability } from "@/types/auth";
import type {
  VendorOrder,
  VendorOrderStatus,
  VendorProduct,
  VendorSettings,
  VendorSettingsSection,
} from "@/types/vendor";

export type VendorRequestContext = {
  authStatus: AuthStatus;
  activeMode: ActiveMode;
  capabilities: Capability[];
};

export interface VendorRepository {
  listOrders(ctx: VendorRequestContext): Promise<VendorOrder[]>;
  getOrderById(ctx: VendorRequestContext, orderId: string): Promise<VendorOrder | null>;
  updateOrderStatus(
    ctx: VendorRequestContext,
    orderId: string,
    nextStatus: VendorOrderStatus,
  ): Promise<VendorOrder | null>;
  listProducts(ctx: VendorRequestContext): Promise<VendorProduct[]>;
  getProductById(ctx: VendorRequestContext, productId: string): Promise<VendorProduct | null>;
  createProduct(
    ctx: VendorRequestContext,
    payload: Omit<VendorProduct, "id">,
  ): Promise<VendorProduct | null>;
  updateProduct(
    ctx: VendorRequestContext,
    productId: string,
    payload: Partial<Omit<VendorProduct, "id">>,
  ): Promise<VendorProduct | null>;
  deleteProduct(ctx: VendorRequestContext, productId: string): Promise<boolean>;
  getSettings(ctx: VendorRequestContext): Promise<VendorSettings>;
  updateSettingsSection<K extends VendorSettingsSection>(
    ctx: VendorRequestContext,
    section: K,
    patch: Partial<VendorSettings[K]>,
  ): Promise<VendorSettings>;
}


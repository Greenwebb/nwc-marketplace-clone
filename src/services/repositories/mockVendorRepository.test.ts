import { beforeEach, describe, expect, it } from "vitest";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorRequestContext } from "@/services/repositories/vendorRepository";

const vendorCtx: VendorRequestContext = {
  authStatus: "authenticated",
  activeMode: "vendor",
  capabilities: ["can_buy", "can_sell"],
};

const customerCtx: VendorRequestContext = {
  authStatus: "authenticated",
  activeMode: "customer",
  capabilities: ["can_buy"],
};

describe("mockVendorRepository", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    const localStorageMock = {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    };
    Object.defineProperty(globalThis, "localStorage", {
      value: localStorageMock,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(globalThis, "window", {
      value: globalThis,
      configurable: true,
      writable: true,
    });
    localStorage.clear();
  });

  it("blocks non-vendor context with 403", async () => {
    await expect(mockVendorRepository.listOrders(customerCtx)).rejects.toMatchObject({ status: 403 });
  });

  it("supports product CRUD", async () => {
    const created = await mockVendorRepository.createProduct(vendorCtx, {
      name: "Test Product",
      description: "Test description",
      category: "test",
      condition: "new",
      priceZMW: 1000,
      deliveryAvailable: true,
      deliveryCostZMW: 0,
      image: "https://placehold.co/100x100",
      active: true,
    });
    expect(created).toBeTruthy();

    const list = await mockVendorRepository.listProducts(vendorCtx);
    expect(list.some((p) => p.id === created?.id)).toBe(true);

    const updated = await mockVendorRepository.updateProduct(vendorCtx, created!.id, { priceZMW: 1200 });
    expect(updated?.priceZMW).toBe(1200);

    const deleted = await mockVendorRepository.deleteProduct(vendorCtx, created!.id);
    expect(deleted).toBe(true);
  });

  it("enforces allowed order status transitions", async () => {
    const orders = await mockVendorRepository.listOrders(vendorCtx);
    const pending = orders.find((order) => order.status === "pending");
    expect(pending).toBeTruthy();

    const ok = await mockVendorRepository.updateOrderStatus(vendorCtx, pending!.id, "confirmed");
    expect(ok?.status).toBe("confirmed");

    await expect(
      mockVendorRepository.updateOrderStatus(vendorCtx, pending!.id, "delivered"),
    ).rejects.toMatchObject({ status: 403 });
  });
});

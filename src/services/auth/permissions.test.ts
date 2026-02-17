import { describe, expect, it } from "vitest";
import { can, getPermissions } from "@/services/auth/permissions";
import type { AuthState } from "@/types/auth";

const makeState = (overrides?: Partial<AuthState>): AuthState => ({
  authStatus: "authenticated",
  session: null,
  profile: null,
  capabilities: ["can_buy", "can_sell"],
  activeMode: "vendor",
  onboardingState: "completed",
  ...overrides,
});

describe("permissions", () => {
  it("derives vendor access permissions", () => {
    const state = makeState();
    const permissions = getPermissions(state);
    expect(permissions.can_access_vendor_area).toBe(true);
    expect(permissions.can_access_customer_area).toBe(false);
    expect(permissions.can_switch_to_vendor_mode).toBe(true);
  });

  it("blocks vendor permissions for customer-only users", () => {
    const state = makeState({
      activeMode: "customer",
      capabilities: ["can_buy"],
      onboardingState: "not_applicable",
    });
    expect(can(state, "can_sell")).toBe(false);
    expect(can(state, "can_access_vendor_area")).toBe(false);
    expect(can(state, "can_access_customer_area")).toBe(true);
  });
});


import type { AuthState } from "@/types/auth";

export type PermissionKey =
  | "is_authenticated"
  | "can_buy"
  | "can_sell"
  | "is_vendor_mode"
  | "is_customer_mode"
  | "can_access_vendor_area"
  | "can_access_customer_area"
  | "can_switch_to_vendor_mode"
  | "vendor_onboarding_completed";

export function getPermissions(state: AuthState): Record<PermissionKey, boolean> {
  const canSell = state.capabilities.includes("can_sell");
  const canBuy = state.capabilities.includes("can_buy");
  const isAuthenticated = state.authStatus === "authenticated";

  return {
    is_authenticated: isAuthenticated,
    can_buy: canBuy,
    can_sell: canSell,
    is_vendor_mode: state.activeMode === "vendor",
    is_customer_mode: state.activeMode === "customer",
    can_access_vendor_area: isAuthenticated && canSell && state.activeMode === "vendor",
    can_access_customer_area: isAuthenticated && canBuy && state.activeMode === "customer",
    can_switch_to_vendor_mode: isAuthenticated && canSell,
    vendor_onboarding_completed: state.onboardingState === "completed",
  };
}

export function can(state: AuthState, permissionKey: PermissionKey): boolean {
  return getPermissions(state)[permissionKey];
}


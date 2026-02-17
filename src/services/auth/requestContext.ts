import type { AuthState } from "@/types/auth";
import type { VendorRequestContext } from "@/services/repositories/vendorRepository";

export function buildVendorRequestContext(state: AuthState): VendorRequestContext {
  return {
    authStatus: state.authStatus,
    activeMode: state.activeMode,
    capabilities: state.capabilities,
  };
}


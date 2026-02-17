import type { OTPContact } from "@/lib/mockAuth";
import type { AuthProfile, AuthSession } from "@/types/auth";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";

export interface AuthRepository {
  requestOtp(payload: OTPContact): Promise<{ ok: boolean }>;
  verifyOtp(code: string): Promise<{
    user: AuthProfile;
    capabilities: import("@/types/auth").Capability[];
    vendorOnboardingStatus: AuthProfile["vendorOnboardingStatus"];
    session: AuthSession;
  } | null>;
  signInWithGoogle(): Promise<{
    user: AuthProfile;
    capabilities: import("@/types/auth").Capability[];
    vendorOnboardingStatus: AuthProfile["vendorOnboardingStatus"];
    session: AuthSession;
  } | null>;
  refreshSession(): Promise<AuthSession | null>;
  logout(): Promise<void>;
}

export interface ProfileRepository {
  getMe(): Promise<AuthProfile | null>;
  updateActiveMode(mode: "customer" | "vendor"): Promise<AuthProfile | null>;
  upgradeToVendor(): Promise<AuthProfile | null>;
  updateVendorOnboardingDraft(draftPatch: Partial<VendorOnboardingDraft>): Promise<AuthProfile | null>;
  setVendorOnboardingStep(step: VendorOnboardingStep): Promise<AuthProfile | null>;
  completeVendorOnboarding(): Promise<AuthProfile | null>;
}

import {
  getAuthUser,
  requestOTP as requestOTPStorage,
  verifyOTP as verifyOTPStorage,
  signInWithGoogle as signInWithGoogleStorage,
  logoutAuthUser,
  setAuthUser,
  switchActiveUserRole,
  upgradeToVendor,
  updateVendorOnboardingDraft,
  setVendorOnboardingStep,
  completeVendorOnboarding,
  type OTPContact,
} from "@/lib/mockAuth";
import type { AuthProfile, AuthSession, Capability } from "@/types/auth";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";

export type VerifyOtpResponse = {
  user: AuthProfile;
  capabilities: Capability[];
  vendorOnboardingStatus: AuthProfile["vendorOnboardingStatus"];
  session: AuthSession;
};

const deriveCapabilities = (profile: AuthProfile): Capability[] => {
  if (profile.role === "admin") return ["can_admin", "can_sell", "can_buy"];
  if (profile.role === "vendor") return ["can_sell", "can_buy"];
  if (profile.role === "customer") return ["can_buy"];
  return [];
};

const createSession = (userId: number): AuthSession => {
  const now = Date.now();
  return {
    accessToken: `mock_access_${userId}_${now}`,
    refreshToken: `mock_refresh_${userId}_${now}`,
    expiresAt: new Date(now + 1000 * 60 * 60).toISOString(),
  };
};

export const authApi = {
  requestOtp: async (payload: OTPContact) => {
    requestOTPStorage(payload);
    return { ok: true };
  },
  verifyOtp: async (code: string): Promise<VerifyOtpResponse | null> => {
    const user = verifyOTPStorage(code);
    if (!user) return null;

    return {
      user,
      capabilities: deriveCapabilities(user),
      vendorOnboardingStatus: user.vendorOnboardingStatus,
      session: createSession(user.id),
    };
  },
  signInWithGoogle: async (): Promise<VerifyOtpResponse> => {
    const user = signInWithGoogleStorage();
    return {
      user,
      capabilities: deriveCapabilities(user),
      vendorOnboardingStatus: user.vendorOnboardingStatus,
      session: createSession(user.id),
    };
  },
  getMe: async (): Promise<AuthProfile | null> => getAuthUser(),
  updateActiveMode: async (mode: "customer" | "vendor") => {
    const user = switchActiveUserRole(mode);
    return user;
  },
  upgradeToVendor: async () => upgradeToVendor(),
  updateVendorOnboardingDraft: async (draftPatch: Partial<VendorOnboardingDraft>) => {
    return updateVendorOnboardingDraft(draftPatch);
  },
  setVendorOnboardingStep: async (step: VendorOnboardingStep) => {
    return setVendorOnboardingStep(step);
  },
  completeVendorOnboarding: async () => completeVendorOnboarding(),
  logout: async () => {
    logoutAuthUser();
    setAuthUser(null);
  },
};

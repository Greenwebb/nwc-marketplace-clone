import { describe, expect, it } from "vitest";
import type { ProfileRepository } from "@/services/repositories/authRepository";
import { AuthService } from "@/services/auth/authService";
import type { AuthState } from "@/types/auth";

const makeState = (overrides?: Partial<AuthState>): AuthState => ({
  authStatus: "authenticated",
  session: null,
  profile: {
    id: 1,
    openId: "mock",
    name: "Test",
    email: "test@example.com",
    loginMethod: "mock",
    role: "vendor",
    activeRole: "customer",
    vendorOnboardingStatus: "in_progress",
    vendorOnboardingStep: "account",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSignedIn: new Date().toISOString(),
  },
  capabilities: ["can_buy", "can_sell"],
  activeMode: "customer",
  onboardingState: "in_progress",
  ...overrides,
});

describe("AuthService mode precedence", () => {
  it("honors explicit mode on setActiveMode", async () => {
    const profileRepo: ProfileRepository = {
      getMe: async () => null,
      updateActiveMode: async (mode) => ({
        ...makeState().profile!,
        activeRole: mode,
      }),
      upgradeToVendor: async () => makeState().profile!,
      updateVendorOnboardingDraft: async () => makeState().profile!,
      setVendorOnboardingStep: async () => makeState().profile!,
      completeVendorOnboarding: async () => ({
        ...makeState().profile!,
        vendorOnboardingStatus: "completed",
      }),
    };

    const service = new AuthService(
      {
        requestOtp: async () => ({ ok: true }),
        verifyOtp: async () => null,
        signInWithGoogle: async () => null,
        refreshSession: async () => null,
        logout: async () => undefined,
      },
      profileRepo,
    );

    const state = makeState();
    const next = await service.setActiveMode(state, "vendor");
    expect(next.activeMode).toBe("vendor");
  });
});


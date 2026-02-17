import { authApi } from "@/services/mockApi/authApi";
import type { AuthRepository, ProfileRepository } from "@/services/repositories/authRepository";
import type { AuthSession } from "@/types/auth";

export const mockAuthRepository: AuthRepository = {
  requestOtp: (payload) => authApi.requestOtp(payload),
  verifyOtp: (code) => authApi.verifyOtp(code),
  signInWithGoogle: () => authApi.signInWithGoogle(),
  refreshSession: async (): Promise<AuthSession | null> => null,
  logout: () => authApi.logout(),
};

export const mockProfileRepository: ProfileRepository = {
  getMe: () => authApi.getMe(),
  updateActiveMode: (mode) => authApi.updateActiveMode(mode),
  upgradeToVendor: () => authApi.upgradeToVendor(),
  updateVendorOnboardingDraft: (draftPatch) => authApi.updateVendorOnboardingDraft(draftPatch),
  setVendorOnboardingStep: (step) => authApi.setVendorOnboardingStep(step),
  completeVendorOnboarding: () => authApi.completeVendorOnboarding(),
};

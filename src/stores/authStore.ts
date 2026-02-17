import { create } from "zustand";
import { authService } from "@/services/auth/authService";
import type { ActiveMode, AuthState } from "@/types/auth";
import type { OTPContact } from "@/lib/mockAuth";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";

type AuthStoreState = {
  state: AuthState;
  isLoading: boolean;
  error: string | null;
  pendingOtpContact: ReturnType<typeof authService.getPendingOtpContact>;
};

type AuthStoreActions = {
  signupStart: (payload: Omit<OTPContact, "flow">) => Promise<void>;
  loginStart: (payload: Omit<OTPContact, "flow">) => Promise<void>;
  verifyOtp: (code: string) => Promise<AuthState["profile"] | null>;
  signInWithGoogle: () => Promise<AuthState["profile"] | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthState["profile"] | null>;
  setActiveMode: (mode: ActiveMode) => Promise<void>;
  upgradeToVendorFromOnboarding: () => Promise<void>;
  postAuthRedirect: (returnTo?: string | null) => string;
  updateVendorOnboardingDraft: (patch: Partial<VendorOnboardingDraft>) => Promise<void>;
  setVendorOnboardingStep: (step: VendorOnboardingStep) => Promise<void>;
  completeVendorOnboarding: () => Promise<void>;
};

export type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>((set, get) => {
  const run = async <T,>(fn: () => Promise<T>) => {
    set({ isLoading: true, error: null });
    try {
      return await fn();
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Unknown auth error" });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  };

  return {
    state: authService.hydrate(),
    isLoading: false,
    error: null,
    pendingOtpContact: authService.getPendingOtpContact(),
    signupStart: async (payload) => {
      await run(() => authService.signupStart(payload));
      set({ pendingOtpContact: authService.getPendingOtpContact() });
    },
    loginStart: async (payload) => {
      await run(() => authService.loginStart(payload));
      set({ pendingOtpContact: authService.getPendingOtpContact() });
    },
    verifyOtp: async (code) => {
      const nextState = await run(() => authService.verifyOtp(code));
      if (!nextState) return null;
      set({ state: nextState, pendingOtpContact: null });
      return nextState.profile;
    },
    signInWithGoogle: async () => {
      const nextState = await run(() => authService.signInWithGoogle());
      if (!nextState) return null;
      set({ state: nextState });
      return nextState.profile;
    },
    logout: async () => {
      await run(() => authService.logout());
      set({ state: authService.hydrate(), pendingOtpContact: null });
    },
    refresh: async () => {
      const nextState = await run(() => authService.refresh(get().state));
      set({ state: nextState });
      return nextState.profile;
    },
    setActiveMode: async (mode) => {
      const nextState = await run(() => authService.setActiveMode(get().state, mode));
      set({ state: nextState });
    },
    upgradeToVendorFromOnboarding: async () => {
      const nextState = await run(() => authService.upgradeToVendorFromOnboarding(get().state));
      set({ state: nextState });
    },
    postAuthRedirect: (returnTo) => authService.postAuthRedirect(returnTo),
    updateVendorOnboardingDraft: async (patch) => {
      const nextState = await run(() => authService.updateVendorOnboardingDraft(get().state, patch));
      set({ state: nextState });
    },
    setVendorOnboardingStep: async (step) => {
      const nextState = await run(() => authService.setVendorOnboardingStep(get().state, step));
      set({ state: nextState });
    },
    completeVendorOnboarding: async () => {
      const nextState = await run(() => authService.completeVendorOnboarding(get().state));
      set({ state: nextState });
    },
  };
});


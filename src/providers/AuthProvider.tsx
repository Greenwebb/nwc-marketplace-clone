import type { ActiveMode } from "@/types/auth";
import { useAuthStore } from "@/stores/authStore";

export type AuthContextValue = {
  state: ReturnType<typeof useAuthStore.getState>["state"];
  isAuthenticated: boolean;
  isLoading: boolean;
  user: ReturnType<typeof useAuthStore.getState>["state"]["profile"];
  error: string | null;
  canSell: boolean;
  effectiveRole: ActiveMode;
  needsVendorOnboarding: boolean;
  pendingOtpContact: ReturnType<typeof useAuthStore.getState>["pendingOtpContact"];
  signupStart: ReturnType<typeof useAuthStore.getState>["signupStart"];
  loginStart: ReturnType<typeof useAuthStore.getState>["loginStart"];
  verifyOtp: ReturnType<typeof useAuthStore.getState>["verifyOtp"];
  signInWithGoogle: ReturnType<typeof useAuthStore.getState>["signInWithGoogle"];
  logout: ReturnType<typeof useAuthStore.getState>["logout"];
  refresh: ReturnType<typeof useAuthStore.getState>["refresh"];
  setActiveMode: ReturnType<typeof useAuthStore.getState>["setActiveMode"];
  upgradeToVendorFromOnboarding: ReturnType<typeof useAuthStore.getState>["upgradeToVendorFromOnboarding"];
  postAuthRedirect: ReturnType<typeof useAuthStore.getState>["postAuthRedirect"];
  updateVendorOnboardingDraft: ReturnType<typeof useAuthStore.getState>["updateVendorOnboardingDraft"];
  setVendorOnboardingStep: ReturnType<typeof useAuthStore.getState>["setVendorOnboardingStep"];
  completeVendorOnboarding: ReturnType<typeof useAuthStore.getState>["completeVendorOnboarding"];
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAuthContext(): AuthContextValue {
  const store = useAuthStore();
  const { state } = store;

  return {
    state,
    isAuthenticated: state.authStatus === "authenticated",
    isLoading: store.isLoading,
    user: state.profile,
    error: store.error,
    canSell: state.capabilities.includes("can_sell"),
    effectiveRole: state.activeMode,
    needsVendorOnboarding:
      state.capabilities.includes("can_sell") && state.onboardingState !== "completed",
    pendingOtpContact: store.pendingOtpContact,
    signupStart: store.signupStart,
    loginStart: store.loginStart,
    verifyOtp: store.verifyOtp,
    signInWithGoogle: store.signInWithGoogle,
    logout: store.logout,
    refresh: store.refresh,
    setActiveMode: store.setActiveMode,
    upgradeToVendorFromOnboarding: store.upgradeToVendorFromOnboarding,
    postAuthRedirect: store.postAuthRedirect,
    updateVendorOnboardingDraft: store.updateVendorOnboardingDraft,
    setVendorOnboardingStep: store.setVendorOnboardingStep,
    completeVendorOnboarding: store.completeVendorOnboarding,
  };
}


import { getPendingOTPContact, type OTPContact } from "@/lib/mockAuth";
import {
  ActiveModeStorageAdapter,
  AuthProfileStorageAdapter,
  SessionStorageAdapter,
} from "@/services/persistence/authStorage";
import type { AuthRepository, ProfileRepository } from "@/services/repositories/authRepository";
import { mockAuthRepository, mockProfileRepository } from "@/services/repositories/mockAuthRepository";
import type { ActiveMode, AuthProfile, AuthSession, AuthState, Capability } from "@/types/auth";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";

const DEFAULT_ACTIVE_MODE: ActiveMode = "customer";

const deriveCapabilities = (profile: AuthProfile | null): Capability[] => {
  if (!profile?.role) return [];
  if (profile.role === "admin") return ["can_admin", "can_sell", "can_buy"];
  if (profile.role === "vendor") return ["can_sell", "can_buy"];
  if (profile.role === "customer") return ["can_buy"];
  return [];
};

const resolveActiveMode = (
  capabilities: Capability[],
  persistedMode: ActiveMode | null,
): ActiveMode => {
  const candidate = persistedMode ?? DEFAULT_ACTIVE_MODE;

  if (candidate === "vendor" && !capabilities.includes("can_sell")) {
    return DEFAULT_ACTIVE_MODE;
  }

  return candidate;
};

const sanitizeMode = (mode: ActiveMode, capabilities: Capability[]): ActiveMode => {
  if (mode === "vendor" && !capabilities.includes("can_sell")) {
    return DEFAULT_ACTIVE_MODE;
  }
  return mode;
};

const buildAuthState = (
  profile: AuthProfile | null,
  session: AuthSession | null,
  authStatus: AuthState["authStatus"],
  preferredMode?: ActiveMode,
): AuthState => {
  const capabilities = deriveCapabilities(profile);
  const activeMode = preferredMode
    ? sanitizeMode(preferredMode, capabilities)
    : resolveActiveMode(capabilities, ActiveModeStorageAdapter.load());
  const onboardingState =
    profile?.role === "vendor"
      ? profile.vendorOnboardingStatus ?? "not_started"
      : "not_applicable";

  const mergedProfile = profile ? { ...profile, activeRole: activeMode } : null;

  if (mergedProfile) {
    AuthProfileStorageAdapter.save(mergedProfile);
  }
  ActiveModeStorageAdapter.save(activeMode);
  SessionStorageAdapter.save(session);

  return {
    authStatus,
    session,
    profile: mergedProfile,
    capabilities,
    activeMode,
    onboardingState,
  };
};

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository = mockAuthRepository,
    private readonly profileRepo: ProfileRepository = mockProfileRepository,
  ) {}

  hydrate(): AuthState {
    const profile = AuthProfileStorageAdapter.load();
    const session = SessionStorageAdapter.load();
    if (!profile) {
      return {
        authStatus: "anonymous",
        session: null,
        profile: null,
        capabilities: [],
        activeMode: DEFAULT_ACTIVE_MODE,
        onboardingState: "not_applicable",
      };
    }
    return buildAuthState(profile, session, "authenticated");
  }

  async signupStart(payload: Omit<OTPContact, "flow">) {
    return this.authRepo.requestOtp({ ...payload, flow: "signup" });
  }

  async loginStart(payload: Omit<OTPContact, "flow">) {
    return this.authRepo.requestOtp({ ...payload, flow: "login" });
  }

  async verifyOtp(code: string): Promise<AuthState | null> {
    const response = await this.authRepo.verifyOtp(code);
    if (!response) return null;

    return buildAuthState(response.user, response.session, "authenticated");
  }

  async signInWithGoogle(): Promise<AuthState | null> {
    const response = await this.authRepo.signInWithGoogle();
    if (!response) return null;
    return buildAuthState(response.user, response.session, "authenticated");
  }

  getPendingOtpContact() {
    return getPendingOTPContact();
  }

  async refresh(currentState: AuthState): Promise<AuthState> {
    const profile = await this.profileRepo.getMe();
    if (!profile) {
      return {
        authStatus: "anonymous",
        session: null,
        profile: null,
        capabilities: [],
        activeMode: DEFAULT_ACTIVE_MODE,
        onboardingState: "not_applicable",
      };
    }

    return buildAuthState(profile, currentState.session, "authenticated");
  }

  async logout() {
    await this.authRepo.logout();
    SessionStorageAdapter.save(null);
    AuthProfileStorageAdapter.save(null);
    ActiveModeStorageAdapter.save(null);
  }

  async setActiveMode(state: AuthState, mode: ActiveMode): Promise<AuthState> {
    if (mode === "vendor" && !state.capabilities.includes("can_sell")) {
      return state;
    }

    const profile = await this.profileRepo.updateActiveMode(mode);
    if (!profile) return state;

    return buildAuthState({ ...profile, activeRole: mode }, state.session, "authenticated", mode);
  }

  async updateVendorOnboardingDraft(
    state: AuthState,
    patch: Partial<VendorOnboardingDraft>,
  ): Promise<AuthState> {
    const profile = await this.profileRepo.updateVendorOnboardingDraft(patch);
    if (!profile) return state;
    return buildAuthState(profile, state.session, "authenticated");
  }

  async setVendorOnboardingStep(state: AuthState, step: VendorOnboardingStep): Promise<AuthState> {
    const profile = await this.profileRepo.setVendorOnboardingStep(step);
    if (!profile) return state;
    return buildAuthState(profile, state.session, "authenticated");
  }

  async completeVendorOnboarding(state: AuthState): Promise<AuthState> {
    const profile = await this.profileRepo.completeVendorOnboarding();
    if (!profile) return state;
    return buildAuthState(profile, state.session, "authenticated", "vendor");
  }

  async upgradeToVendorFromOnboarding(state: AuthState): Promise<AuthState> {
    const profile = await this.profileRepo.upgradeToVendor();
    if (!profile) return state;
    // During onboarding start, preserve buyer mode until completion.
    return buildAuthState({ ...profile, activeRole: "customer" }, state.session, "authenticated", "customer");
  }

  resolveReturnToPath(input: string | null | undefined): string | null {
    if (!input) return null;
    if (!input.startsWith("/")) return null;
    if (input.startsWith("//")) return null;
    if (input.startsWith("/auth/")) return null;
    return input;
  }

  postAuthRedirect(returnTo?: string | null) {
    return this.resolveReturnToPath(returnTo) ?? "/dashboard";
  }
}

export const authService = new AuthService();

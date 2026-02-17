import type { MockUser } from "@/lib/mockAuth";
import type { VendorOnboardingStatus, VendorOnboardingStep } from "@/types/vendorOnboarding";

export type Capability = "can_buy" | "can_sell" | "can_admin";

export type ActiveMode = "customer" | "vendor";

export type AuthStatus = "anonymous" | "authenticating" | "authenticated" | "refreshing" | "error";

export type AuthSession = {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
};

export type AuthProfile = MockUser & {
  activeRole?: ActiveMode;
  vendorOnboardingStatus?: VendorOnboardingStatus;
  vendorOnboardingStep?: VendorOnboardingStep;
};

export type AuthState = {
  authStatus: AuthStatus;
  session: AuthSession | null;
  profile: AuthProfile | null;
  capabilities: Capability[];
  activeMode: ActiveMode;
  onboardingState: VendorOnboardingStatus | "not_applicable";
};

export type RoutePolicyMeta = {
  requireAuth?: boolean;
  requiredCapability?: Capability;
  requiredMode?: ActiveMode;
  requireVendorOnboarded?: boolean;
};

export type AuthorizeResult = {
  allowed: boolean;
  redirectTo?: string;
  reason?: string;
};

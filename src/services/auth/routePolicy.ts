import type { AuthState, AuthorizeResult, RoutePolicyMeta } from "@/types/auth";
import { can } from "@/services/auth/permissions";
import { getModeHomePath } from "@/services/auth/modeRedirect";

export function authorizeRoute(state: AuthState, policy: RoutePolicyMeta): AuthorizeResult {
  const requireAuth = policy.requireAuth ?? true;

  if (requireAuth && !can(state, "is_authenticated")) {
    return { allowed: false, redirectTo: "/auth/login", reason: "unauthenticated" };
  }

  if (policy.requiredCapability && !state.capabilities.includes(policy.requiredCapability)) {
    return { allowed: false, redirectTo: "/", reason: "missing_capability" };
  }

  if (policy.requiredMode && state.activeMode !== policy.requiredMode) {
    return {
      allowed: false,
      redirectTo: getModeHomePath(state),
      reason: "invalid_mode",
    };
  }

  if (
    policy.requireVendorOnboarded &&
    can(state, "can_sell") &&
    !can(state, "vendor_onboarding_completed")
  ) {
    const step = state.profile?.vendorOnboardingStep ?? "listing";
    return {
      allowed: false,
      redirectTo: `/vendor/onboarding?step=${step}`,
      reason: "vendor_onboarding_required",
    };
  }

  return { allowed: true };
}

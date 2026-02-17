import { describe, expect, it } from "vitest";
import { authorizeRoute } from "@/services/auth/routePolicy";
import type { AuthState, RoutePolicyMeta } from "@/types/auth";

const makeState = (overrides?: Partial<AuthState>): AuthState => ({
  authStatus: "authenticated",
  session: null,
  profile: {
    id: 1,
    openId: "x",
    name: "Test",
    email: "test@example.com",
    loginMethod: "mock",
    role: "vendor",
    activeRole: "vendor",
    vendorOnboardingStatus: "completed",
    vendorOnboardingStep: "seller_hub",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSignedIn: new Date().toISOString(),
  },
  capabilities: ["can_buy", "can_sell"],
  activeMode: "vendor",
  onboardingState: "completed",
  ...overrides,
});

const makePolicy = (overrides?: Partial<RoutePolicyMeta>): RoutePolicyMeta => ({
  requireAuth: true,
  requiredMode: "vendor",
  requiredCapability: "can_sell",
  requireVendorOnboarded: true,
  ...overrides,
});

describe("authorizeRoute", () => {
  it("redirects anonymous users to login", () => {
    const result = authorizeRoute(makeState({ authStatus: "anonymous" }), makePolicy());
    expect(result.allowed).toBe(false);
    expect(result.redirectTo).toBe("/auth/login");
    expect(result.reason).toBe("unauthenticated");
  });

  it("redirects invalid mode users to mode home", () => {
    const result = authorizeRoute(
      makeState({ activeMode: "customer", capabilities: ["can_buy"] }),
      makePolicy({ requiredMode: "vendor", requiredCapability: "can_buy", requireVendorOnboarded: false }),
    );
    expect(result.allowed).toBe(false);
    expect(result.redirectTo).toBe("/dashboard");
    expect(result.reason).toBe("invalid_mode");
  });

  it("redirects incomplete onboarding to onboarding step", () => {
    const result = authorizeRoute(
      makeState({
        onboardingState: "in_progress",
        profile: {
          ...makeState().profile!,
          vendorOnboardingStep: "verification_payment",
        },
      }),
      makePolicy(),
    );
    expect(result.allowed).toBe(false);
    expect(result.redirectTo).toBe("/vendor/onboarding?step=verification_payment");
    expect(result.reason).toBe("vendor_onboarding_required");
  });
});


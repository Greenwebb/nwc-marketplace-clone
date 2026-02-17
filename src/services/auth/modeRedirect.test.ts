import { describe, expect, it } from "vitest";
import { getModeHomePath, getPostModeSwitchPath } from "@/services/auth/modeRedirect";

describe("mode redirect helpers", () => {
  it("returns vendor dashboard for vendor mode users", () => {
    const path = getModeHomePath({ activeMode: "vendor", capabilities: ["can_sell"] });
    expect(path).toBe("/vendor/dashboard");
  });

  it("returns customer dashboard for non-vendor mode users", () => {
    const path = getModeHomePath({ activeMode: "customer", capabilities: ["can_buy"] });
    expect(path).toBe("/dashboard");
  });

  it("maps post-switch routing behavior", () => {
    expect(getPostModeSwitchPath("vendor", "/shop")).toBe("/vendor/dashboard");
    expect(getPostModeSwitchPath("customer", "/vendor/orders")).toBe("/dashboard");
    expect(getPostModeSwitchPath("customer", "/shop")).toBeNull();
  });
});

import type { ActiveMode, AuthState } from "@/types/auth";

type ModeState = Pick<AuthState, "activeMode" | "capabilities">;

export function getModeHomePath(state: ModeState): string {
  if (state.activeMode === "vendor" && state.capabilities.includes("can_sell")) {
    return "/vendor/dashboard";
  }
  return "/dashboard";
}

export function getPostModeSwitchPath(nextMode: ActiveMode, currentPath: string): string | null {
  if (nextMode === "vendor") return "/vendor/dashboard";
  if (currentPath.startsWith("/vendor/")) return "/dashboard";
  return null;
}


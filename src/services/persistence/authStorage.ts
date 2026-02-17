import type { ActiveMode, AuthProfile, AuthSession } from "@/types/auth";
import type { VendorOnboardingDraft, VendorOnboardingStep } from "@/types/vendorOnboarding";

const SESSION_KEY = "nwc.auth.v1.session";
const PROFILE_KEY = "nwc.auth.v1.profile";
const ACTIVE_MODE_KEY = "nwc.auth.v1.active_mode";
const ONBOARDING_DRAFT_KEY = "nwc.vendor_onboarding.v1.draft";

const safeRead = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const safeWrite = <T,>(key: string, value: T | null) => {
  if (typeof window === "undefined") return;
  if (value === null) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const SessionStorageAdapter = {
  load: () => safeRead<AuthSession>(SESSION_KEY),
  save: (session: AuthSession | null) => safeWrite(SESSION_KEY, session),
};

export const AuthProfileStorageAdapter = {
  load: () => safeRead<AuthProfile>(PROFILE_KEY),
  save: (profile: AuthProfile | null) => safeWrite(PROFILE_KEY, profile),
};

export const ActiveModeStorageAdapter = {
  load: () => {
    const mode = safeRead<ActiveMode>(ACTIVE_MODE_KEY);
    if (mode === "customer" || mode === "vendor") return mode;
    return null;
  },
  save: (mode: ActiveMode | null) => safeWrite(ACTIVE_MODE_KEY, mode),
};

export type VendorOnboardingGuestDraft = {
  step: VendorOnboardingStep;
  questionId?: string;
  data: VendorOnboardingDraft;
  updatedAt: string;
};

export const VendorOnboardingDraftStorageAdapter = {
  load: () => safeRead<VendorOnboardingGuestDraft>(ONBOARDING_DRAFT_KEY),
  save: (draft: VendorOnboardingGuestDraft | null) => safeWrite(ONBOARDING_DRAFT_KEY, draft),
  clear: () => safeWrite(ONBOARDING_DRAFT_KEY, null),
};

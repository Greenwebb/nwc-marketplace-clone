import { useSyncExternalStore } from "react";
import type {
  VendorOnboardingDraft,
  VendorOnboardingStatus,
  VendorOnboardingStep,
} from "@/types/vendorOnboarding";

export type UserRole = "customer" | "vendor" | "admin";

export type MockUser = {
  id: number;
  openId: string;
  name: string;
  email: string;
  loginMethod: string;
  role: UserRole | null;
  activeRole?: "customer" | "vendor";
  vendorOnboardingStatus?: VendorOnboardingStatus;
  vendorOnboardingStep?: VendorOnboardingStep;
  vendorOnboardingData?: VendorOnboardingDraft;
  vendorOnboardingCompletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lastSignedIn: string;
};

const STORAGE_KEY = "mock-marketplace-user";
const AUTH_EVENT = "mock-marketplace-auth-change";
const defaultVendorOnboardingDraft = (): VendorOnboardingDraft => ({
  accountType: "personal",
  fullName: "",
  address: "",
  dateOfBirth: "",
  nrcNumber: "",
  legalBusinessName: "",
  dba: "",
  businessAddress: "",
  phoneNumber: "",
  emailAddress: "",
  password: "",
  phoneVerificationCode: "",
  nrcDocument: null,
  payoutMethod: "bank",
  bankAccountHolderName: "",
  bankName: "",
  branchCode: "",
  accountNumber: "",
  bankStatement: null,
  mobileMoneyProvider: "",
  mobileMoneyNumber: "",
  itemTitle: "",
  itemCategory: [],
  itemCondition: "",
  itemDescription: "",
  photos: [],
  priceZMW: "",
  pricingType: "fixed",
  shippingCarrier: "",
  shippingCost: "",
  localPickup: false,
});

const defaultVendorOnboardingState = () => ({
  vendorOnboardingStatus: "not_started" as VendorOnboardingStatus,
  vendorOnboardingStep: "listing" as VendorOnboardingStep,
  vendorOnboardingData: defaultVendorOnboardingDraft(),
  vendorOnboardingCompletedAt: null,
});

const defaultUser = (): MockUser => {
  const now = new Date().toISOString();
  return {
    id: 1,
    openId: "mock-open-id-1",
    name: "John Doe",
    email: "john@example.com",
    loginMethod: "mock",
    role: "customer",
    ...defaultVendorOnboardingState(),
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
};

const readUserFromStorage = (): MockUser | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
};

let cachedRaw: string | null | undefined = undefined;
let cachedUser: MockUser | null = null;

const readCachedUserSnapshot = (): MockUser | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedUser;
  }

  cachedRaw = raw;
  if (!raw) {
    cachedUser = null;
    return null;
  }

  try {
    cachedUser = JSON.parse(raw) as MockUser;
  } catch {
    cachedUser = null;
  }

  return cachedUser;
};

const emitAuthChanged = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const persistUser = (user: MockUser | null) => {
  if (typeof window === "undefined") return;
  if (user) {
    const raw = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEY, raw);
    localStorage.setItem("manus-runtime-user-info", JSON.stringify(user));
    cachedRaw = raw;
    cachedUser = user;
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("manus-runtime-user-info");
    cachedRaw = null;
    cachedUser = null;
  }
  emitAuthChanged();
};

export const getAuthUser = (): MockUser | null => {
  return readCachedUserSnapshot();
};

export const setAuthUser = (user: MockUser | null) => {
  persistUser(user);
};

export const updateAuthUserRole = (role: UserRole) => {
  const current = getAuthUser() ?? readUserFromStorage() ?? defaultUser();
  const onboardingState = role === "vendor" ? defaultVendorOnboardingState() : {};
  const next: MockUser = {
    ...current,
    role,
    activeRole: role === "vendor" ? "vendor" : "customer",
    ...onboardingState,
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const getEffectiveUserRole = (user: MockUser | null): UserRole | null => {
  if (!user?.role) return null;
  if (user.role === "vendor") {
    return user.activeRole === "customer" ? "customer" : "vendor";
  }
  return user.role;
};

export const canSwitchBuyerSellerRole = (user: MockUser | null) =>
  user?.role === "vendor";

export const switchActiveUserRole = (nextActiveRole: "customer" | "vendor") => {
  const current = getAuthUser() ?? readUserFromStorage();
  if (!current || current.role !== "vendor") return null;

  const next: MockUser = {
    ...current,
    activeRole: nextActiveRole,
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const getVendorOnboardingStep = (
  user: MockUser | null,
): VendorOnboardingStep => user?.vendorOnboardingStep ?? "listing";

export const isVendorOnboarded = (user: MockUser | null) =>
  user?.role === "vendor" && user.vendorOnboardingStatus === "completed";

export const updateVendorOnboardingDraft = (
  draftPatch: Partial<VendorOnboardingDraft>,
) => {
  const current = getAuthUser() ?? readUserFromStorage();
  if (!current || current.role !== "vendor") return null;

  const next: MockUser = {
    ...current,
    vendorOnboardingStatus:
      current.vendorOnboardingStatus === "completed"
        ? "completed"
        : "in_progress",
    vendorOnboardingData: {
      ...(current.vendorOnboardingData ?? defaultVendorOnboardingDraft()),
      ...draftPatch,
    },
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const setVendorOnboardingStep = (step: VendorOnboardingStep) => {
  const current = getAuthUser() ?? readUserFromStorage();
  if (!current || current.role !== "vendor") return null;

  const next: MockUser = {
    ...current,
    vendorOnboardingStep: step,
    vendorOnboardingStatus:
      current.vendorOnboardingStatus === "completed"
        ? "completed"
        : "in_progress",
    vendorOnboardingData:
      current.vendorOnboardingData ?? defaultVendorOnboardingDraft(),
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const completeVendorOnboarding = () => {
  const current = getAuthUser() ?? readUserFromStorage();
  if (!current || current.role !== "vendor") return null;

  const now = new Date().toISOString();
  const next: MockUser = {
    ...current,
    vendorOnboardingStatus: "completed",
    vendorOnboardingStep: "seller_hub",
    vendorOnboardingCompletedAt: now,
    vendorOnboardingData:
      current.vendorOnboardingData ?? defaultVendorOnboardingDraft(),
    updatedAt: now,
  };
  persistUser(next);
  return next;
};

export const upgradeToVendor = () => {
  const current = getAuthUser() ?? readUserFromStorage();
  if (!current) return null;

  const next: MockUser = {
    ...current,
    role: "vendor",
    activeRole: "vendor",
    vendorOnboardingStatus:
      current.vendorOnboardingStatus ?? "in_progress",
    vendorOnboardingStep: current.vendorOnboardingStep ?? "seller_hub",
    vendorOnboardingData:
      current.vendorOnboardingData ?? defaultVendorOnboardingDraft(),
    vendorOnboardingCompletedAt: current.vendorOnboardingCompletedAt ?? null,
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const logoutAuthUser = () => {
  localStorage.removeItem("otp-pending-contact");
  persistUser(null);
};

// Google Auth (mock)
export const signInWithGoogle = (): MockUser => {
  const existingUser = getAuthUser() ?? readUserFromStorage();
  const now = new Date().toISOString();

  if (existingUser) {
    const user: MockUser = {
      ...existingUser,
      loginMethod: "google",
      lastSignedIn: now,
      updatedAt: now,
    };
    persistUser(user);
    return user;
  }

  const user: MockUser = {
    id: Math.floor(Math.random() * 10000) + 1,
    openId: `google-${Date.now()}`,
    name: "John Doe",
    email: "john.doe@gmail.com",
    loginMethod: "google",
    role: "customer",
    activeRole: "customer",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
  persistUser(user);
  return user;
};

// OTP Auth Flow
const OTP_PENDING_KEY = "otp-pending-contact";

export type OTPContact = {
  method: "phone" | "email";
  value: string;
  flow: "login" | "signup";
  name?: string;
  roleIntent?: "customer" | "vendor";
};

export const requestOTP = (contact: OTPContact) => {
  localStorage.setItem(OTP_PENDING_KEY, JSON.stringify(contact));
  return true;
};

export const getPendingOTPContact = (): OTPContact | null => {
  const raw = localStorage.getItem(OTP_PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OTPContact;
  } catch {
    return null;
  }
};

export const verifyOTP = (code: string): MockUser | null => {
  if (code.length !== 6 || !/^\d+$/.test(code)) return null;
  const contact = getPendingOTPContact();
  if (!contact) return null;

  const existingUser = getAuthUser() ?? readUserFromStorage();
  const now = new Date().toISOString();
  const inferredRole: UserRole =
    contact.value.toLowerCase().includes("vendor") ? "vendor" : "customer";

  const baseUser: MockUser = existingUser ?? {
    id: Math.floor(Math.random() * 10000) + 1,
    openId: `otp-${Date.now()}`,
    name: contact.name || "New User",
    email: contact.method === "email" ? contact.value : "",
    loginMethod: "otp",
    role: null,
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };

  const nextRole: UserRole =
    contact.roleIntent === "vendor"
      ? "vendor"
      : contact.roleIntent === "customer"
        ? "customer"
        : baseUser.role ?? inferredRole;

  const shouldInitializeVendorOnboarding =
    nextRole === "vendor" && (baseUser.role !== "vendor" || !baseUser.vendorOnboardingStatus);

  const user: MockUser = {
    ...baseUser,
    name: baseUser.name || contact.name || "New User",
    email: baseUser.email || (contact.method === "email" ? contact.value : ""),
    loginMethod: "otp",
    role: nextRole,
    activeRole:
      nextRole === "vendor"
        ? baseUser.activeRole === "customer" || baseUser.activeRole === "vendor"
          ? baseUser.activeRole
          : "vendor"
        : nextRole === "customer"
          ? "customer"
          : baseUser.activeRole,
    ...(shouldInitializeVendorOnboarding ? defaultVendorOnboardingState() : {}),
    updatedAt: now,
    lastSignedIn: now,
  };

  localStorage.removeItem(OTP_PENDING_KEY);
  persistUser(user);
  return user;
};

const subscribe = (callback: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      callback();
    }
  };

  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
};

export const useMockAuthUser = () => {
  return useSyncExternalStore(subscribe, getAuthUser, () => null);
};

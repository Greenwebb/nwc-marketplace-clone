import { useSyncExternalStore } from "react";

export type UserRole = "customer" | "vendor" | "admin";

export type MockUser = {
  id: number;
  openId: string;
  name: string;
  email: string;
  loginMethod: string;
  role: UserRole | null;
  createdAt: string;
  updatedAt: string;
  lastSignedIn: string;
};

const STORAGE_KEY = "mock-marketplace-user";
const AUTH_EVENT = "mock-marketplace-auth-change";

const defaultUser = (): MockUser => {
  const now = new Date().toISOString();
  return {
    id: 1,
    openId: "mock-open-id-1",
    name: "John Doe",
    email: "john@example.com",
    loginMethod: "mock",
    role: "customer",
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
  const next: MockUser = {
    ...current,
    role,
    updatedAt: new Date().toISOString(),
  };
  persistUser(next);
  return next;
};

export const logoutAuthUser = () => {
  localStorage.removeItem("otp-pending-contact");
  persistUser(null);
};

// OTP Auth Flow
const OTP_PENDING_KEY = "otp-pending-contact";

export type OTPContact = {
  method: "phone" | "email";
  value: string;
  flow: "login" | "signup";
  name?: string;
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

  const now = new Date().toISOString();
  const user: MockUser = {
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

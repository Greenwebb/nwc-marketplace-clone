import { getLoginUrl } from "@/const";
import { logoutAuthUser, useMockAuthUser } from "@/lib/mockAuth";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } =
    options ?? {};
  const user = useMockAuthUser();

  const logout = useCallback(async () => {
    logoutAuthUser();
  }, []);

  const state = useMemo(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("manus-runtime-user-info", JSON.stringify(user));
      } else {
        localStorage.removeItem("manus-runtime-user-info");
      }
    }

    return {
      user: user ?? null,
      loading: false,
      error: null,
      isAuthenticated: Boolean(user),
    };
  }, [user]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath, state.user]);

  return {
    ...state,
    refresh: async () => ({ data: user ?? null }),
    logout,
  };
}

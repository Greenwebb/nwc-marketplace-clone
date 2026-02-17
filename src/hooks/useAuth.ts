import { getAuthUser, useMockAuthUser } from "@/lib/mockAuth";

export function useAuth() {
  const user = useMockAuthUser();

  return {
    user: user ?? null,
    isLoading: false,
    isAuthenticated: !!user,
    error: null,
    refetch: async () => ({ data: getAuthUser() }),
  };
}

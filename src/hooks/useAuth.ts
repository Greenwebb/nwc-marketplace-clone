import { useAuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const auth = useAuthContext();

  return {
    ...auth,
    activeMode: auth.effectiveRole,
    refetch: async () => ({ data: await auth.refresh() }),
  };
}

import { ReactNode, useEffect } from 'react';
import { useLocation } from "@/lib/router";
import { useAuth } from '@/hooks/useAuth';
import { authorizeRoute } from '@/services/auth/routePolicy';
import type { ActiveMode, Capability } from '@/types/auth';
import { toast } from 'sonner';
import { LoaderDots } from './LoaderDots';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredCapability?: Capability;
  requiredMode?: ActiveMode;
  requireAuth?: boolean;
  requireVendorOnboarded?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredCapability,
  requiredMode,
  requireAuth = true,
  requireVendorOnboarded = false,
}: ProtectedRouteProps) {
  const { state, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const access = authorizeRoute(state, {
    requireAuth,
    requiredCapability,
    requiredMode,
    requireVendorOnboarded,
  });

  useEffect(() => {
    if (isLoading) return;

    if (!access.allowed && access.redirectTo) {
      if (access.reason === 'unauthenticated') {
        toast.error('Please sign in to access this page');
      } else if (access.reason === 'vendor_onboarding_required') {
        toast.error('Please complete vendor onboarding first');
      } else if (access.reason === 'invalid_mode') {
        toast.error('Switch account mode to continue');
      } else if (access.reason === 'missing_capability') {
        toast.error('You do not have access to this section');
      }
      setLocation(access.redirectTo);
      return;
    }
  }, [access, isLoading, setLocation]);

  if (isLoading) {
    return <LoaderDots fullPage />;
  }

  if (!access.allowed) {
    return null;
  }

  return <>{children}</>;
}


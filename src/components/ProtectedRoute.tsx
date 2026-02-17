import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'customer' | 'vendor' | 'admin';
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // Check if authentication is required
    if (requireAuth && !user) {
      toast.error('Please sign in to access this page');
      setLocation('/auth/login');
      return;
    }

    // Check if specific role is required
    if (requiredRole && user) {
      if (user.role !== requiredRole && user.role !== 'admin') {
        toast.error(`This page is only accessible to ${requiredRole}s`);
        setLocation('/');
        return;
      }
    }
  }, [user, isLoading, requireAuth, requiredRole, setLocation]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render children if user doesn't meet requirements
  if (requireAuth && !user) {
    return null;
  }

  if (requiredRole && user && user.role !== requiredRole && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}

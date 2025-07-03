
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/dashboard' }: PublicRouteProps) {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

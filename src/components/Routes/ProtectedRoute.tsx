
import { Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Verificar role específico se necessário
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      console.log('🚫 [ProtectedRoute] Acesso negado:', {
        userRole: user.role,
        requiredRoles,
        path: location.pathname
      });
      
      // Redirecionar baseado no role do usuário
      if (user.role === 'cliente') {
        return <Navigate to={`/portal/${user.id}`} replace />;
      } else if (user.role === 'colaborador') {
        return <Navigate to={`/portal/${user.id}`} replace />;
      } else {
        return <Navigate to="/auth" replace />;
      }
    }
  }

  // Se a rota é "/inicio", renderizar sem sidebar
  if (location.pathname === '/inicio') {
    return <>{children}</>;
  }

  // Usar MainLayout que já inclui o SidebarProvider
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

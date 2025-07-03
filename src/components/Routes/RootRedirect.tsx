
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function RootRedirect() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  console.log('🔄 [RootRedirect] Redirecionando usuário:', {
    role: user.role,
    email: user.email,
    id: user.id
  });
  
  // Clientes e colaboradores vão para seus portais específicos
  if (user.role === 'cliente' || user.role === 'colaborador') {
    return <Navigate to={`/portal/${user.id}`} replace />;
  }
  
  // Admin e gestores vão para a página inicial administrativa
  if (user.role === 'admin' || user.role === 'gestor') {
    return <Navigate to="/inicio" replace />;
  }
  
  // Fallback para usuários sem role definido
  return <Navigate to="/auth" replace />;
}

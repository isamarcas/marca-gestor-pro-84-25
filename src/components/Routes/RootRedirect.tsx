
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function RootRedirect() {
  const { user } = useAuth();
  
  // Se não tem usuário logado, vai para a página inicial pública
  if (!user) {
    return <Navigate to="/inicio" replace />;
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
  
  // Admin e gestores vão para o dashboard
  if (user.role === 'admin' || user.role === 'gestor') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Fallback para página inicial
  return <Navigate to="/inicio" replace />;
}

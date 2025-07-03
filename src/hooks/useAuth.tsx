
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '@/types';
import { useLocalAuth, LocalUser } from '@/hooks/useLocalAuth';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { validarLogin, isLoaded, carregarUsuarios } = useLocalAuth();

  useEffect(() => {
    const savedUser = localStorage.getItem('crm-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('crm-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo?: string; message?: string }> => {
    setIsLoading(true);
    
    try {
      // Aguardar carregamento dos usuários
      let attempts = 0;
      while (!isLoaded && attempts < 100) {
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
      }
      
      if (!isLoaded) {
        carregarUsuarios();
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Forçar recarregamento antes da validação
      carregarUsuarios();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const localUser = validarLogin(email, password);
      
      if (!localUser) {
        // Tentar mais uma vez após aguardar
        await new Promise(resolve => setTimeout(resolve, 200));
        const localUserRetry = validarLogin(email, password);
        
        if (!localUserRetry) {
          setIsLoading(false);
          return { 
            success: false, 
            message: 'Credenciais inválidas ou muitas tentativas de login. Tente novamente em alguns minutos.' 
          };
        }
      }

      const userToUse = localUser || validarLogin(email, password);
      
      if (!userToUse) {
        setIsLoading(false);
        return { 
          success: false, 
          message: 'Acesso negado. Verifique suas credenciais.' 
        };
      }

      const usuario: Usuario = {
        id: userToUse.id,
        nome: userToUse.nome,
        email: userToUse.email,
        role: userToUse.role,
        especialidades: ['propriedade_intelectual', 'marcas'],
        ativo: true,
        ultimoAcesso: new Date(),
      };
      
      setUser(usuario);
      localStorage.setItem('crm-user', JSON.stringify(usuario));
      
      let redirectTo = '/';
      
      // Determinar redirecionamento baseado no role
      if (userToUse.role === 'cliente') {
        try {
          const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
          const cliente = clientes.find((c: any) => 
            c.email.toLowerCase() === userToUse.email.toLowerCase() ||
            c.id === userToUse.id
          );
          
          if (cliente) {
            redirectTo = `/portal/${userToUse.id}`;
          } else {
            redirectTo = '/';
          }
        } catch (error) {
          redirectTo = '/';
        }
      } else if (userToUse.role === 'colaborador') {
        try {
          const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
          const cliente = clientes.find((c: any) => 
            c.email.toLowerCase() === userToUse.email.toLowerCase() ||
            c.id === userToUse.id
          );
          
          if (cliente) {
            redirectTo = `/portal/${userToUse.id}`;
          } else {
            redirectTo = '/';
          }
        } catch (error) {
          redirectTo = '/';
        }
      } else if (userToUse.role === 'admin' || userToUse.role === 'gestor') {
        redirectTo = '/inicio';
      }
      
      setIsLoading(false);
      return { success: true, redirectTo };
    } catch (error) {
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Erro interno. Tente novamente.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm-user');
    // Limpar dados sensíveis do sessionStorage também
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


import { useState, useEffect } from 'react';
import { LocalUser } from './types';
import { loadUsers, saveUsers, getCurrentUsers } from './userStorage';
import { checkLoginAttempts, recordLoginAttempt } from './bruteForceProtection';
import { sanitizeInput } from './cryptoUtils';
import { hashPassword } from './constants';
import { addSecurityLog } from './securityLogs';

export type { LocalUser } from './types';

export function useLocalAuth() {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    const loadedUsers = loadUsers();
    setUsers(loadedUsers);
    setIsLoaded(true);
  };

  const validarLogin = (email: string, password: string): LocalUser | null => {
    // Sanitizar entrada
    const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
    const sanitizedPassword = sanitizeInput(password);
    
    // Verificar proteção contra força bruta
    const loginCheck = checkLoginAttempts(sanitizedEmail);
    if (!loginCheck.allowed) {
      recordLoginAttempt(sanitizedEmail, false);
      return null;
    }
    
    // FORÇAR reload dos usuários mais recentes antes de validar
    const currentUsers = getCurrentUsers();
    setUsers(currentUsers); // Atualizar estado imediatamente
    
    const hashedPassword = hashPassword(sanitizedPassword);
    
    const user = currentUsers.find((u: any) => {
      const emailUsuario = u.email.toLowerCase().trim();
      const emailMatch = emailUsuario === sanitizedEmail;
      const passwordMatch = u.password === hashedPassword;
      
      return emailMatch && passwordMatch;
    });
    
    // Registrar tentativa com logs de segurança
    recordLoginAttempt(sanitizedEmail, !!user);
    
    return user || null;
  };

  const cadastrarUsuario = (
    nome: string, 
    email: string, 
    password: string, 
    role: 'admin' | 'gestor' | 'colaborador' | 'cliente',
    customId?: string
  ): boolean => {
    try {
      // Sanitizar entradas
      const sanitizedNome = sanitizeInput(nome);
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      const sanitizedPassword = sanitizeInput(password);
      
      // FORÇAR reload dos usuários mais recentes
      const currentUsers = getCurrentUsers();
      
      // Verificar se o email já existe
      const emailExists = currentUsers.some((u: any) => u.email.toLowerCase().trim() === sanitizedEmail);
      if (emailExists) {
        return false;
      }

      const userId = customId || `${role}-${Date.now()}`;
      const hashedPassword = hashPassword(sanitizedPassword);
      
      const novoUsuario: LocalUser = {
        id: userId,
        nome: sanitizedNome,
        email: sanitizedEmail,
        password: hashedPassword,
        role
      };

      const updatedUsers = [...currentUsers, novoUsuario];
      
      // Salvar dados
      saveUsers(updatedUsers);
      
      // VERIFICAÇÃO CRÍTICA: ler imediatamente para confirmar
      const usuariosVerificados = getCurrentUsers();
      const usuarioSalvo = usuariosVerificados.find((u: any) => u.email === sanitizedEmail);
      
      if (usuarioSalvo) {
        // Atualizar estado local IMEDIATAMENTE
        setUsers(updatedUsers);
        
        // Log de segurança para novo usuário
        addSecurityLog('admin_access', `Novo usuário cadastrado`, 'low');
        
        return true;
      } else {
        return false;
      }
      
    } catch (error) {
      addSecurityLog('suspicious_activity', `Erro ao cadastrar usuário`, 'high');
      return false;
    }
  };

  return {
    users,
    validarLogin,
    cadastrarUsuario,
    carregarUsuarios,
    isLoaded,
    checkLoginAttempts // Expor função para verificação externa
  };
}

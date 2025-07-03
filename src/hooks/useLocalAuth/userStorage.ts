
import { LocalUser } from './types';
import { USERS_STORAGE_KEY, defaultUsers } from './constants';
import { encryptData, decryptData } from './cryptoUtils';

export const loadUsers = (): LocalUser[] => {
  try {
    // Carregar usuários existentes do localStorage
    const storedData = localStorage.getItem(USERS_STORAGE_KEY);
    let usuariosExistentes: LocalUser[] = [];
    
    if (storedData) {
      try {
        const decryptedData = decryptData(storedData);
        if (decryptedData) {
          usuariosExistentes = JSON.parse(decryptedData);
        }
      } catch (error) {
        // Erro silencioso por segurança
      }
    }
    
    // Combinar usuários padrão com os existentes (evitar duplicatas)
    const todosUsuarios = [...defaultUsers];
    
    // Adicionar usuários que não são padrão
    usuariosExistentes.forEach(usuario => {
      const emailExiste = todosUsuarios.some(u => u.email.toLowerCase() === usuario.email.toLowerCase());
      if (!emailExiste) {
        todosUsuarios.push(usuario);
      }
    });
    
    // Salvar dados criptografados atualizados
    const encryptedUsers = encryptData(JSON.stringify(todosUsuarios));
    localStorage.setItem(USERS_STORAGE_KEY, encryptedUsers);
    
    return todosUsuarios;
  } catch (error) {
    const encryptedUsers = encryptData(JSON.stringify(defaultUsers));
    localStorage.setItem(USERS_STORAGE_KEY, encryptedUsers);
    return defaultUsers;
  }
};

export const saveUsers = (users: LocalUser[]): void => {
  const encryptedUsers = encryptData(JSON.stringify(users));
  localStorage.setItem(USERS_STORAGE_KEY, encryptedUsers);
};

export const getCurrentUsers = (): LocalUser[] => {
  const currentStoredUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (currentStoredUsers) {
    try {
      const decryptedData = decryptData(currentStoredUsers);
      if (decryptedData) {
        return JSON.parse(decryptedData);
      }
    } catch (error) {
      // Erro silencioso por segurança
    }
  }
  return defaultUsers;
};

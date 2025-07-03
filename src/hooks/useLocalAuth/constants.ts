
import CryptoJS from 'crypto-js';
import { LocalUser } from './types';

export const USERS_STORAGE_KEY = 'local-users';
export const SECURITY_KEY = 'isa-marcas-security-key-2024';

// Função para hash de senha
export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password + SECURITY_KEY).toString();
};

export const defaultUsers: LocalUser[] = [
  {
    id: 'admin-feedback',
    nome: 'Admin Feedback',
    email: 'adm@adm.com',
    password: hashPassword('123456'),
    role: 'admin'
  },
  {
    id: 'admin-isamarcas',
    nome: 'Admin Isa Marcas',
    email: 'admin@isamarcas.com.br',
    password: hashPassword('admin135'),
    role: 'admin'
  }
];

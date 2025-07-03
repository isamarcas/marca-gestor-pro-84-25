
import CryptoJS from 'crypto-js';
import { SECURITY_KEY } from './constants';

// Função para criptografar dados
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECURITY_KEY).toString();
};

// Função para descriptografar dados
export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECURITY_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
};

// Função para validar entrada contra XSS
export const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
};

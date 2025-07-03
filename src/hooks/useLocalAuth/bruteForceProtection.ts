

import CryptoJS from 'crypto-js';
import { getSecurityConfig, isIPWhitelisted, isIPBlacklisted } from './securityConfig';
import { addSecurityLog } from './securityLogs';

// Verificar tentativas de login com proteção contra força bruta
export const checkLoginAttempts = (email: string): { allowed: boolean; remainingTime?: number } => {
  const config = getSecurityConfig();
  const currentIP = '127.0.0.1';
  
  // Verificar se IP está na whitelist (sempre permitir)
  if (isIPWhitelisted(currentIP)) {
    return { allowed: true };
  }
  
  // Verificar se IP está na blacklist (sempre bloquear)
  if (isIPBlacklisted(currentIP)) {
    addSecurityLog('blocked_ip', `Tentativa de acesso de IP bloqueado: ${currentIP}`, 'high', email);
    return { allowed: false, remainingTime: 999 };
  }
  
  if (!config.enableBruteForceProtection) {
    return { allowed: true };
  }

  const attemptsKey = `login_attempts_${CryptoJS.MD5(email).toString()}`;
  const lockoutKey = `lockout_${CryptoJS.MD5(email).toString()}`;
  
  // Verificar se está em período de bloqueio
  const lockoutTime = localStorage.getItem(lockoutKey);
  const now = Date.now();
  
  if (lockoutTime && now < parseInt(lockoutTime)) {
    const remainingTime = Math.ceil((parseInt(lockoutTime) - now) / 1000 / 60);
    return { allowed: false, remainingTime };
  }
  
  // Se passou do tempo de bloqueio, limpar dados
  if (lockoutTime && now >= parseInt(lockoutTime)) {
    localStorage.removeItem(attemptsKey);
    localStorage.removeItem(lockoutKey);
  }
  
  // Verificar tentativas atuais
  const attempts = parseInt(localStorage.getItem(attemptsKey) || '0');
  const allowed = attempts < config.maxLoginAttempts;
  
  return { allowed };
};

// Registrar tentativa de login
export const recordLoginAttempt = (email: string, success: boolean): void => {
  const config = getSecurityConfig();
  const attemptsKey = `login_attempts_${CryptoJS.MD5(email).toString()}`;
  const lockoutKey = `lockout_${CryptoJS.MD5(email).toString()}`;
  
  if (success) {
    // Limpar tentativas em caso de sucesso
    localStorage.removeItem(attemptsKey);
    localStorage.removeItem(lockoutKey);
    addSecurityLog('admin_access', `Login bem-sucedido`, 'low', email);
  } else {
    const currentAttempts = parseInt(localStorage.getItem(attemptsKey) || '0');
    const newAttempts = currentAttempts + 1;
    localStorage.setItem(attemptsKey, newAttempts.toString());
    
    addSecurityLog('login_attempt', `Tentativa falhada (${newAttempts}/${config.maxLoginAttempts})`, 'medium', email);
    
    // Verificar se deve bloquear
    if (newAttempts >= config.maxLoginAttempts) {
      const lockoutDurationMs = config.lockoutDuration * 60 * 1000;
      const lockoutUntil = Date.now() + lockoutDurationMs;
      localStorage.setItem(lockoutKey, lockoutUntil.toString());
      
      addSecurityLog('blocked_ip', `Usuário bloqueado por ${config.lockoutDuration} minutos após ${newAttempts} tentativas`, 'high', email);
    }
  }
};

// Função para limpar tentativas manualmente (para testes)
export const clearLoginAttempts = (email: string): void => {
  const attemptsKey = `login_attempts_${CryptoJS.MD5(email).toString()}`;
  const lockoutKey = `lockout_${CryptoJS.MD5(email).toString()}`;
  
  localStorage.removeItem(attemptsKey);
  localStorage.removeItem(lockoutKey);
};

// Função para obter status atual do usuário
export const getLoginStatus = (email: string): { attempts: number; isBlocked: boolean; remainingTime?: number } => {
  const config = getSecurityConfig();
  const attemptsKey = `login_attempts_${CryptoJS.MD5(email).toString()}`;
  const lockoutKey = `lockout_${CryptoJS.MD5(email).toString()}`;
  
  const attempts = parseInt(localStorage.getItem(attemptsKey) || '0');
  const lockoutTime = localStorage.getItem(lockoutKey);
  const now = Date.now();
  
  if (lockoutTime && now < parseInt(lockoutTime)) {
    const remainingTime = Math.ceil((parseInt(lockoutTime) - now) / 1000 / 60);
    return { attempts, isBlocked: true, remainingTime };
  }
  
  return { attempts, isBlocked: false };
};




import { SecurityLog } from './types';
import { getSecurityConfig, isIPBlacklisted } from './securityConfig';

// Função para adicionar log de segurança
export const addSecurityLog = (
  type: SecurityLog['type'], 
  details: string, 
  severity: SecurityLog['severity'], 
  email?: string
): void => {
  const config = getSecurityConfig();
  if (!config.enableSecurityLogs) {
    return;
  }

  const currentIP = '127.0.0.1'; // Simulado para ambiente local
  
  // Verificar se IP está na blacklist
  if (isIPBlacklisted(currentIP)) {
    return;
  }

  const log: SecurityLog = {
    id: Date.now().toString(),
    timestamp: new Date(),
    type,
    ip: currentIP,
    userAgent: navigator.userAgent,
    details: details + (email ? ` (${email})` : ''),
    severity
  };

  const existingLogs = JSON.parse(localStorage.getItem('security-logs') || '[]');
  const updatedLogs = [log, ...existingLogs].slice(0, 1000); // Manter apenas os últimos 1000 logs
  localStorage.setItem('security-logs', JSON.stringify(updatedLogs));
};


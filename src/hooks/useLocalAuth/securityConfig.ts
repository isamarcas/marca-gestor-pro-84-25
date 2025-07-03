

import { SecurityConfig } from './types';

// Função para obter configurações de segurança (sempre atual)
export const getSecurityConfig = (): SecurityConfig => {
  try {
    const config = localStorage.getItem('seguranca-config');
    if (config) {
      const parsedConfig = JSON.parse(config);
      
      // Validar configurações críticas
      if (parsedConfig.maxLoginAttempts && parsedConfig.lockoutDuration !== undefined) {
        const validConfig: SecurityConfig = {
          maxLoginAttempts: parsedConfig.maxLoginAttempts,
          lockoutDuration: parsedConfig.lockoutDuration,
          enableBruteForceProtection: parsedConfig.enableBruteForceProtection !== undefined ? parsedConfig.enableBruteForceProtection : true,
          enableSecurityLogs: parsedConfig.enableSecurityLogs !== undefined ? parsedConfig.enableSecurityLogs : true,
          whitelistIPs: parsedConfig.whitelistIPs || [],
          blacklistIPs: parsedConfig.blacklistIPs || []
        };
        
        return validConfig;
      }
    }
  } catch (error) {
    console.error('Erro ao carregar configurações de segurança');
  }
  
  // Configurações padrão apenas se não houver nada salvo
  const defaultConfig: SecurityConfig = {
    maxLoginAttempts: 3,
    lockoutDuration: 5,
    enableBruteForceProtection: true,
    enableSecurityLogs: true,
    whitelistIPs: [],
    blacklistIPs: []
  };
  
  return defaultConfig;
};

// Função para salvar configurações
export const saveSecurityConfig = (config: SecurityConfig): void => {
  try {
    localStorage.setItem('seguranca-config', JSON.stringify(config));
    
    // Verificação imediata silenciosa
    const verificacao = getSecurityConfig();
    
    // Confirmar se as configurações foram salvas corretamente
    if (verificacao.maxLoginAttempts !== config.maxLoginAttempts || 
        verificacao.lockoutDuration !== config.lockoutDuration) {
      console.error('Erro: configurações não foram aplicadas corretamente');
    }
    
  } catch (error) {
    console.error('Erro ao salvar configurações de segurança');
  }
};

// Verificar se IP está na whitelist
export const isIPWhitelisted = (ip: string): boolean => {
  const config = getSecurityConfig();
  return config.whitelistIPs && config.whitelistIPs.includes(ip);
};

// Verificar se IP está na blacklist
export const isIPBlacklisted = (ip: string): boolean => {
  const config = getSecurityConfig();
  return config.blacklistIPs && config.blacklistIPs.includes(ip);
};


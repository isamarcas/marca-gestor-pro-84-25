
export interface SegurancaConfig {
  // Proteção contra força bruta
  maxLoginAttempts: number;
  lockoutDuration: number; // em minutos
  enableBruteForceProtection: boolean;
  
  // Mascaramento de URLs
  hideAdminUrl: boolean;
  customAdminPath: string;
  hideLoginUrl: boolean;
  customLoginPath: string;
  
  // Proteção de arquivos
  disableDirectoryBrowsing: boolean;
  hideWpVersion: boolean;
  removeGeneratorTags: boolean;
  
  // Logs e monitoramento
  enableSecurityLogs: boolean;
  alertOnSuspiciousActivity: boolean;
  
  // Headers de segurança
  enableCSP: boolean;
  enableHSTS: boolean;
  enableXFrameOptions: boolean;
  
  // Filtros de IP
  whitelistIPs: string[];
  blacklistIPs: string[];
  enableGeoBlocking: boolean;
  blockedCountries: string[];
}

export interface SecurityLog {
  id: string;
  timestamp: Date;
  type: 'login_attempt' | 'blocked_ip' | 'suspicious_activity' | 'admin_access';
  ip: string;
  userAgent: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

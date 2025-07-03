
export interface LocalUser {
  id: string;
  nome: string;
  email: string;
  password: string;
  role: 'admin' | 'gestor' | 'colaborador' | 'cliente';
}

export interface SecurityConfig {
  maxLoginAttempts: number;
  lockoutDuration: number; // em minutos
  enableBruteForceProtection: boolean;
  enableSecurityLogs: boolean;
  whitelistIPs: string[];
  blacklistIPs: string[];
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

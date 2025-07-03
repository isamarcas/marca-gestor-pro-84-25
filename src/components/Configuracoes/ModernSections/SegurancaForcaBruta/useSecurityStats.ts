
import { useState, useEffect } from 'react';
import { SegurancaConfig } from './types';

export function useSecurityStats(config: SegurancaConfig) {
  const [stats, setStats] = useState({
    blockedAttempts: 0,
    activeProtections: 0,
    threatLevel: 'low' as 'low' | 'medium' | 'high'
  });

  const updateStats = () => {
    // Contar proteções ativas baseado na configuração atual
    const protections = [
      config.enableBruteForceProtection,
      config.hideAdminUrl,
      config.hideLoginUrl,
      config.disableDirectoryBrowsing,
      config.enableSecurityLogs,
      config.enableCSP,
      config.enableHSTS,
      config.enableXFrameOptions,
      config.hideWpVersion,
      config.removeGeneratorTags,
      config.alertOnSuspiciousActivity
    ].filter(Boolean).length;

    // Carregar logs de segurança para calcular tentativas bloqueadas
    const logs = JSON.parse(localStorage.getItem('security-logs') || '[]');
    const blockedCount = logs.filter((log: any) => 
      log.type === 'blocked_ip' || log.type === 'login_attempt'
    ).length;

    // Calcular nível de ameaça baseado em proteções ativas e tentativas bloqueadas
    let threatLevel: 'low' | 'medium' | 'high' = 'low';
    if (blockedCount > 20 || protections < 5) threatLevel = 'high';
    else if (blockedCount > 10 || protections < 8) threatLevel = 'medium';

    setStats({
      blockedAttempts: blockedCount,
      activeProtections: protections,
      threatLevel
    });
  };

  useEffect(() => {
    updateStats();
    
    // Atualizar stats a cada 30 segundos
    const interval = setInterval(updateStats, 30000);
    
    return () => clearInterval(interval);
  }, [config]);

  return { stats, updateStats };
}

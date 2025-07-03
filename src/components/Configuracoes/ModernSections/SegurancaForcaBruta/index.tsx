

import React, { useState, useEffect } from 'react';
import { SegurancaConfig } from './types';
import { StatsCards } from './StatsCards';
import { SecurityTabs } from './SecurityTabs';
import { useSecurityStats } from './useSecurityStats';
import { useToast } from "@/hooks/use-toast";
import { getSecurityConfig, saveSecurityConfig } from '@/hooks/useLocalAuth/securityConfig';

export function SegurancaForcaBrutaSection() {
  const { toast } = useToast();
  const [config, setConfig] = useState<SegurancaConfig>({
    // Valores padrão iniciais
    maxLoginAttempts: 3,
    lockoutDuration: 5,
    enableBruteForceProtection: true,
    
    // Mascaramento de URLs
    hideAdminUrl: false,
    customAdminPath: 'painel-secreto',
    hideLoginUrl: false,
    customLoginPath: 'acesso-sistema',
    
    // Proteção de arquivos
    disableDirectoryBrowsing: true,
    hideWpVersion: true,
    removeGeneratorTags: true,
    
    // Logs e monitoramento
    enableSecurityLogs: true,
    alertOnSuspiciousActivity: true,
    
    // Headers de segurança
    enableCSP: true,
    enableHSTS: true,
    enableXFrameOptions: true,
    
    // Filtros de IP
    whitelistIPs: [],
    blacklistIPs: [],
    enableGeoBlocking: false,
    blockedCountries: []
  });

  const { stats, updateStats } = useSecurityStats(config);

  useEffect(() => {
    // Carregar configurações salvas prioritariamente
    try {
      // Tentar carregar configurações de segurança específicas primeiro
      const securityConfig = getSecurityConfig();
      
      // Tentar carregar configurações completas
      const savedCompleteConfig = localStorage.getItem('seguranca-config-completa');
      
      if (savedCompleteConfig) {
        const parsedCompleteConfig = JSON.parse(savedCompleteConfig);
        
        // Mesclar configurações, dando prioridade às de segurança específicas
        const mergedConfig = {
          ...parsedCompleteConfig,
          maxLoginAttempts: securityConfig.maxLoginAttempts,
          lockoutDuration: securityConfig.lockoutDuration,
          enableBruteForceProtection: securityConfig.enableBruteForceProtection,
          enableSecurityLogs: securityConfig.enableSecurityLogs,
          whitelistIPs: securityConfig.whitelistIPs,
          blacklistIPs: securityConfig.blacklistIPs
        };
        
        setConfig(mergedConfig);
      } else {
        // Usar apenas configurações de segurança se não houver completas
        setConfig(prevConfig => ({
          ...prevConfig,
          maxLoginAttempts: securityConfig.maxLoginAttempts,
          lockoutDuration: securityConfig.lockoutDuration,
          enableBruteForceProtection: securityConfig.enableBruteForceProtection,
          enableSecurityLogs: securityConfig.enableSecurityLogs,
          whitelistIPs: securityConfig.whitelistIPs,
          blacklistIPs: securityConfig.blacklistIPs
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações');
      toast({
        title: "⚠️ Erro ao Carregar Configurações",
        description: "Usando configurações padrão de segurança.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleConfigChange = (newConfig: SegurancaConfig) => {
    setConfig(newConfig);
    
    // Salvar configurações completas
    localStorage.setItem('seguranca-config-completa', JSON.stringify(newConfig));
    
    // Salvar configurações de segurança específicas
    const securityConfigToSave = {
      maxLoginAttempts: newConfig.maxLoginAttempts,
      lockoutDuration: newConfig.lockoutDuration,
      enableBruteForceProtection: newConfig.enableBruteForceProtection,
      enableSecurityLogs: newConfig.enableSecurityLogs,
      whitelistIPs: newConfig.whitelistIPs || [],
      blacklistIPs: newConfig.blacklistIPs || []
    };
    
    saveSecurityConfig(securityConfigToSave);
    
    // Aplicar configurações imediatamente
    applySecuritySettings(newConfig);
    
    // Atualizar stats
    setTimeout(() => {
      updateStats();
    }, 100);
  };

  const applySecuritySettings = (securityConfig: SegurancaConfig) => {
    if (securityConfig.enableSecurityLogs) {
      const logEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: 'admin_access',
        ip: '127.0.0.1',
        userAgent: navigator.userAgent,
        details: 'Configurações de segurança atualizadas',
        severity: 'low'
      };

      const existingLogs = JSON.parse(localStorage.getItem('security-logs') || '[]');
      const updatedLogs = [logEntry, ...existingLogs].slice(0, 1000);
      localStorage.setItem('security-logs', JSON.stringify(updatedLogs));
    }
  };

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <SecurityTabs config={config} onConfigChange={handleConfigChange} />
    </div>
  );
}


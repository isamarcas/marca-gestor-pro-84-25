

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SegurancaConfig } from './types';
import { StatusCard } from './StatusCard';
import { LoginProtectionConfig } from './LoginProtectionConfig';
import { URLMaskingConfig } from './URLMaskingConfig';
import { IPFiltersConfig } from './IPFiltersConfig';
import { AdvancedProtections } from './AdvancedProtections';
import { saveSecurityConfig } from '@/hooks/useLocalAuth/securityConfig';

interface ProtecaoForcaBrutaProps {
  config: SegurancaConfig;
  onConfigChange: (config: SegurancaConfig) => void;
}

export function ProtecaoForcaBruta({ config, onConfigChange }: ProtecaoForcaBrutaProps) {
  const { toast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConfigUpdate = (updates: Partial<SegurancaConfig>) => {
    const newConfig = { ...config, ...updates };
    onConfigChange(newConfig);
    
    // Salvar apenas configurações críticas imediatamente
    if (updates.maxLoginAttempts !== undefined || updates.lockoutDuration !== undefined || updates.enableBruteForceProtection !== undefined) {
      const securityConfigToSave = {
        maxLoginAttempts: newConfig.maxLoginAttempts,
        lockoutDuration: newConfig.lockoutDuration,
        enableBruteForceProtection: newConfig.enableBruteForceProtection,
        enableSecurityLogs: newConfig.enableSecurityLogs,
        whitelistIPs: newConfig.whitelistIPs || [],
        blacklistIPs: newConfig.blacklistIPs || []
      };
      
      // Salvar configurações diretamente (sem cache)
      saveSecurityConfig(securityConfigToSave);
    }
  };

  const handleSaveConfig = () => {
    // Validações
    if (config.maxLoginAttempts < 1 || config.maxLoginAttempts > 20) {
      toast({
        title: "⚠️ Configuração Inválida",
        description: "O número máximo de tentativas deve estar entre 1 e 20.",
        variant: "destructive"
      });
      return;
    }

    if (config.lockoutDuration < 1 || config.lockoutDuration > 1440) {
      toast({
        title: "⚠️ Configuração Inválida", 
        description: "A duração do bloqueio deve estar entre 1 e 1440 minutos.",
        variant: "destructive"
      });
      return;
    }

    // Salvar configurações
    const securityConfigToSave = {
      maxLoginAttempts: config.maxLoginAttempts,
      lockoutDuration: config.lockoutDuration,
      enableBruteForceProtection: config.enableBruteForceProtection,
      enableSecurityLogs: config.enableSecurityLogs,
      whitelistIPs: config.whitelistIPs || [],
      blacklistIPs: config.blacklistIPs || []
    };

    // Salvar configurações diretamente
    saveSecurityConfig(securityConfigToSave);
    
    // Salvar configurações completas
    localStorage.setItem('seguranca-config-completa', JSON.stringify(config));
    
    toast({
      title: "🛡️ Configurações Aplicadas",
      description: `Proteção: ${config.maxLoginAttempts} tentativas, bloqueio ${config.lockoutDuration} min`,
    });
  };

  return (
    <div className="space-y-6">
      <StatusCard config={config} onConfigChange={handleConfigUpdate} />
      <LoginProtectionConfig config={config} onConfigChange={handleConfigUpdate} />
      <URLMaskingConfig config={config} onConfigChange={handleConfigUpdate} />
      <IPFiltersConfig config={config} onConfigChange={handleConfigUpdate} />
      <AdvancedProtections 
        config={config} 
        onConfigChange={handleConfigUpdate}
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end"
      >
        <Button
          onClick={handleSaveConfig}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          <Shield className="h-4 w-4 mr-2" />
          Aplicar Configurações
        </Button>
      </motion.div>
    </div>
  );
}


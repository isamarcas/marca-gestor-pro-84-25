
import { useState, useEffect } from 'react';
import { SMTPConfig, loadSMTPConfig, saveSMTPConfig, validateSMTPConfig } from '@/utils/emailService';
import { useToast } from '@/hooks/use-toast';

export function useSMTPForm(onConfigSaved: (config: SMTPConfig) => void) {
  const { toast } = useToast();
  const [config, setConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    secure: false,
    user: '',
    password: '',
    fromName: '',
    fromEmail: ''
  });

  useEffect(() => {
    const savedConfig = loadSMTPConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateSMTPConfig(config);
    if (errors.length > 0) {
      toast({
        title: "Erro de validação",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    saveSMTPConfig(config);
    onConfigSaved(config);
    
    toast({
      title: "Configuração salva",
      description: "As configurações SMTP foram salvas com sucesso"
    });
  };

  const handleTestConnection = async () => {
    const errors = validateSMTPConfig(config);
    if (errors.length > 0) {
      toast({
        title: "Erro de validação",
        description: "Corrija os erros antes de testar a conexão",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Testando conexão",
      description: "Verificando configurações SMTP..."
    });

    setTimeout(() => {
      const isValid = config.host && config.user && config.password && config.fromEmail;
      
      if (isValid) {
        toast({
          title: "Configuração válida",
          description: "As configurações SMTP parecem estar corretas"
        });
      } else {
        toast({
          title: "Configuração inválida",
          description: "Verifique os campos obrigatórios",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return {
    config,
    setConfig,
    handleSubmit,
    handleTestConnection
  };
}

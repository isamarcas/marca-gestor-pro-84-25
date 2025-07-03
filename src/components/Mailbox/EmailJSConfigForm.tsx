
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Key, Settings, ExternalLink, AlertTriangle } from 'lucide-react';
import { EmailJSConfig, saveEmailJSConfig, loadEmailJSConfig, validateEmailJSConfig } from '@/utils/emailService';
import { useToast } from '@/hooks/use-toast';

interface EmailJSConfigFormProps {
  onConfigSaved: (config: EmailJSConfig) => void;
}

export function EmailJSConfigForm({ onConfigSaved }: EmailJSConfigFormProps) {
  const { toast } = useToast();
  const [config, setConfig] = useState<EmailJSConfig>({
    serviceId: '',
    templateId: '',
    userId: ''
  });

  useEffect(() => {
    const savedConfig = loadEmailJSConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar configuração
    const errors = validateEmailJSConfig(config);
    if (errors.length > 0) {
      toast({
        title: "Erro de validação",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    saveEmailJSConfig(config);
    onConfigSaved(config);
    
    toast({
      title: "Configuração salva",
      description: "As configurações EmailJS foram salvas com sucesso"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Configuração EmailJS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">Como configurar EmailJS:</p>
              <ol className="text-blue-700 mt-1 list-decimal list-inside space-y-1">
                <li>Acesse <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">emailjs.com <ExternalLink className="h-3 w-3" /></a></li>
                <li>Crie uma conta gratuita</li>
                <li>Adicione um serviço de e-mail (Gmail, Outlook, etc.)</li>
                <li>Crie um template de e-mail</li>
                <li>Copie os IDs abaixo</li>
              </ol>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service ID *</Label>
            <div className="relative">
              <Settings className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="serviceId"
                placeholder="service_xxxxxxx"
                value={config.serviceId}
                onChange={(e) => setConfig({ ...config, serviceId: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateId">Template ID *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="templateId"
                placeholder="template_xxxxxxx"
                value={config.templateId}
                onChange={(e) => setConfig({ ...config, templateId: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">User ID (Public Key) *</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="userId"
                placeholder="user_xxxxxxxxxxxxxxx"
                value={config.userId}
                onChange={(e) => setConfig({ ...config, userId: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Template EmailJS:</strong> Certifique-se de que seu template tenha as variáveis: 
              <code className="mx-1 px-1 bg-amber-100 rounded">{'{{to_email}}'}</code>,
              <code className="mx-1 px-1 bg-amber-100 rounded">{'{{subject}}'}</code>,
              <code className="mx-1 px-1 bg-amber-100 rounded">{'{{message}}'}</code>,
              <code className="mx-1 px-1 bg-amber-100 rounded">{'{{from_name}}'}</code>
            </p>
          </div>

          <Button type="submit" className="w-full">
            Salvar Configuração EmailJS
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

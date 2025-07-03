
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Mail, Lock, Server } from 'lucide-react';
import { SMTPConfig } from '@/utils/emailService';
import { useSMTPForm } from './SMTPConfigForm/hooks/useSMTPForm';
import { ConfigurationWarning } from './SMTPConfigForm/components/ConfigurationWarning';
import { FormField } from './SMTPConfigForm/components/FormField';
import { SSLToggle } from './SMTPConfigForm/components/SSLToggle';
import { ActionButtons } from './SMTPConfigForm/components/ActionButtons';

interface SMTPConfigFormProps {
  onConfigSaved: (config: SMTPConfig) => void;
}

export function SMTPConfigForm({ onConfigSaved }: SMTPConfigFormProps) {
  const {
    config,
    setConfig,
    handleSubmit,
    handleTestConnection
  } = useSMTPForm(onConfigSaved);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuração SMTP
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ConfigurationWarning />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="host"
              label="Servidor SMTP"
              placeholder="smtp.gmail.com"
              value={config.host}
              onChange={(value) => setConfig({ ...config, host: value as string })}
              icon={Server}
              required
            />

            <FormField
              id="port"
              label="Porta"
              placeholder="587"
              value={config.port}
              onChange={(value) => setConfig({ ...config, port: value as number })}
              type="number"
            />

            <FormField
              id="user"
              label="Usuário/E-mail"
              placeholder="seu-email@gmail.com"
              value={config.user}
              onChange={(value) => setConfig({ ...config, user: value as string })}
              type="email"
              icon={Mail}
              required
            />

            <FormField
              id="password"
              label="Senha/App Password"
              placeholder="••••••••"
              value={config.password}
              onChange={(value) => setConfig({ ...config, password: value as string })}
              type="password"
              icon={Lock}
              required
            />

            <FormField
              id="fromName"
              label="Nome do Remetente"
              placeholder="Sua Empresa"
              value={config.fromName}
              onChange={(value) => setConfig({ ...config, fromName: value as string })}
            />

            <FormField
              id="fromEmail"
              label="E-mail do Remetente"
              placeholder="noreply@suaempresa.com"
              value={config.fromEmail}
              onChange={(value) => setConfig({ ...config, fromEmail: value as string })}
              type="email"
              required
            />
          </div>

          <SSLToggle
            checked={config.secure}
            onCheckedChange={(checked) => setConfig({ ...config, secure: checked })}
          />

          <ActionButtons
            onSave={() => {}}
            onTest={handleTestConnection}
          />
        </form>
      </CardContent>
    </Card>
  );
}

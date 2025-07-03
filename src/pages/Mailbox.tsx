
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Settings, FileText, Send } from 'lucide-react';
import { SMTPConfigForm } from '@/components/Mailbox/SMTPConfigForm';
import { EmailJSConfigForm } from '@/components/Mailbox/EmailJSConfigForm';
import { ComposeEmail } from '@/components/Mailbox/ComposeEmail';
import { EmailTemplates } from '@/components/Mailbox/EmailTemplates';
import { SMTPConfig, EmailJSConfig, loadSMTPConfig, loadEmailJSConfig, validateEmailJSConfig, validateSMTPConfig } from '@/utils/emailService';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
}

export default function Mailbox() {
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig | null>(null);
  const [emailJSConfig, setEmailJSConfig] = useState<EmailJSConfig | null>(null);
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  useEffect(() => {
    const smtp = loadSMTPConfig();
    const emailjs = loadEmailJSConfig();
    
    if (smtp) setSMTPConfig(smtp);
    if (emailjs) setEmailJSConfig(emailjs);
    
    // Se não há configuração do EmailJS, começar pela aba de configuração
    if (!emailjs) {
      setActiveTab('emailjs-config');
    }
  }, []);

  const handleSMTPConfigSaved = (config: SMTPConfig) => {
    setSMTPConfig(config);
    setActiveTab('compose');
  };

  const handleEmailJSConfigSaved = (config: EmailJSConfig) => {
    setEmailJSConfig(config);
    setActiveTab('compose');
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    console.log('Template selecionado na página principal:', template.name);
    setSelectedTemplate(template);
    setActiveTab('compose');
  };

  const handleTemplateClear = () => {
    setSelectedTemplate(null);
  };

  // Verificar se o EmailJS está configurado corretamente
  const isEmailJSConfigured = emailJSConfig && validateEmailJSConfig(emailJSConfig).length === 0;
  
  // Verificar se os dados do remetente estão configurados (apenas nome e email são obrigatórios)
  const isSenderConfigured = smtpConfig && smtpConfig.fromName && smtpConfig.fromEmail && validateSMTPConfig(smtpConfig).length === 0;
  
  // Sistema está configurado se EmailJS e dados do remetente estão ok
  const isConfigured = isEmailJSConfigured && isSenderConfigured;

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mailbox</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sistema de envio de e-mails via EmailJS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="compose" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Compor E-mail</span>
            <span className="sm:hidden">Compor</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
            <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="emailjs-config" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
            EmailJS
          </TabsTrigger>
          <TabsTrigger value="smtp-config" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Remetente</span>
            <span className="sm:hidden">Config</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4 sm:space-y-6">
          <ComposeEmail 
            smtpConfig={smtpConfig} 
            emailJSConfig={emailJSConfig} 
            selectedTemplate={selectedTemplate}
            onTemplateClear={handleTemplateClear}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 sm:space-y-6">
          <EmailTemplates onSelectTemplate={handleTemplateSelect} />
        </TabsContent>

        <TabsContent value="emailjs-config" className="space-y-4 sm:space-y-6">
          <EmailJSConfigForm onConfigSaved={handleEmailJSConfigSaved} />
        </TabsContent>

        <TabsContent value="smtp-config" className="space-y-4 sm:space-y-6">
          <SMTPConfigForm onConfigSaved={handleSMTPConfigSaved} />
        </TabsContent>
      </Tabs>

      {!isConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">Configuração necessária</span>
          </div>
          <div className="text-xs sm:text-sm text-amber-700 mt-1 space-y-1">
            {!isEmailJSConfigured && (
              <p>• Configure o EmailJS com Service ID, Template ID e User ID válidos</p>
            )}
            {!isSenderConfigured && (
              <p>• Configure os dados do remetente (nome e e-mail)</p>
            )}
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">Sistema configurado</span>
          </div>
          <p className="text-xs sm:text-sm text-green-700 mt-1">
            EmailJS e dados do remetente configurados. Você pode enviar e-mails agora!
          </p>
        </div>
      )}
    </div>
  );
}

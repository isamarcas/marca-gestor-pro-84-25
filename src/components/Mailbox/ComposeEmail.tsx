
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { SMTPConfig, EmailJSConfig, validateSMTPConfig, validateEmailJSConfig } from '@/utils/emailService';
import { useEmailForm } from './hooks/useEmailForm';
import { useEmailSubmit } from './hooks/useEmailSubmit';
import { EmailFormFields } from './components/EmailFormFields';
import { TemplateIndicator } from './components/TemplateIndicator';
import { ConfigurationWarning } from './components/ConfigurationWarning';
import { EmailSubmitButton } from './components/EmailSubmitButton';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
}

interface ComposeEmailProps {
  smtpConfig: SMTPConfig | null;
  emailJSConfig: EmailJSConfig | null;
  selectedTemplate?: EmailTemplate | null;
  onTemplateClear?: () => void;
}

export function ComposeEmail({ smtpConfig, emailJSConfig, selectedTemplate, onTemplateClear }: ComposeEmailProps) {
  const {
    emailData,
    setEmailData,
    isTemplateModified,
    handleMessageChange,
    resetForm
  } = useEmailForm(selectedTemplate);

  const { handleSubmit, isLoading } = useEmailSubmit(smtpConfig, emailJSConfig, resetForm);

  useEffect(() => {
    if (selectedTemplate) {
      setEmailData(prev => ({
        ...prev,
        subject: selectedTemplate.subject,
        html: selectedTemplate.html,
        text: selectedTemplate.html
      }));
      
      resetForm();
    }
  }, [selectedTemplate, resetForm, setEmailData]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(emailData);
  };

  const smtpErrors = smtpConfig ? validateSMTPConfig(smtpConfig) : [];
  const emailJSErrors = emailJSConfig ? validateEmailJSConfig(emailJSConfig) : [];
  const allErrors = [...smtpErrors, ...emailJSErrors];
  const hasErrors = allErrors.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Compor E-mail
          <TemplateIndicator 
            selectedTemplate={selectedTemplate}
            isTemplateModified={isTemplateModified}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ConfigurationWarning errors={allErrors} />

        <form onSubmit={onSubmit} className="space-y-4">
          <EmailFormFields
            emailData={emailData}
            setEmailData={setEmailData}
            onMessageChange={handleMessageChange}
            isTemplateModified={isTemplateModified}
          />

          <EmailSubmitButton
            isLoading={isLoading}
            smtpConfig={smtpConfig}
            emailJSConfig={emailJSConfig}
            hasErrors={hasErrors}
          />
        </form>
      </CardContent>
    </Card>
  );
}

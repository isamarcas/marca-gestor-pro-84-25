
import { useState } from 'react';
import { SMTPConfig, EmailJSConfig, sendEmail, validateSMTPConfig, validateEmailJSConfig } from '@/utils/emailService';
import { useToast } from '@/hooks/use-toast';
import { EmailData } from '@/utils/email/types';

export function useEmailSubmit(
  smtpConfig: SMTPConfig | null,
  emailJSConfig: EmailJSConfig | null,
  onSuccess: () => void
) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (emailData: EmailData) => {
    if (!smtpConfig || !emailJSConfig) {
      toast({
        title: "Erro",
        description: "Configure primeiro o EmailJS e os dados do remetente",
        variant: "destructive"
      });
      return;
    }

    const smtpErrors = validateSMTPConfig(smtpConfig);
    const emailJSErrors = validateEmailJSConfig(emailJSConfig);
    
    if (smtpErrors.length > 0 || emailJSErrors.length > 0) {
      toast({
        title: "Configuração inválida",
        description: [...smtpErrors, ...emailJSErrors].join(', '),
        variant: "destructive"
      });
      return;
    }

    const trimmedTo = emailData.to?.trim() || '';
    const trimmedSubject = emailData.subject?.trim() || '';
    const trimmedHtml = emailData.html?.trim() || '';
    
    if (!trimmedTo || !trimmedSubject || !trimmedHtml) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedTo)) {
      toast({
        title: "Erro",
        description: "Formato do e-mail destinatário é inválido",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const cleanEmailData = {
        to: trimmedTo,
        subject: trimmedSubject,
        html: trimmedHtml,
        text: trimmedHtml
      };
      
      await sendEmail(cleanEmailData, smtpConfig);
      
      toast({
        title: "E-mail enviado!",
        description: `E-mail enviado com sucesso para ${trimmedTo}`
      });

      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Falha ao enviar o e-mail";
      
      toast({
        title: "Erro ao enviar",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
}

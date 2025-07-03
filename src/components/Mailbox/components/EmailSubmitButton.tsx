
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { SMTPConfig, EmailJSConfig } from '@/utils/emailService';

interface EmailSubmitButtonProps {
  isLoading: boolean;
  smtpConfig: SMTPConfig | null;
  emailJSConfig: EmailJSConfig | null;
  hasErrors: boolean;
}

export function EmailSubmitButton({ 
  isLoading, 
  smtpConfig, 
  emailJSConfig, 
  hasErrors 
}: EmailSubmitButtonProps) {
  return (
    <div className="space-y-3">
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !smtpConfig || !emailJSConfig || hasErrors}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enviando via EmailJS...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Enviar E-mail
          </>
        )}
      </Button>

      {(!smtpConfig || !emailJSConfig) && (
        <p className="text-sm text-amber-600 text-center">
          ⚠️ Configure primeiro o EmailJS e os dados do remetente
        </p>
      )}
      
      {hasErrors && (
        <p className="text-sm text-red-600 text-center">
          ⚠️ Corrija os erros na configuração antes de enviar
        </p>
      )}
    </div>
  );
}

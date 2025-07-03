
import emailjs from 'emailjs-com';
import { EmailData, SMTPConfig, EmailJSConfig } from './types';
import { validateSMTPConfig, validateEmailJSConfig, isValidEmail } from './validation';

export const sendEmail = async (
  emailData: EmailData, 
  smtpConfig: SMTPConfig, 
  emailJSConfig?: EmailJSConfig
): Promise<void> => {
  // Validar dados
  const smtpErrors = validateSMTPConfig(smtpConfig);
  if (smtpErrors.length > 0) {
    throw new Error(`Configuração SMTP inválida: ${smtpErrors.join(', ')}`);
  }

  if (!emailData.to?.trim()) {
    throw new Error('E-mail destinatário é obrigatório');
  }

  if (!isValidEmail(emailData.to)) {
    throw new Error('E-mail destinatário deve ter formato válido');
  }

  if (!emailData.subject?.trim()) {
    throw new Error('Assunto é obrigatório');
  }

  if (!emailData.html?.trim()) {
    throw new Error('Conteúdo do e-mail é obrigatório');
  }

  console.log('Enviando e-mail:', {
    to: emailData.to,
    subject: emailData.subject,
    fromName: smtpConfig.fromName,
    fromEmail: smtpConfig.fromEmail
  });

  // Se tiver configuração EmailJS, usar EmailJS
  if (emailJSConfig) {
    const emailJSErrors = validateEmailJSConfig(emailJSConfig);
    if (emailJSErrors.length > 0) {
      throw new Error(`Configuração EmailJS inválida: ${emailJSErrors.join(', ')}`);
    }

    try {
      const templateParams = {
        to_email: emailData.to,
        subject: emailData.subject,
        message: emailData.html,
        from_name: smtpConfig.fromName,
        from_email: smtpConfig.fromEmail,
        reply_to: smtpConfig.fromEmail
      };

      const response = await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams,
        emailJSConfig.userId
      );

      console.log('E-mail enviado via EmailJS:', response);
      return;
    } catch (error) {
      console.error('Erro ao enviar via EmailJS:', error);
      throw new Error('Falha ao enviar e-mail via EmailJS. Verifique as configurações.');
    }
  }

  // Fallback: tentar envio via API local
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        smtpConfig
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('E-mail enviado via API local:', result);
  } catch (error) {
    console.error('Erro ao enviar via API local:', error);
    throw new Error('Falha ao enviar e-mail. Verifique a configuração do servidor SMTP.');
  }
};

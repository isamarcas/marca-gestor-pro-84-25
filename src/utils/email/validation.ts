
import { SMTPConfig, EmailJSConfig } from './types';

export const validateSMTPConfig = (config: SMTPConfig): string[] => {
  const errors: string[] = [];
  
  if (!config.host?.trim()) {
    errors.push('Host SMTP é obrigatório');
  }
  
  if (!config.port || config.port < 1 || config.port > 65535) {
    errors.push('Porta deve estar entre 1 e 65535');
  }
  
  if (!config.user?.trim()) {
    errors.push('Usuário é obrigatório');
  }
  
  if (!config.password?.trim()) {
    errors.push('Senha é obrigatória');
  }
  
  if (!config.fromEmail?.trim()) {
    errors.push('E-mail do remetente é obrigatório');
  } else if (!isValidEmail(config.fromEmail)) {
    errors.push('E-mail do remetente deve ter formato válido');
  }
  
  if (!config.fromName?.trim()) {
    errors.push('Nome do remetente é obrigatório');
  }
  
  return errors;
};

export const validateEmailJSConfig = (config: EmailJSConfig): string[] => {
  const errors: string[] = [];
  
  if (!config.serviceId?.trim()) {
    errors.push('Service ID do EmailJS é obrigatório');
  }
  
  if (!config.templateId?.trim()) {
    errors.push('Template ID do EmailJS é obrigatório');
  }
  
  if (!config.userId?.trim()) {
    errors.push('User ID do EmailJS é obrigatório');
  }
  
  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

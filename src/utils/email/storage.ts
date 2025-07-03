
import { SMTPConfig, EmailJSConfig } from './types';

const SMTP_STORAGE_KEY = 'smtp_config';
const EMAILJS_STORAGE_KEY = 'emailjs_config';

let configCache: {
  smtp?: SMTPConfig;
  emailjs?: EmailJSConfig;
} = {};

export const loadSMTPConfig = (): SMTPConfig | null => {
  if (configCache.smtp) {
    return configCache.smtp;
  }

  try {
    const saved = localStorage.getItem(SMTP_STORAGE_KEY);
    if (saved) {
      const config = JSON.parse(saved);
      configCache.smtp = config;
      return config;
    }
  } catch (error) {
    console.error('Erro ao carregar configuração SMTP:', error);
  }
  
  return null;
};

export const saveSMTPConfig = (config: SMTPConfig): void => {
  try {
    localStorage.setItem(SMTP_STORAGE_KEY, JSON.stringify(config));
    configCache.smtp = config;
    console.log('Configuração SMTP salva com sucesso');
  } catch (error) {
    console.error('Erro ao salvar configuração SMTP:', error);
    throw new Error('Falha ao salvar configuração SMTP');
  }
};

export const loadEmailJSConfig = (): EmailJSConfig | null => {
  if (configCache.emailjs) {
    return configCache.emailjs;
  }

  try {
    const saved = localStorage.getItem(EMAILJS_STORAGE_KEY);
    if (saved) {
      const config = JSON.parse(saved);
      configCache.emailjs = config;
      return config;
    }
  } catch (error) {
    console.error('Erro ao carregar configuração EmailJS:', error);
  }
  
  return null;
};

export const saveEmailJSConfig = (config: EmailJSConfig): void => {
  try {
    localStorage.setItem(EMAILJS_STORAGE_KEY, JSON.stringify(config));
    configCache.emailjs = config;
    console.log('Configuração EmailJS salva com sucesso');
  } catch (error) {
    console.error('Erro ao salvar configuração EmailJS:', error);
    throw new Error('Falha ao salvar configuração EmailJS');
  }
};

export const clearConfigCache = (): void => {
  configCache = {};
};

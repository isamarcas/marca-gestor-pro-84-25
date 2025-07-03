
export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromName: string;
  fromEmail: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  userId: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
  category?: string;
}


import { SMTPConfig } from '@/utils/emailService';

export interface SMTPFormProps {
  onConfigSaved: (config: SMTPConfig) => void;
}

export interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
}

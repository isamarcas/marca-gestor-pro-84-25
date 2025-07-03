
export interface FormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  empresa: string;
  cargo: string;
}

export interface PerfilFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  placeholder: string;
  type?: string;
  required?: boolean;
}

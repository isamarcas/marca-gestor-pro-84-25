
export const formatCpfCnpj = (value: string, tipo: 'pessoa_fisica' | 'pessoa_juridica') => {
  const cleanValue = value.replace(/\D/g, '');
  if (tipo === 'pessoa_fisica') {
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatCEP = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatTelefone = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const removeFormatting = (value: string) => {
  return value.replace(/\D/g, '');
};

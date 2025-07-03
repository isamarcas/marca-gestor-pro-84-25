
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const getOrigemInfo = (origem: string) => {
  if (origem === 'formulario') {
    return {
      label: 'Formulário Web',
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300',
      icon: 'Globe'
    };
  }
  return {
    label: 'Cadastro Manual',
    variant: 'secondary' as const,
    className: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300',
    icon: 'User'
  };
};

export const getTipoClienteInfo = (tipo: string) => {
  if (tipo === 'pessoa_fisica') {
    return {
      label: 'Pessoa Física',
      className: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg',
      icon: 'User'
    };
  }
  return {
    label: 'Pessoa Jurídica',
    className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg',
    icon: 'Building'
  };
};

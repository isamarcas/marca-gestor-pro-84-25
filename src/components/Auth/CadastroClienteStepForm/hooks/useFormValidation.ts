
import { FormData, FormErrors } from '../types';

export function useFormValidation() {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPFCNPJ = (cpfCnpj: string): boolean => {
    const cleanValue = cpfCnpj.replace(/\D/g, '');
    return cleanValue.length === 11 || cleanValue.length === 14;
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  };

  const validateCurrentStep = (currentStep: number, formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    switch (currentStep) {
      case 1: // Dados Básicos
        if (formData.tipoCliente === 'pessoa_juridica' && !formData.razaoSocial.trim()) {
          newErrors.razaoSocial = 'Razão Social é obrigatória para pessoa jurídica';
        }

        if (!formData.nome.trim()) {
          newErrors.nome = 'Nome é obrigatório';
        } else if (formData.nome.trim().length < 2) {
          newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
        }

        if (!formData.cpfCnpj.trim()) {
          newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
        } else if (!validateCPFCNPJ(formData.cpfCnpj)) {
          newErrors.cpfCnpj = 'CPF/CNPJ inválido';
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Email inválido';
        }

        if (!formData.telefone.trim()) {
          newErrors.telefone = 'Telefone é obrigatório';
        } else if (!validatePhone(formData.telefone)) {
          newErrors.telefone = 'Telefone inválido';
        }

        if (formData.tipoCliente === 'pessoa_juridica' && !formData.representanteLegal.trim()) {
          newErrors.representanteLegal = 'Representante legal é obrigatório para pessoa jurídica';
        }
        break;

      case 2: // Dados Pessoais
        if (!formData.nacionalidade.trim()) {
          newErrors.nacionalidade = 'Nacionalidade é obrigatória';
        }
        if (!formData.profissao.trim()) {
          newErrors.profissao = 'Profissão é obrigatória';
        }
        if (!formData.estadoCivil) {
          newErrors.estadoCivil = 'Estado civil é obrigatório';
        }
        if (!formData.rg.trim()) {
          newErrors.rg = 'RG é obrigatório';
        }
        if (!formData.orgaoEmissor.trim()) {
          newErrors.orgaoEmissor = 'Órgão emissor é obrigatório';
        }
        break;

      case 3: // Endereço
        if (!formData.rua.trim()) {
          newErrors.rua = 'Rua/Avenida é obrigatória';
        }
        if (!formData.numero.trim()) {
          newErrors.numero = 'Número é obrigatório';
        }
        if (!formData.bairro.trim()) {
          newErrors.bairro = 'Bairro é obrigatório';
        }
        if (!formData.cidade.trim()) {
          newErrors.cidade = 'Cidade é obrigatória';
        }
        if (!formData.estado) {
          newErrors.estado = 'Estado é obrigatório';
        }
        if (!formData.cep.trim()) {
          newErrors.cep = 'CEP é obrigatório';
        } else if (!validateCEP(formData.cep)) {
          newErrors.cep = 'CEP inválido';
        }
        break;

      case 4: // Credenciais
        if (!formData.senha) {
          newErrors.senha = 'Senha é obrigatória';
        } else if (formData.senha.length < 6) {
          newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (!formData.confirmarSenha) {
          newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
        } else if (formData.senha !== formData.confirmarSenha) {
          newErrors.confirmarSenha = 'Senhas não coincidem';
        }
        break;
    }

    return newErrors;
  };

  return {
    validateEmail,
    validateCPFCNPJ,
    validatePhone,
    validateCEP,
    validateCurrentStep,
  };
}

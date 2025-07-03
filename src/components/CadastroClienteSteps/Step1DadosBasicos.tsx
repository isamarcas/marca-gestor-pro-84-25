
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { formatCpfCnpj, formatTelefone, removeFormatting } from '@/utils/inputMasks';
import { CadastroClienteFormData } from '@/components/CadastroCliente/types';

interface Step1Props {
  form: UseFormReturn<CadastroClienteFormData>;
  onNext: () => void;
}

export function Step1DadosBasicos({ form, onNext }: Step1Props) {
  const tipoCliente = form.watch('tipoCliente');

  const validateCpfCnpj = (value: string) => {
    if (!value) return 'Campo obrigatório';
    const cleanValue = removeFormatting(value);
    if (tipoCliente === 'pessoa_fisica') {
      return cleanValue.length === 11 || 'CPF deve ter 11 dígitos';
    }
    return cleanValue.length === 14 || 'CNPJ deve ter 14 dígitos';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Campo obrigatório';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email inválido';
  };

  const validateTelefone = (value: string) => {
    if (!value) return 'Campo obrigatório';
    const cleanValue = removeFormatting(value);
    return (cleanValue.length >= 10 && cleanValue.length <= 11) || 'Telefone inválido';
  };

  const handleNext = () => {
    // Validar campos obrigatórios
    const nome = form.getValues('nome');
    const cpfCnpj = form.getValues('cpfCnpj');
    const email = form.getValues('email');
    const telefone = form.getValues('telefone');

    if (!nome || !cpfCnpj || !email || !telefone) {
      form.trigger(['nome', 'cpfCnpj', 'email', 'telefone']);
      return;
    }

    if (validateCpfCnpj(cpfCnpj) !== true || validateEmail(email) !== true || validateTelefone(telefone) !== true) {
      form.trigger(['cpfCnpj', 'email', 'telefone']);
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Dados Básicos</h2>
      </div>

      <FormField
        control={form.control}
        name="tipoCliente"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Cliente *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nome"
        rules={{ required: 'Campo obrigatório', minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }}}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{tipoCliente === 'pessoa_fisica' ? 'Nome Completo' : 'Razão Social'} *</FormLabel>
            <FormControl>
              <Input 
                placeholder={tipoCliente === 'pessoa_fisica' ? 'Digite o nome completo' : 'Digite a razão social'} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cpfCnpj"
        rules={{ validate: validateCpfCnpj }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{tipoCliente === 'pessoa_fisica' ? 'CPF' : 'CNPJ'} *</FormLabel>
            <FormControl>
              <Input 
                placeholder={tipoCliente === 'pessoa_fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                value={field.value}
                onChange={(e) => field.onChange(formatCpfCnpj(e.target.value, tipoCliente))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          rules={{ validate: validateEmail }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          rules={{ validate: validateTelefone }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="(00) 00000-0000"
                  value={field.value}
                  onChange={(e) => field.onChange(formatTelefone(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
        </Button>
      </div>
    </div>
  );
}

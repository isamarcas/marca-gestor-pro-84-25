
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { formatCpfCnpj, formatTelefone } from '@/utils/inputMasks';
import { StepProps } from './types';

export function Step1DadosBasicos({ form, onNext, isFirst }: StepProps) {
  const tipoCliente = form.watch('tipoCliente');

  const validateStep = () => {
    const values = form.getValues();
    if (!values.nome || !values.email || !values.telefone || !values.cpfCnpj || !values.tipoCliente) {
      return false;
    }
    if (tipoCliente === 'pessoa_juridica' && !values.razaoSocial) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    } else {
      form.trigger(['nome', 'email', 'telefone', 'cpfCnpj', 'tipoCliente', 'razaoSocial']);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Dados Básicos</h3>
      </div>

      <FormField
        control={form.control}
        name="tipoCliente"
        rules={{ required: 'Selecione o tipo de cliente' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Cliente *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
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
        rules={{ required: 'Nome é obrigatório', minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }}}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{tipoCliente === 'pessoa_fisica' ? 'Nome Completo' : 'Nome Fantasia'} *</FormLabel>
            <FormControl>
              <Input placeholder={tipoCliente === 'pessoa_fisica' ? 'Digite o nome completo' : 'Digite o nome fantasia'} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {tipoCliente === 'pessoa_juridica' && (
        <FormField
          control={form.control}
          name="razaoSocial"
          rules={{ required: 'Razão Social é obrigatória' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social *</FormLabel>
              <FormControl>
                <Input placeholder="Digite a razão social" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="cpfCnpj"
        rules={{ required: `${tipoCliente === 'pessoa_fisica' ? 'CPF' : 'CNPJ'} é obrigatório` }}
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
          rules={{ 
            required: 'E-mail é obrigatório',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' }
          }}
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
          rules={{ required: 'Telefone é obrigatório' }}
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

      <div className="flex justify-end pt-6">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
        </Button>
      </div>
    </div>
  );
}

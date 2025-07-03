
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCpfCnpj, formatTelefone, removeFormatting } from '@/utils/inputMasks';
import type { NovoClienteFormData } from '../types';

interface ClienteFormFieldsProps {
  form: UseFormReturn<NovoClienteFormData>;
}

export function ClienteFormFields({ form }: ClienteFormFieldsProps) {
  const tipoCliente = form.watch('tipoCliente');

  const validateCpfCnpj = (value: string) => {
    if (!value) return 'Campo obrigatório';
    const cleanValue = removeFormatting(value);
    if (tipoCliente === 'pessoa_fisica') {
      return cleanValue.length === 11 || 'CPF deve ter 11 dígitos';
    }
    return cleanValue.length === 14 || 'CNPJ deve ter 14 dígitos';
  };

  const validateTelefone = (value: string) => {
    if (!value) return 'Campo obrigatório';
    const cleanValue = removeFormatting(value);
    return (cleanValue.length >= 10 && cleanValue.length <= 11) || 'Telefone inválido';
  };

  return (
    <div className="space-y-4 p-1">
      <h3 className="text-lg font-medium">Informações Básicas</h3>
      
      <FormField
        control={form.control}
        name="tipoCliente"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Cliente</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue /></SelectTrigger>
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
            <FormLabel>{tipoCliente === 'pessoa_fisica' ? 'Nome Completo' : 'Razão Social'}</FormLabel>
            <FormControl>
              <Input placeholder={tipoCliente === 'pessoa_fisica' ? 'Digite o nome completo' : 'Digite a razão social'} {...field} />
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
            <FormLabel>{tipoCliente === 'pessoa_fisica' ? 'CPF' : 'CNPJ'}</FormLabel>
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
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
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
              <FormLabel>Telefone</FormLabel>
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

      {tipoCliente === 'pessoa_juridica' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="representanteLegal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Representante Legal</FormLabel>
                <FormControl><Input placeholder="Nome do responsável" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="segmentoAtuacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento de Atuação</FormLabel>
                <FormControl><Input placeholder="Ex: Tecnologia" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="space-y-4 pt-4 border-t p-1">
        <h3 className="text-lg font-medium">Informações Adicionais</h3>
        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl><Textarea placeholder="Informações adicionais sobre o cliente..." className="resize-none" rows={3} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

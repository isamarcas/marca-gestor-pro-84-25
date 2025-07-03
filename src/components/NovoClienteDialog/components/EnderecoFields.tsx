
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
import { formatCEP, removeFormatting } from '@/utils/inputMasks';
import type { NovoClienteFormData } from '../types';

interface EnderecoFieldsProps {
  form: UseFormReturn<NovoClienteFormData>;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export function EnderecoFields({ form }: EnderecoFieldsProps) {
  const validateCep = (value: string) => {
    if (!value) return 'Campo obrigatório';
    return removeFormatting(value).length === 8 || 'CEP deve ter 8 dígitos';
  };

  return (
    <div className="space-y-4 pt-4 border-t p-1">
      <h3 className="text-lg font-medium">Endereço</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FormField 
            control={form.control} 
            name="endereco.rua" 
            rules={{ required: 'Campo obrigatório' }} 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua/Avenida</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField 
          control={form.control} 
          name="endereco.numero" 
          rules={{ required: 'Campo obrigatório' }} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          control={form.control} 
          name="endereco.bairro" 
          rules={{ required: 'Campo obrigatório' }} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Nome do bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="endereco.cidade" 
          rules={{ required: 'Campo obrigatório' }} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Nome da cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          control={form.control} 
          name="endereco.estado" 
          rules={{ required: 'Estado é obrigatório' }} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="endereco.cep" 
          rules={{ validate: validateCep }} 
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input 
                  placeholder="00000-000" 
                  value={field.value} 
                  onChange={(e) => field.onChange(formatCEP(e.target.value))} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

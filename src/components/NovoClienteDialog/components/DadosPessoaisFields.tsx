
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
import { IdCard } from 'lucide-react';
import type { NovoClienteFormData } from '../types';

interface DadosPessoaisFieldsProps {
  form: UseFormReturn<NovoClienteFormData>;
}

export function DadosPessoaisFields({ form }: DadosPessoaisFieldsProps) {
  const tipoCliente = form.watch('tipoCliente');

  return (
    <div className="space-y-4 pt-4 border-t p-1">
      <h3 className="flex items-center gap-2 text-lg font-medium">
        <IdCard className="h-5 w-5" />
        {tipoCliente === 'pessoa_juridica' ? 'Dados do Representante Legal' : 'Dados Pessoais'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          control={form.control} 
          name="nacionalidade" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Brasileira" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="profissao" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Advogado(a)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField 
          control={form.control} 
          name="estadoCivil" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                  <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                  <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  <SelectItem value="uniao_estavel">União Estável</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="rg" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000-0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="orgaoEmissor" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Órgão Emissor</FormLabel>
              <FormControl>
                <Input placeholder="SSP/SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

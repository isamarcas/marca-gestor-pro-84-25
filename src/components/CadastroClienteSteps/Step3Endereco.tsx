
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { formatCEP, removeFormatting } from '@/utils/inputMasks';
import { CadastroClienteFormData } from '@/components/CadastroCliente/types';

interface Step3Props {
  form: UseFormReturn<CadastroClienteFormData>;
  onNext: () => void;
  onPrev: () => void;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export function Step3Endereco({ form, onNext, onPrev }: Step3Props) {
  const validateCep = (value: string) => {
    if (!value) return 'Campo obrigatório';
    return removeFormatting(value).length === 8 || 'CEP deve ter 8 dígitos';
  };

  const handleNext = () => {
    // Validar campos obrigatórios do endereço
    const rua = form.getValues('endereco.rua');
    const numero = form.getValues('endereco.numero');
    const bairro = form.getValues('endereco.bairro');
    const cidade = form.getValues('endereco.cidade');
    const estado = form.getValues('endereco.estado');
    const cep = form.getValues('endereco.cep');

    if (!rua || !numero || !bairro || !cidade || !estado || !cep) {
      form.trigger(['endereco.rua', 'endereco.numero', 'endereco.bairro', 'endereco.cidade', 'endereco.estado', 'endereco.cep']);
      return;
    }

    if (validateCep(cep) !== true) {
      form.trigger(['endereco.cep']);
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Endereço</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="endereco.rua"
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua/Avenida *</FormLabel>
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
              <FormLabel>Número *</FormLabel>
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
              <FormLabel>Bairro *</FormLabel>
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
              <FormLabel>Cidade *</FormLabel>
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
              <FormLabel>Estado *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
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
              <FormLabel>CEP *</FormLabel>
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

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Anterior
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
        </Button>
      </div>
    </div>
  );
}

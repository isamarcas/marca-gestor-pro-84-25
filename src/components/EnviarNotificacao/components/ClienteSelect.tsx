
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormData } from '../types';

interface Cliente {
  id: string;
  nome: string;
}

interface ClienteSelectProps {
  control: Control<FormData>;
  clientes: Cliente[];
}

export function ClienteSelect({ control, clientes }: ClienteSelectProps) {
  return (
    <FormField
      control={control}
      name="clienteId"
      rules={{ required: 'Selecione um cliente' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cliente</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              {clientes.length === 0 ? (
                <SelectItem value="none" disabled>
                  Nenhum cliente encontrado
                </SelectItem>
              ) : (
                clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

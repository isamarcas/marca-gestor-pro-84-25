
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormData } from '../types';

interface CategoriaSelectProps {
  control: Control<FormData>;
}

export function CategoriaSelect({ control }: CategoriaSelectProps) {
  return (
    <FormField
      control={control}
      name="categoria"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              <SelectItem value="prazo">Prazo</SelectItem>
              <SelectItem value="documento">Documento</SelectItem>
              <SelectItem value="processo">Processo</SelectItem>
              <SelectItem value="pagamento">Pagamento</SelectItem>
              <SelectItem value="geral">Geral</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

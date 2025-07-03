
import React from 'react';
import { User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cliente } from '../types';

interface ClienteSelectProps {
  value: string;
  onChange: (value: string) => void;
  clientes: Cliente[];
}

export function ClienteSelect({ value, onChange, clientes }: ClienteSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
        <User className="h-4 w-4 text-emerald-600" />
        Cliente
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
          <SelectValue placeholder="Selecione o cliente" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
          {clientes.map((cliente) => (
            <SelectItem key={cliente.id} value={cliente.id} className="hover:bg-emerald-50">
              {cliente.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

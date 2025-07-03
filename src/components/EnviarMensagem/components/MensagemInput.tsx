
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MensagemInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function MensagemInput({ value, onChange }: MensagemInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        Mensagem
      </label>
      <Textarea
        placeholder="Digite sua mensagem aqui..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
      />
    </div>
  );
}

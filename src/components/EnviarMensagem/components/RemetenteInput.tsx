
import React from 'react';
import { Input } from '@/components/ui/input';

interface RemetenteInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function RemetenteInput({ value, onChange }: RemetenteInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        Remetente
      </label>
      <Input
        placeholder="Seu nome ou departamento"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
}


import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormFieldProps } from '../types';

export function FormField({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text", 
  icon: Icon,
  required = false 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
          className={Icon ? "pl-10" : ""}
        />
      </div>
    </div>
  );
}

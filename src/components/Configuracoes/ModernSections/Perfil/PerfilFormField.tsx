
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PerfilFormFieldProps } from './perfilTypes';

export function PerfilFormField({
  id,
  label,
  value,
  onChange,
  disabled,
  placeholder,
  type = "text",
  required = false
}: PerfilFormFieldProps) {
  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className="space-y-2"
    >
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label} {required && '*'}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`transition-all ${disabled 
          ? 'bg-slate-50 border-slate-200' 
          : 'border-blue-300 focus:border-blue-500 bg-white'
        }`}
        placeholder={placeholder}
      />
    </motion.div>
  );
}

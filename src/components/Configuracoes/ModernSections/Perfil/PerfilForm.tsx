
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Check, X } from 'lucide-react';
import { PerfilFormField } from './PerfilFormField';
import { FormData } from './perfilTypes';

interface PerfilFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function PerfilForm({ 
  formData, 
  setFormData, 
  isEditing, 
  onSave, 
  onCancel 
}: PerfilFormProps) {
  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="h-6 w-6 text-blue-600" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerfilFormField
              id="nome"
              label="Nome Completo"
              value={formData.nome}
              onChange={updateField('nome')}
              disabled={!isEditing}
              placeholder="Seu nome completo"
              required
            />

            <PerfilFormField
              id="email"
              label="Email"
              value={formData.email}
              onChange={updateField('email')}
              disabled={!isEditing}
              placeholder="seu@email.com"
              type="email"
              required
            />

            <PerfilFormField
              id="telefone"
              label="Telefone"
              value={formData.telefone}
              onChange={updateField('telefone')}
              disabled={!isEditing}
              placeholder="(11) 99999-9999"
            />

            <PerfilFormField
              id="cargo"
              label="Cargo"
              value={formData.cargo}
              onChange={updateField('cargo')}
              disabled={!isEditing}
              placeholder="Seu cargo atual"
            />
          </div>

          <PerfilFormField
            id="endereco"
            label="Endereço"
            value={formData.endereco}
            onChange={updateField('endereco')}
            disabled={!isEditing}
            placeholder="Seu endereço completo"
          />

          <PerfilFormField
            id="empresa"
            label="Empresa"
            value={formData.empresa}
            onChange={updateField('empresa')}
            disabled={!isEditing}
            placeholder="Nome da sua empresa"
          />

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 pt-4 border-t border-slate-200"
            >
              <Button
                onClick={onSave}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="border-slate-300"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

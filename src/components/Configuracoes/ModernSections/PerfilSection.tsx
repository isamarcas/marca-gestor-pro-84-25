
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PerfilHeader } from './Perfil/PerfilHeader';
import { PerfilForm } from './Perfil/PerfilForm';
import { FormData } from './Perfil/perfilTypes';

export function PerfilSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: '',
    endereco: '',
    empresa: '',
    cargo: ''
  });

  const handleSave = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "❌ Erro de Validação",
        description: "Nome completo é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "❌ Erro de Validação",
        description: "Email válido é obrigatório",
        variant: "destructive"
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: "✅ Perfil Atualizado",
      description: "Suas informações foram salvas com sucesso!",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-6">
      <PerfilHeader
        formData={formData}
        isEditing={isEditing}
        onEditToggle={handleEditToggle}
        userRole={user?.role}
      />

      <PerfilForm
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

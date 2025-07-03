
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TarefaFormData, NovaTarefaData } from '../types';

export function useNovaTarefaForm() {
  const { toast } = useToast();

  const [formData, setFormData] = useState<TarefaFormData>({
    titulo: '',
    descricao: '',
    marcaId: '',
    responsavel: '',
    prazo: '',
    prioridade: 'media',
    tipoTarefa: 'outros',
    tempoEstimado: 0
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.titulo || !formData.marcaId || !formData.prazo || !formData.responsavel) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const createTarefaData = (): NovaTarefaData => {
    return {
      titulo: formData.titulo,
      descricao: formData.descricao,
      marcaId: formData.marcaId,
      responsavel: formData.responsavel,
      prazo: new Date(formData.prazo),
      prioridade: formData.prioridade,
      tipoTarefa: formData.tipoTarefa,
      status: 'pendente',
      tempoEstimado: formData.tempoEstimado || 0,
      anexos: [],
      comentarios: []
    };
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      marcaId: '',
      responsavel: '',
      prazo: '',
      prioridade: 'media',
      tipoTarefa: 'outros',
      tempoEstimado: 0
    });
  };

  return {
    formData,
    handleInputChange,
    validateForm,
    createTarefaData,
    resetForm
  };
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, FileText } from 'lucide-react';
import { useNovaTarefaForm } from './hooks/useNovaTarefaForm';
import { TarefaFormFields } from './components/TarefaFormFields';
import { FormActions } from './components/FormActions';
import { NovaTarefaModalProps } from './types';

export function NovaTarefaModal({ onAddTarefa }: NovaTarefaModalProps) {
  const [open, setOpen] = useState(false);
  const {
    formData,
    handleInputChange,
    validateForm,
    createTarefaData,
    resetForm
  } = useNovaTarefaForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const novaTarefa = createTarefaData();
    onAddTarefa(novaTarefa);
    
    resetForm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5" />
            Criar Nova Tarefa
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TarefaFormFields
            formData={formData}
            onInputChange={handleInputChange}
          />
          <FormActions onCancel={handleCancel} />
        </form>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useClienteForm } from './hooks/useClienteForm';
import { ClienteFormFields } from './components/ClienteFormFields';
import { DadosPessoaisFields } from './components/DadosPessoaisFields';
import { EnderecoFields } from './components/EnderecoFields';
import type { NovoClienteFormData } from './types';

interface NovoClienteDialogProps {
  onAddCliente: (cliente: Omit<NovoClienteFormData, 'portalId'>) => Promise<boolean>;
}

export function NovoClienteDialog({ onAddCliente }: NovoClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, onSubmit } = useClienteForm({
    onAddCliente,
    setIsSubmitting,
    setOpen
  });

  const handleSubmit = (data: NovoClienteFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <ClienteFormFields form={form} />
            <DadosPessoaisFields form={form} />
            <EnderecoFields form={form} />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-slate-900 hover:bg-slate-800">
                {isSubmitting ? 'Salvando...' : 'Cadastrar Cliente'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ClienteSelect } from './ClienteSelect';
import { CategoriaSelect } from './CategoriaSelect';
import { TipoSelect } from './TipoSelect';
import { useNotificacaoForm } from '../hooks/useNotificacaoForm';

interface NotificacaoFormProps {
  onClose: () => void;
}

export function NotificacaoForm({ onClose }: NotificacaoFormProps) {
  const { form, onSubmit, clientes } = useNotificacaoForm(onClose);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <ClienteSelect control={form.control} clientes={clientes} />
        <CategoriaSelect control={form.control} />
        <TipoSelect control={form.control} />

        <FormField
          control={form.control}
          name="titulo"
          rules={{ required: 'Título é obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da notificação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          rules={{ required: 'Mensagem é obrigatória' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Conteúdo da notificação"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}

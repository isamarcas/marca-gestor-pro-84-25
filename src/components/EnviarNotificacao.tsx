
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NotificacaoForm } from './EnviarNotificacao/components/NotificacaoForm';

export function EnviarNotificacao() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Enviar Notificação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar Notificação para Cliente</DialogTitle>
        </DialogHeader>
        
        <NotificacaoForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

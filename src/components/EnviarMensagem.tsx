
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogHeader } from './EnviarMensagem/components/DialogHeader';
import { ClienteSelect } from './EnviarMensagem/components/ClienteSelect';
import { RemetenteInput } from './EnviarMensagem/components/RemetenteInput';
import { MensagemInput } from './EnviarMensagem/components/MensagemInput';
import { ActionButtons } from './EnviarMensagem/components/ActionButtons';
import { useMensagemForm } from './EnviarMensagem/hooks/useMensagemForm';

export function EnviarMensagem() {
  const [open, setOpen] = useState(false);
  
  const {
    clienteSelecionado,
    setClienteSelecionado,
    remetente,
    setRemetente,
    mensagem,
    setMensagem,
    enviando,
    handleEnviar,
    clientes
  } = useMensagemForm(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Enviar Mensagem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader />
        
        <div className="space-y-6 py-4">
          <ClienteSelect 
            value={clienteSelecionado} 
            onChange={setClienteSelecionado} 
            clientes={clientes} 
          />
          
          <RemetenteInput 
            value={remetente} 
            onChange={setRemetente} 
          />

          <MensagemInput 
            value={mensagem} 
            onChange={setMensagem} 
          />

          <ActionButtons 
            onCancel={() => setOpen(false)}
            onSubmit={handleEnviar}
            isLoading={enviando}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

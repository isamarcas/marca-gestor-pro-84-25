
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';
import { useClientes } from '@/hooks/useClientes';
import { EmailData } from '@/utils/email/types';

interface EmailFormFieldsProps {
  emailData: EmailData;
  setEmailData: (data: EmailData) => void;
  onMessageChange: (value: string) => void;
  isTemplateModified: boolean;
}

export function EmailFormFields({ 
  emailData, 
  setEmailData, 
  onMessageChange, 
  isTemplateModified 
}: EmailFormFieldsProps) {
  const { clientes } = useClientes();

  const handleClientSelect = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      setEmailData({ ...emailData, to: cliente.email });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Selecionar Cliente</Label>
          <Select onValueChange={handleClientSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um cliente..." />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id}>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {cliente.nome} - {cliente.email}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">Para (E-mail) *</Label>
          <Input
            id="to"
            type="email"
            placeholder="destinatario@email.com"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Assunto *</Label>
        <Input
          id="subject"
          placeholder="Assunto do e-mail"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="html">
          Mensagem *
          {isTemplateModified && (
            <span className="text-sm text-blue-600 ml-2">
              (Conteúdo modificado - será enviado como digitado)
            </span>
          )}
        </Label>
        <Textarea
          id="html"
          placeholder="Digite sua mensagem aqui..."
          value={emailData.html}
          onChange={(e) => onMessageChange(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
    </>
  );
}

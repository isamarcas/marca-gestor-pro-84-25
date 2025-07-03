
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, User } from 'lucide-react';
import { Cliente } from '@/types';

interface AdicionarContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contratoTextoBase = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE PROPRIEDADE INTELECTUAL

CONTRATANTE: [Nome do Cliente]

CONTRATADA: SISTEMA DE GESTÃO DE MARCAS

1. DO OBJETO
O presente contrato tem por objeto a prestação de serviços especializados em propriedade intelectual, incluindo:
- Gestão e acompanhamento de processos de marcas junto ao INPI
- Consultoria em propriedade intelectual
- Monitoramento de prazos processuais
- Elaboração e apresentação de petições

2. DAS OBRIGAÇÕES DA CONTRATADA
A CONTRATADA obriga-se a:
- Prestar os serviços com zelo e diligência
- Manter absoluto sigilo sobre informações confidenciais
- Cumprir os prazos estabelecidos pelo INPI
- Informar o cliente sobre o andamento dos processos

3. DAS OBRIGAÇÕES DO CONTRATANTE
O CONTRATANTE obriga-se a:
- Fornecer todas as informações necessárias
- Efetuar os pagamentos nos prazos estabelecidos
- Colaborar com a execução dos serviços

4. DO PRAZO
Este contrato terá vigência de 12 (doze) meses, podendo ser renovado mediante acordo entre as partes.

5. DO VALOR E FORMA DE PAGAMENTO
Os valores dos serviços serão cobrados conforme tabela específica, com pagamento mensal.

6. DAS DISPOSIÇÕES GERAIS
O presente contrato é regido pelas leis brasileiras, sendo competente o foro da comarca de São Paulo.

São Paulo, ${new Date().toLocaleDateString('pt-BR')}

_____________________________        _____________________________
CONTRATADA                           CONTRATANTE`;

export function AdicionarContratoModal({ isOpen, onClose }: AdicionarContratoModalProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [contratoTexto, setContratoTexto] = useState(contratoTextoBase);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Carregar clientes do localStorage
      try {
        const clientesData = localStorage.getItem('clientes');
        if (clientesData) {
          const clientesList = JSON.parse(clientesData);
          setClientes(clientesList);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    }
  }, [isOpen]);

  const handleEnviarContrato = async () => {
    if (!clienteSelecionado) {
      toast({
        title: "Erro",
        description: "Selecione um cliente para enviar o contrato.",
        variant: "destructive"
      });
      return;
    }

    if (!contratoTexto.trim()) {
      toast({
        title: "Erro", 
        description: "O texto do contrato não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Criar objeto do contrato para o cliente
      const contratoParaCliente = {
        id: Date.now().toString(),
        clienteId: clienteSelecionado,
        contratoTexto: contratoTexto,
        dataEnvio: new Date().toISOString(),
        status: 'pendente'
      };

      // Salvar no localStorage
      const contratosEnviados = JSON.parse(localStorage.getItem('contratos_enviados') || '[]');
      contratosEnviados.push(contratoParaCliente);
      localStorage.setItem('contratos_enviados', JSON.stringify(contratosEnviados));

      const clienteNome = clientes.find(c => c.id === clienteSelecionado)?.nome || 'Cliente';
      
      toast({
        title: "Contrato Enviado!",
        description: `Contrato enviado com sucesso para ${clienteNome}.`
      });

      // Resetar formulário
      setClienteSelecionado('');
      setContratoTexto(contratoTextoBase);
      onClose();
    } catch (error) {
      console.error('Erro ao enviar contrato:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar o contrato. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Adicionar Contrato a Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-1">
          <div className="space-y-2">
            <Label htmlFor="cliente">Selecionar Cliente</Label>
            <Select value={clienteSelecionado} onValueChange={setClienteSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um cliente...">
                  {clienteSelecionado && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {clientes.find(c => c.id === clienteSelecionado)?.nome}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{cliente.nome}</p>
                        <p className="text-xs text-gray-500">{cliente.email}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contrato">Texto do Contrato</Label>
            <Textarea
              id="contrato"
              value={contratoTexto}
              onChange={(e) => setContratoTexto(e.target.value)}
              placeholder="Digite o texto do contrato..."
              className="min-h-[300px] text-sm"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">ℹ️ Informações Importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• O contrato será enviado para a área "Meus Documentos" do cliente selecionado</li>
              <li>• O cliente poderá visualizar e assinar o contrato digitalmente</li>
              <li>• Você será notificado quando o contrato for assinado</li>
              <li>• O texto "[Nome do Cliente]" será substituído automaticamente</li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEnviarContrato} 
              disabled={isLoading || !clienteSelecionado}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? 'Enviando...' : 'Enviar Contrato'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

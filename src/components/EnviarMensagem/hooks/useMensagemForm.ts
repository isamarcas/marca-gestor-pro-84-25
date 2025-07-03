
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { clientes } from '../data/clientes';
import { Mensagem } from '../types';

export function useMensagemForm(onClose: () => void) {
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [remetente, setRemetente] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleEnviar = async () => {
    if (!clienteSelecionado || !remetente || !mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setEnviando(true);

    try {
      // Simular envio da mensagem
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Criar a mensagem
      const novaMensagem: Mensagem = {
        id: Date.now().toString(),
        remetente,
        preview: mensagem.length > 50 ? mensagem.substring(0, 50) + '...' : mensagem,
        data: new Date(),
        lida: false,
      };

      console.log('useMensagemForm: Enviando mensagem para cliente:', clienteSelecionado);
      console.log('useMensagemForm: Dados da mensagem:', novaMensagem);

      // Salvar no localStorage para o cliente específico
      const mensagensKey = `mensagens_${clienteSelecionado}`;
      const mensagensExistentes = JSON.parse(localStorage.getItem(mensagensKey) || '[]');
      const novasMensagens = [novaMensagem, ...mensagensExistentes];
      localStorage.setItem(mensagensKey, JSON.stringify(novasMensagens));

      console.log('useMensagemForm: Mensagem salva com chave:', mensagensKey);
      console.log('useMensagemForm: Total de mensagens para este cliente:', novasMensagens.length);

      toast({
        title: "Mensagem enviada!",
        description: `Mensagem enviada para ${clientes.find(c => c.id === clienteSelecionado)?.nome}`,
      });

      // Limpar formulário
      setClienteSelecionado('');
      setRemetente('');
      setMensagem('');
      onClose();

      // Disparar evento customizado para forçar atualização do dashboard
      window.dispatchEvent(new CustomEvent('novaMensagemEnviada', { 
        detail: { clienteId: clienteSelecionado } 
      }));
    } catch (error) {
      console.error('useMensagemForm: Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return {
    clienteSelecionado,
    setClienteSelecionado,
    remetente,
    setRemetente,
    mensagem,
    setMensagem,
    enviando,
    handleEnviar,
    clientes
  };
}

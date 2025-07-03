
import { Licenca, AlertaLicenca } from '@/types';
import { adicionarNovaNotificacao } from '@/hooks/useNotificacoes/globalState';

export const verificarAlertasAutomaticos = (
  licencasList: Licenca[], 
  alertasExistentes: AlertaLicenca[]
): AlertaLicenca[] => {
  const hoje = new Date();
  const novosAlertas: AlertaLicenca[] = [];

  licencasList.forEach(licenca => {
    const dataVencimento = new Date(licenca.dataVencimento);
    const diasRestantes = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

    // Alerta 7 dias antes do vencimento
    if (diasRestantes === 7 && licenca.status === 'ativa') {
      const alertaExiste = alertasExistentes.some(
        a => a.licencaId === licenca.id && a.tipo === 'vencimento_proximo' && a.ativo
      );

      if (!alertaExiste) {
        const novoAlerta: AlertaLicenca = {
          id: `alerta_${licenca.id}_${Date.now()}`,
          licencaId: licenca.id,
          clienteId: licenca.clienteId,
          tipo: 'vencimento_proximo',
          titulo: 'Licença vence em 7 dias',
          mensagem: `Sua licença ${licenca.numeroLicenca} vencerá em 7 dias. Renove agora para manter o acesso ao sistema.`,
          dataAlerta: hoje,
          dataVencimento: licenca.dataVencimento,
          diasRestantes,
          lido: false,
          ativo: true,
        };

        novosAlertas.push(novoAlerta);

        // Adicionar notificação ao sistema
        adicionarNovaNotificacao({
          titulo: 'Licença vence em 7 dias',
          mensagem: novoAlerta.mensagem,
          tipo: 'warning',
          categoria: 'prazo',
          clienteId: licenca.clienteId,
          acaoRequerida: true,
          urlAcao: '/licencas/renovar',
          lida: false,
        });
      }
    }

    // Alerta licença vencida
    if (diasRestantes <= 0 && licenca.status === 'ativa') {
      const alertaExiste = alertasExistentes.some(
        a => a.licencaId === licenca.id && a.tipo === 'vencida' && a.ativo
      );

      if (!alertaExiste) {
        const novoAlerta: AlertaLicenca = {
          id: `alerta_vencida_${licenca.id}_${Date.now()}`,
          licencaId: licenca.id,
          clienteId: licenca.clienteId,
          tipo: 'vencida',
          titulo: 'Licença Vencida',
          mensagem: `Sua licença ${licenca.numeroLicenca} venceu. Renovação necessária para continuar usando o sistema.`,
          dataAlerta: hoje,
          dataVencimento: licenca.dataVencimento,
          diasRestantes: 0,
          lido: false,
          ativo: true,
        };

        novosAlertas.push(novoAlerta);

        // Adicionar notificação crítica
        adicionarNovaNotificacao({
          titulo: 'Licença Vencida',
          mensagem: novoAlerta.mensagem,
          tipo: 'error',
          categoria: 'prazo',
          clienteId: licenca.clienteId,
          acaoRequerida: true,
          urlAcao: '/licencas/renovar',
          lida: false,
        });
      }
    }
  });

  return novosAlertas;
};

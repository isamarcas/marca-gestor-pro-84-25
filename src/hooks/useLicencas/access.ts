
import { Licenca, StatusAcesso } from '@/types';

export const verificarStatusAcesso = (licencas: Licenca[], clienteId: string): StatusAcesso => {
  const licencaAtiva = licencas.find(
    l => l.clienteId === clienteId && l.status === 'ativa'
  );

  if (!licencaAtiva) {
    const licencaVencida = licencas.find(
      l => l.clienteId === clienteId && l.status === 'vencida'
    );
    
    return {
      permitido: false,
      motivoBloqueio: licencaVencida 
        ? 'Licença vencida. Renovação necessária para continuar usando o sistema.'
        : 'Nenhuma licença ativa encontrada.',
      licencaStatus: licencaVencida ? 'vencida' : 'pendente',
      dataVencimento: licencaVencida?.dataVencimento,
    };
  }

  const hoje = new Date();
  const dataVencimento = new Date(licencaAtiva.dataVencimento);
  const diasRestantes = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (diasRestantes <= 0) {
    return {
      permitido: false,
      motivoBloqueio: 'Licença vencida. Renovação necessária.',
      licencaStatus: 'vencida',
      dataVencimento: licencaAtiva.dataVencimento,
      diasRestantes: 0,
    };
  }

  return {
    permitido: true,
    licencaStatus: 'ativa',
    dataVencimento: licencaAtiva.dataVencimento,
    diasRestantes,
  };
};

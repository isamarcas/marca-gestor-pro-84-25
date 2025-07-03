
import { Licenca, HistoricoRenovacao } from '@/types';
import { adicionarAtividade } from '@/hooks/useAtividades';

export const criarNovaLicenca = (
  novaLicenca: Omit<Licenca, 'id' | 'createdAt' | 'updatedAt'>
): Licenca => {
  const licenca: Licenca = {
    ...novaLicenca,
    id: `lic_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log('useLicencas: Criando nova licença:', licenca);

  // Registrar atividade
  adicionarAtividade({
    tipo: 'cliente',
    titulo: `Nova licença criada: ${licenca.numeroLicenca}`,
    descricao: `Licença ${licenca.numeroLicenca} criada para o cliente`,
    cliente: licenca.clienteId
  });

  return licenca;
};

export const criarHistoricoRenovacao = (
  licencaId: string,
  mesesRenovacao: number,
  valorPago: number
): HistoricoRenovacao => {
  const hoje = new Date();
  const novaDataVencimento = new Date(hoje);
  novaDataVencimento.setMonth(novaDataVencimento.getMonth() + mesesRenovacao);

  return {
    id: `renovacao_${licencaId}_${Date.now()}`,
    licencaId,
    dataRenovacao: hoje,
    dataVencimentoAnterior: hoje, // This will be updated by the caller with the actual previous date
    novaDataVencimento,
    valorPago,
    formaPagamento: 'cartao_credito',
    statusPagamento: 'aprovado',
    observacoes: `Renovação por ${mesesRenovacao} meses`,
  };
};

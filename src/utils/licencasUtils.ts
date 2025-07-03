
import { Licenca } from '@/types';

export const formatarData = (data: Date) => {
  return new Date(data).toLocaleDateString('pt-BR');
};

export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const calcularDiasRestantes = (dataVencimento: Date) => {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  const diff = vencimento.getTime() - hoje.getTime();
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return dias;
};

export const exportarRelatorioCSV = (licencas: Licenca[], clientes: any[]) => {
  const csvContent = [
    'Número da Licença,Cliente,Status,Plano,Data Emissão,Data Vencimento,Valor,Dias Restantes',
    ...licencas.map(licenca => {
      const cliente = clientes.find(c => c.id === licenca.clienteId);
      const diasRestantes = calcularDiasRestantes(licenca.dataVencimento);
      return [
        licenca.numeroLicenca,
        cliente?.nome || 'N/A',
        licenca.status,
        licenca.plano,
        formatarData(licenca.dataEmissao),
        formatarData(licenca.dataVencimento),
        licenca.valor,
        diasRestantes
      ].join(',');
    })
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio_licencas_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};


import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Wallet, Activity, FileText, DollarSign } from 'lucide-react';

interface CaixaMetricsProps {
  saldoTotal: number;
  entradasHoje: number;
  saidasHoje: number;
  saldoDia: number;
  totalMovimentos: number;
}

export function CaixaMetrics({ saldoTotal, entradasHoje, saidasHoje, saldoDia, totalMovimentos }: CaixaMetricsProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const metricas = [
    {
      titulo: 'Receitas de Registros',
      valor: formatarMoeda(entradasHoje),
      icone: TrendingUp,
      cor: 'text-emerald-600',
      bgCor: 'bg-emerald-50',
      iconeBg: 'bg-emerald-100',
      descricao: 'Taxas e honorários recebidos',
      badge: 'Entrada'
    },
    {
      titulo: 'Despesas Operacionais',
      valor: formatarMoeda(saidasHoje),
      icone: TrendingDown,
      cor: 'text-red-600',
      bgCor: 'bg-red-50',
      iconeBg: 'bg-red-100',
      descricao: 'Custos e taxas pagas',
      badge: 'Saída'
    },
    {
      titulo: 'Patrimônio Líquido',
      valor: formatarMoeda(saldoTotal),
      icone: Wallet,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-50',
      iconeBg: 'bg-blue-100',
      descricao: 'Total em caixa',
      badge: 'Acumulado'
    },
    {
      titulo: 'Movimentações',
      valor: totalMovimentos.toString(),
      icone: Activity,
      cor: 'text-purple-600',
      bgCor: 'bg-purple-50',
      iconeBg: 'bg-purple-100',
      descricao: 'Transações hoje',
      badge: 'Atividade'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricas.map((metrica, index) => (
        <Card key={index} className={`${metrica.bgCor} border-none shadow-lg hover:shadow-xl transition-all duration-300 group`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${metrica.iconeBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <metrica.icone className={`h-6 w-6 ${metrica.cor}`} />
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {metrica.badge}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm">
                {metrica.titulo}
              </h3>
              <div className={`text-2xl font-bold ${metrica.cor}`}>
                {metrica.valor}
              </div>
              <p className="text-gray-600 text-xs">
                {metrica.descricao}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, PieChart, TrendingUp, AlertCircle, Target, Award } from 'lucide-react';
import { MovimentoCaixa } from '@/hooks/useCaixa';

interface CaixaInsightsProps {
  movimentos: MovimentoCaixa[];
  saldoDia: number;
}

export function CaixaInsights({ movimentos, saldoDia }: CaixaInsightsProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Análises específicas para empresa de PI
  const analisarCategorias = () => {
    const categoriasReceita = movimentos
      .filter(m => m.tipo === 'entrada')
      .reduce((acc, m) => {
        const categoria = m.categoria || 'Outros';
        acc[categoria] = (acc[categoria] || 0) + m.valor;
        return acc;
      }, {} as Record<string, number>);

    const categoriasDespesa = movimentos
      .filter(m => m.tipo === 'saida')
      .reduce((acc, m) => {
        const categoria = m.categoria || 'Outros';
        acc[categoria] = (acc[categoria] || 0) + m.valor;
        return acc;
      }, {} as Record<string, number>);

    return { categoriasReceita, categoriasDespesa };
  };

  const { categoriasReceita, categoriasDespesa } = analisarCategorias();
  
  const servicoMaisLucrativo = Object.entries(categoriasReceita)
    .sort(([,a], [,b]) => b - a)[0];
    
  const maiorDespesa = Object.entries(categoriasDespesa)
    .sort(([,a], [,b]) => b - a)[0];

  const totalReceitas = Object.values(categoriasReceita).reduce((a, b) => a + b, 0);
  const totalDespesas = Object.values(categoriasDespesa).reduce((a, b) => a + b, 0);
  const margemLucro = totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas * 100) : 0;

  const insights = [
    {
      icone: Award,
      titulo: 'Serviço Mais Rentável',
      conteudo: servicoMaisLucrativo ? servicoMaisLucrativo[0] : 'N/A',
      valor: servicoMaisLucrativo ? formatarMoeda(servicoMaisLucrativo[1]) : 'R$ 0,00',
      cor: 'text-emerald-600',
      bg: 'bg-emerald-50',
      iconeBg: 'bg-emerald-100'
    },
    {
      icone: AlertCircle,
      titulo: 'Maior Categoria de Custo',
      conteudo: maiorDespesa ? maiorDespesa[0] : 'N/A',
      valor: maiorDespesa ? formatarMoeda(maiorDespesa[1]) : 'R$ 0,00',
      cor: 'text-red-600',
      bg: 'bg-red-50',
      iconeBg: 'bg-red-100'
    },
    {
      icone: Target,
      titulo: 'Margem de Lucro Diária',
      conteudo: `${margemLucro.toFixed(1)}%`,
      valor: formatarMoeda(saldoDia),
      cor: margemLucro >= 30 ? 'text-emerald-600' : margemLucro >= 10 ? 'text-yellow-600' : 'text-red-600',
      bg: margemLucro >= 30 ? 'bg-emerald-50' : margemLucro >= 10 ? 'bg-yellow-50' : 'bg-red-50',
      iconeBg: margemLucro >= 30 ? 'bg-emerald-100' : margemLucro >= 10 ? 'bg-yellow-100' : 'bg-red-100'
    }
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          Insights Financeiros
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {movimentos.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-medium">Análises em tempo real</p>
              <p className="text-gray-400 text-sm">Os insights aparecerão conforme as movimentações</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className={`${insight.bg} rounded-xl p-6 border border-gray-100`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 ${insight.iconeBg} rounded-lg`}>
                    <insight.icone className={`h-5 w-5 ${insight.cor}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Hoje
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {insight.titulo}
                  </h4>
                  <div className={`text-xl font-bold ${insight.cor}`}>
                    {insight.valor}
                  </div>
                  <p className="text-gray-600 text-xs font-medium">
                    {insight.conteudo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumo Executivo */}
        {movimentos.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-bold text-blue-800">Resumo Executivo</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/70 rounded-lg p-4">
                <div className="text-blue-600 font-semibold">Receitas</div>
                <div className="text-xl font-bold text-blue-800">{formatarMoeda(totalReceitas)}</div>
                <div className="text-blue-600 text-xs">{Object.keys(categoriasReceita).length} categorias ativas</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-4">
                <div className="text-blue-600 font-semibold">Despesas</div>
                <div className="text-xl font-bold text-blue-800">{formatarMoeda(totalDespesas)}</div>
                <div className="text-blue-600 text-xs">{Object.keys(categoriasDespesa).length} categorias de custo</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-4">
                <div className="text-blue-600 font-semibold">Performance</div>
                <div className={`text-xl font-bold ${margemLucro >= 30 ? 'text-emerald-700' : margemLucro >= 10 ? 'text-yellow-700' : 'text-red-700'}`}>
                  {margemLucro.toFixed(1)}%
                </div>
                <div className="text-blue-600 text-xs">Margem de lucro</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

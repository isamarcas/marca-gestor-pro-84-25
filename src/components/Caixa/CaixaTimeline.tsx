
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown, FileText, CreditCard } from 'lucide-react';
import { MovimentoCaixa } from '@/hooks/useCaixa';

interface CaixaTimelineProps {
  movimentos: MovimentoCaixa[];
}

export function CaixaTimeline({ movimentos }: CaixaTimelineProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const getIconeTipo = (tipo: 'entrada' | 'saida') => {
    return tipo === 'entrada' 
      ? <TrendingUp className="h-4 w-4 text-emerald-600" />
      : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getCorTipo = (tipo: 'entrada' | 'saida') => {
    return tipo === 'entrada' 
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
      : 'text-red-700 bg-red-50 border-red-200';
  };

  const getBadgeVariant = (tipo: 'entrada' | 'saida') => {
    return tipo === 'entrada' ? 'default' : 'destructive';
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          Timeline do Dia
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {movimentos.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-medium">Nenhuma movimentação hoje</p>
              <p className="text-gray-400 text-sm">As transações aparecerão aqui em tempo real</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {movimentos
              .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
              .map((movimento, index) => (
              <div key={movimento.id} className="relative">
                {/* Linha conectora */}
                {index < movimentos.length - 1 && (
                  <div className="absolute left-6 top-16 w-px h-6 bg-gray-200"></div>
                )}
                
                <div className={`border-2 rounded-xl p-4 ${getCorTipo(movimento.tipo)} transition-all duration-300 hover:shadow-md`}>
                  <div className="flex items-start gap-4">
                    {/* Ícone e hora */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`p-2 rounded-lg ${movimento.tipo === 'entrada' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        {getIconeTipo(movimento.tipo)}
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {movimento.hora}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={getBadgeVariant(movimento.tipo)} className="text-xs font-semibold">
                          {movimento.tipo === 'entrada' ? 'RECEITA' : 'DESPESA'}
                        </Badge>
                        <div className={`text-lg font-bold ${
                          movimento.tipo === 'entrada' ? 'text-emerald-700' : 'text-red-700'
                        }`}>
                          {movimento.tipo === 'entrada' ? '+' : '-'}{formatarMoeda(movimento.valor)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium text-gray-800 text-sm leading-relaxed">
                          {movimento.descricao}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 text-gray-600">
                            <CreditCard className="h-3 w-3" />
                            <span className="font-medium">{movimento.formaPagamento}</span>
                          </div>
                          {movimento.categoria && (
                            <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 font-medium">
                              {movimento.categoria}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

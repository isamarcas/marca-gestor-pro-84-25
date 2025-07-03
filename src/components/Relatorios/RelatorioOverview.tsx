
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";
import { Cliente } from "@/types";

interface EstatisticasMarcas {
  totalMarcas: number;
  deferidas: number;
  emAnalise: number;
  alertas: number;
}

interface StatsTarefas {
  total: number;
  concluidas: number;
  pendentes: number;
  emAndamento: number;
}

interface StatsAlertas {
  total: number;
  ativos: number;
  resolvidos: number;
  alta: number;
}

interface RelatorioOverviewProps {
  clientes: Cliente[];
  estatisticasMarcas: EstatisticasMarcas;
  statsTarefas: StatsTarefas;
  statsAlertas: StatsAlertas;
}

export function RelatorioOverview({
  clientes,
  estatisticasMarcas,
  statsTarefas,
  statsAlertas
}: RelatorioOverviewProps) {
  const metricas = [
    {
      titulo: 'Total de Clientes',
      valor: clientes.length.toString(),
      icone: Users,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-50',
      iconeBg: 'bg-blue-100',
      descricao: 'Carteira ativa',
      badge: 'Ativos'
    },
    {
      titulo: 'Portfolio de Marcas',
      valor: estatisticasMarcas.totalMarcas.toString(),
      icone: Shield,
      cor: 'text-emerald-600',
      bgCor: 'bg-emerald-50',
      iconeBg: 'bg-emerald-100',
      descricao: 'Registros totais',
      badge: 'Registradas'
    },
    {
      titulo: 'Marcas Deferidas',
      valor: estatisticasMarcas.deferidas.toString(),
      icone: CheckCircle,
      cor: 'text-green-600',
      bgCor: 'bg-green-50',
      iconeBg: 'bg-green-100',
      descricao: 'Aprovadas pelo INPI',
      badge: 'Sucesso'
    },
    {
      titulo: 'Em Análise',
      valor: estatisticasMarcas.emAnalise.toString(),
      icone: Clock,
      cor: 'text-orange-600',
      bgCor: 'bg-orange-50',
      iconeBg: 'bg-orange-100',
      descricao: 'Aguardando decisão',
      badge: 'Pendentes'
    },
    {
      titulo: 'Alertas Críticos',
      valor: statsAlertas.alta.toString(),
      icone: AlertTriangle,
      cor: 'text-red-600',
      bgCor: 'bg-red-50',
      iconeBg: 'bg-red-100',
      descricao: 'Requerem atenção',
      badge: 'Urgente'
    },
    {
      titulo: 'Taxa de Sucesso',
      valor: estatisticasMarcas.totalMarcas > 0 
        ? `${Math.round((estatisticasMarcas.deferidas / estatisticasMarcas.totalMarcas) * 100)}%`
        : '0%',
      icone: TrendingUp,
      cor: 'text-purple-600',
      bgCor: 'bg-purple-50',
      iconeBg: 'bg-purple-100',
      descricao: 'Aprovações INPI',
      badge: 'Performance'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className={`text-3xl font-bold ${metrica.cor}`}>
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

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              Status do Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Marcas Ativas</span>
                <Badge className="bg-green-100 text-green-800">
                  {estatisticasMarcas.deferidas}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Em Processo</span>
                <Badge className="bg-orange-100 text-orange-800">
                  {estatisticasMarcas.emAnalise}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Alertas Ativos</span>
                <Badge className="bg-red-100 text-red-800">
                  {statsAlertas.ativos}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-emerald-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              Indicadores de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Taxa de Aprovação</span>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">
                    {estatisticasMarcas.totalMarcas > 0 
                      ? `${Math.round((estatisticasMarcas.deferidas / estatisticasMarcas.totalMarcas) * 100)}%`
                      : '0%'}
                  </div>
                  <div className="text-xs text-gray-500">INPI</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Tarefas Concluídas</span>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    {statsTarefas.total > 0 
                      ? `${Math.round((statsTarefas.concluidas / statsTarefas.total) * 100)}%`
                      : '0%'}
                  </div>
                  <div className="text-xs text-gray-500">Este período</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">Resolução de Alertas</span>
                <div className="text-right">
                  <div className="font-bold text-purple-600">
                    {statsAlertas.total > 0 
                      ? `${Math.round((statsAlertas.resolvidos / statsAlertas.total) * 100)}%`
                      : '0%'}
                  </div>
                  <div className="text-xs text-gray-500">Eficiência</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

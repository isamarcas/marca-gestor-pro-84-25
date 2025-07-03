
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Stats {
  total: number;
  ativos: number;
  resolvidos: number;
  alta: number;
}

interface AlertsStatsProps {
  stats: Stats;
}

export function AlertsStats({ stats }: AlertsStatsProps) {
  const cards = [
    {
      title: "Total de Alertas",
      value: stats.total,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Alertas Ativos",
      value: stats.ativos,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Alertas Resolvidos",
      value: stats.resolvidos,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Prioridade Alta",
      value: stats.alta,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${card.bgColor}`}>
              <CardTitle className="text-sm font-medium text-gray-700">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-gray-900">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

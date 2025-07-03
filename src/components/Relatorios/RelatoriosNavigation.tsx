
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  Shield,
  FileText
} from 'lucide-react';

interface RelatorioItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
  bgColor: string;
}

interface RelatoriosNavigationProps {
  selectedReport?: string;
  onReportSelect?: (reportId: string) => void;
}

export function RelatoriosNavigation({ selectedReport = 'overview', onReportSelect }: RelatoriosNavigationProps) {
  const [selected, setSelected] = useState(selectedReport);

  const handleSelect = (reportId: string) => {
    setSelected(reportId);
    onReportSelect?.(reportId);
  };

  const relatorios: RelatorioItem[] = [
    {
      id: 'overview',
      title: 'Visão Geral',
      description: 'Dashboard completo do portfólio',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      badge: 'Principal'
    },
    {
      id: 'marcas',
      title: 'Portfolio de Marcas',
      description: 'Status e análises das marcas',
      icon: Shield,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      badge: 'Novo'
    },
    {
      id: 'vencimentos',
      title: 'Prazos & Vencimentos',
      description: 'Cronograma de renovações',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'riscos',
      title: 'Análise de Riscos',
      description: 'Alertas e oportunidades',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'financeiro',
      title: 'Performance Financeira',
      description: 'ROI e análise de custos',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'clientes',
      title: 'Gestão de Clientes',
      description: 'Relacionamento e retenção',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'competitivo',
      title: 'Inteligência Competitiva',
      description: 'Monitoramento do mercado',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      badge: 'Premium'
    },
    {
      id: 'compliance',
      title: 'Compliance & Auditoria',
      description: 'Conformidade regulatória',
      icon: FileText,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50'
    }
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PieChart className="h-5 w-5 text-blue-600" />
          </div>
          Tipos de Relatório
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {relatorios.map((relatorio) => (
          <Button
            key={relatorio.id}
            variant={selected === relatorio.id ? "default" : "ghost"}
            className={`w-full justify-start h-auto relative ${
              selected === relatorio.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : `${relatorio.bgColor} ${relatorio.color} hover:${relatorio.bgColor} hover:shadow-md`
            } transition-all duration-300 ${relatorio.badge ? 'pt-6 pb-4 px-4' : 'p-4'}`}
            onClick={() => handleSelect(relatorio.id)}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                selected === relatorio.id 
                  ? 'bg-white/20' 
                  : relatorio.bgColor
              }`}>
                <relatorio.icon className={`h-5 w-5 ${
                  selected === relatorio.id ? 'text-white' : relatorio.color
                }`} />
              </div>
              
              <div className="flex-1 text-left space-y-1 min-w-0 pr-8">
                <div className="font-semibold text-sm">{relatorio.title}</div>
                <p className={`text-xs line-clamp-2 ${
                  selected === relatorio.id 
                    ? 'text-blue-100' 
                    : 'text-gray-600'
                }`}>
                  {relatorio.description}
                </p>
              </div>
            </div>
            
            {relatorio.badge && (
              <Badge 
                variant={selected === relatorio.id ? "secondary" : "outline"}
                className="text-xs absolute top-1 right-1 flex-shrink-0"
              >
                {relatorio.badge}
              </Badge>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

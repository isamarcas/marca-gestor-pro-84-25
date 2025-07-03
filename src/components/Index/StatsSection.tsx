
import { TrendingUp, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useClientes } from '@/hooks/useClientes';
import { useMemo } from 'react';

export function StatsSection() {
  const { clientes } = useClientes();

  // Calcular crescimento dinâmico baseado no número de clientes
  const crescimentoPortfolio = useMemo(() => {
    const totalClientes = clientes.length;
    
    // Calcular clientes cadastrados nos últimos 30 dias
    const agora = new Date();
    const trintaDiasAtras = new Date(agora.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const clientesRecentes = clientes.filter(cliente => {
      const dataCliente = new Date(cliente.createdAt);
      return dataCliente >= trintaDiasAtras;
    });
    
    // Se não há clientes antigos, mostrar crescimento baseado no total atual
    const clientesAntigos = totalClientes - clientesRecentes.length;
    
    if (clientesAntigos === 0) {
      return totalClientes > 0 ? `+${Math.min(totalClientes * 10, 100)}%` : '+0%';
    }
    
    // Calcular percentual de crescimento
    const percentualCrescimento = Math.round((clientesRecentes.length / clientesAntigos) * 100);
    return `+${Math.min(percentualCrescimento, 100)}%`;
  }, [clientes]);

  const insights = [
    {
      icon: TrendingUp,
      title: "Crescimento do Portfólio",
      value: crescimentoPortfolio,
      description: "Baseado em novos clientes cadastrados",
      color: "emerald",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Tempo Médio de Processo",
      value: "8 a 24 meses",
      description: "Redução de 15% no tempo de tramitação",
      color: "blue",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Taxa de Aprovação",
      value: "94.7%",
      description: "Alta eficiência nos registros submetidos",
      color: "violet",
      gradient: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardContent className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2 opacity-80">
                    {insight.title}
                  </h3>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 scale-110`}></div>
                  <div className={`relative p-4 bg-gradient-to-br ${insight.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform duration-300">
                    {insight.value}
                  </p>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed text-center">
                  {insight.description}
                </p>
              </div>
              
              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${insight.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl`}></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

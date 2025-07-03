
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Calendar, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function QuickActionsGrid() {
  const navigate = useNavigate();

  const quickActions = [
    { 
      title: 'Marcas', 
      icon: FileText, 
      href: '/marcas', 
      description: 'Gestão completa de marcas registradas',
      stats: '124 ativas',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      title: 'Clientes', 
      icon: Users, 
      href: '/clientes', 
      description: 'Base de clientes e relacionamento',
      stats: '89 clientes',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600'
    },
    { 
      title: 'Tarefas', 
      icon: Calendar, 
      href: '/tarefas', 
      description: 'Organização e acompanhamento',
      stats: '12 pendentes',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600'
    },
    { 
      title: 'Alertas', 
      icon: AlertCircle, 
      href: '/alertas', 
      description: 'Monitoramento de prazos críticos',
      stats: '3 urgentes',
      color: 'red',
      gradient: 'from-red-500 to-rose-600'
    },
    { 
      title: 'Relatórios', 
      icon: BarChart3, 
      href: '/relatorios', 
      description: 'Análises e insights estratégicos',
      stats: 'Atualizado',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600'
    },
    { 
      title: 'Configurações', 
      icon: Settings, 
      href: '/configuracoes', 
      description: 'Personalização do sistema',
      stats: 'Configurado',
      color: 'slate',
      gradient: 'from-slate-500 to-gray-600'
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full border border-blue-200/30">
          <Zap className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-800">Acesso Rápido</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Principais Módulos</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Navegue pelos recursos essenciais do sistema com apenas um clique
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.title} 
              className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer rounded-3xl"
              onClick={() => navigate(action.href)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-1 h-1 bg-white/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '1s'}}></div>
              
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 scale-110`}></div>
                    <div className={`relative p-4 bg-gradient-to-br ${action.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-xs font-bold text-slate-500 bg-slate-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50 group-hover:bg-white/90 transition-all duration-300">
                    {action.stats}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{action.description}</p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 group-hover:bg-white/60 rounded-2xl font-semibold transition-all duration-300"
                  >
                    Acessar
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
                
                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl`}></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

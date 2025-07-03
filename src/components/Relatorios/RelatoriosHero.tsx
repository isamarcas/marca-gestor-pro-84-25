
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, FileText, Shield, Scale, Activity } from 'lucide-react';

export function RelatoriosHero() {
  return (
    <div className="relative overflow-hidden">
      <Card className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border-none shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Central de Relatórios
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 font-medium max-w-2xl">
                  Análises estratégicas e insights avançados para gestão de propriedade intelectual
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatórios Automatizados
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Análises Preditivas
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  <Activity className="h-4 w-4 mr-2" />
                  Tempo Real
                </Badge>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full lg:w-auto lg:min-w-[300px]">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-white">
                  {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </div>
                <div className="text-blue-200 font-medium">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-blue-100 text-sm">
                    Última atualização: {new Date().toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

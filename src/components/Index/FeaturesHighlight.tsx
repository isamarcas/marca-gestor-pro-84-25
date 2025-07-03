
import { useNavigate } from 'react-router-dom';
import { BarChart3, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FeaturesHighlight() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full border border-violet-200/30">
          <Sparkles className="h-4 w-4 text-violet-600" />
          <span className="text-sm font-semibold text-violet-800">Recursos Avançados</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Tecnologia de Ponta</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ferramentas inteligentes para maximizar a eficiência na gestão de propriedade intelectual
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating elements */}
          <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-indigo-400/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
          
          <CardContent className="relative p-10">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500 scale-110"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <BarChart3 className="h-8 w-8 text-white" />
                  <TrendingUp className="absolute -top-1 -right-1 h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300">
                  Análises Avançadas
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Relatórios detalhados e insights estratégicos com{' '}
                  <span className="font-semibold text-blue-600">inteligência artificial</span> para 
                  tomada de decisões sobre seu portfólio de marcas.
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/relatorios')}
                className="border-blue-200/60 text-blue-700 hover:bg-blue-50/80 hover:border-blue-300 rounded-2xl font-semibold transition-all duration-300 group-hover:scale-105"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50/80 to-green-50/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating elements */}
          <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-green-400/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
          
          <CardContent className="relative p-10">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500 scale-110"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Shield className="h-8 w-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors duration-300">
                  Monitoramento Inteligente
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Sistema automatizado de alertas para{' '}
                  <span className="font-semibold text-emerald-600">prazos críticos</span>, renovações 
                  e mudanças de status no INPI em tempo real.
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/alertas')}
                className="border-emerald-200/60 text-emerald-700 hover:bg-emerald-50/80 hover:border-emerald-300 rounded-2xl font-semibold transition-all duration-300 group-hover:scale-105"
              >
                <Shield className="h-4 w-4 mr-2" />
                Ver Alertas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

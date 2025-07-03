
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Star } from 'lucide-react';

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl rounded-3xl">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:32px_32px] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      
      {/* Floating elements */}
      <div className="absolute top-8 right-8 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-12 left-12 w-1.5 h-1.5 bg-indigo-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <CardContent className="relative p-12 sm:p-16">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold">Gestão Profissional</span>
              <Zap className="h-4 w-4 text-blue-400" />
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Controle Total sobre seus{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Processos de Marca
              </span>
            </h3>
            
            <p className="text-slate-300 text-xl leading-relaxed max-w-3xl">
              Acompanhamento em tempo real, alertas automatizados e análises avançadas 
              para garantir que <span className="font-semibold text-white">nenhum prazo seja perdido</span> e 
              suas marcas estejam sempre protegidas.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/marcas')}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <span>Gerenciar Marcas</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/clientes')}
              className="border-slate-400/50 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group"
            >
              <span>Ver Clientes</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Sistema sempre atualizado</span>
            </div>
            <div className="w-px h-4 bg-slate-400/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-sm text-slate-300">Suporte 24/7</span>
            </div>
            <div className="w-px h-4 bg-slate-400/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm text-slate-300">Dados seguros</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

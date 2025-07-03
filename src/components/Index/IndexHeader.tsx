
import { Shield, Sparkles } from 'lucide-react';

export function IndexHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-900/5 via-purple-900/5 to-indigo-900/5">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-semibold shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Shield className="h-5 w-5 text-pink-600" />
                <div className="absolute inset-0 animate-ping">
                  <Shield className="h-5 w-5 text-pink-600 opacity-30" />
                </div>
              </div>
              <span>Sistema de Gestão ISA</span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CRM
              </span>
              <span className="text-slate-600 ml-4">ISA</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-slate-600 leading-relaxed font-medium">
              Plataforma completa para gestão de{' '}
              <span className="text-pink-600 font-semibold">marcas registradas</span> e{' '}
              <span className="text-purple-600 font-semibold">propriedade intelectual</span>
            </p>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4 px-6 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600">Sistema Online</span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-sm font-medium text-slate-600">Atualizado em Tempo Real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

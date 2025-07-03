
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Shield, Scale } from 'lucide-react';

interface CaixaHeroProps {
  saldoTotal: number;
  saldoDia: number;
}

export function CaixaHero({ saldoTotal, saldoDia }: CaixaHeroProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const tendenciaDia = saldoDia >= 0 ? 'positiva' : 'negativa';

  return (
    <div className="relative overflow-hidden">
      <Card className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 border-none shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative p-8 lg:p-12">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Controle Financeiro
              </h1>
              <p className="text-xl text-blue-100 font-medium">
                Gestão especializada em Propriedade Intelectual
              </p>
            </div>

            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium"
            >
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Badge>
          </div>

          {/* Saldos Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-100 font-medium text-lg">Saldo Total</h3>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {formatarMoeda(saldoTotal)}
              </div>
              <p className="text-blue-200 text-sm">
                Recursos disponíveis para operações
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-100 font-medium text-lg">Resultado Hoje</h3>
                <div className={`p-2 rounded-lg ${
                  saldoDia >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {saldoDia >= 0 ? 
                    <TrendingUp className="h-5 w-5 text-green-300" /> : 
                    <TrendingDown className="h-5 w-5 text-red-300" />
                  }
                </div>
              </div>
              <div className={`text-4xl font-bold mb-2 ${
                saldoDia >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {formatarMoeda(saldoDia)}
              </div>
              <p className={`text-sm ${
                saldoDia >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                Tendência {tendenciaDia} no período
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

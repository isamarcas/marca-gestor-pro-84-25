
import { useCaixa } from '@/hooks/useCaixa';
import { CaixaHero } from '@/components/Caixa/CaixaHero';
import { CaixaMetrics } from '@/components/Caixa/CaixaMetrics';
import { CaixaOperations } from '@/components/Caixa/CaixaOperations';
import { CaixaTimeline } from '@/components/Caixa/CaixaTimeline';
import { CaixaInsights } from '@/components/Caixa/CaixaInsights';

export default function Caixa() {
  const {
    saldoTotal,
    entradasHoje,
    saidasHoje,
    saldoDia,
    movimentosHoje,
    isLoading,
    registrarMovimento
  } = useCaixa();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        {/* Hero Section */}
        <CaixaHero 
          saldoTotal={saldoTotal}
          saldoDia={saldoDia}
        />

        {/* Métricas Principais */}
        <CaixaMetrics
          saldoTotal={saldoTotal}
          entradasHoje={entradasHoje}
          saidasHoje={saidasHoje}
          saldoDia={saldoDia}
          totalMovimentos={movimentosHoje.length}
        />

        {/* Layout Principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Operações - 2 colunas */}
          <div className="xl:col-span-2 space-y-6">
            <CaixaOperations
              onRegistrar={registrarMovimento}
              isLoading={isLoading}
            />
            
            <CaixaInsights 
              movimentos={movimentosHoje}
              saldoDia={saldoDia}
            />
          </div>

          {/* Timeline - 1 coluna */}
          <div className="xl:col-span-1">
            <CaixaTimeline movimentos={movimentosHoje} />
          </div>
        </div>
      </div>
    </div>
  );
}

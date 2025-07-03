
import { AlertsHeader } from '@/components/Alertas/AlertsHeader';
import { AlertsStats } from '@/components/Alertas/AlertsStats';
import { AlertsList } from '@/components/Alertas/AlertsList';
import { AlertDetailModal } from '@/components/Alertas/AlertDetailModal';
import { useAlertas } from '@/hooks/useAlertas';

export default function Alertas() {
  const {
    alertas,
    filtroTipo,
    filtroPrioridade,
    stats,
    alertaSelecionado,
    modalDetalhesAberto,
    handleMarcarResolvido,
    handleVerDetalhes,
    handleFecharDetalhes,
    handleFiltrarTipo,
    handleFiltrarPrioridade,
    handleAdiarAlerta
  } = useAlertas();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto min-h-full" style={{ backgroundColor: '#f9fafb' }}>
      <AlertsHeader
        filtroTipo={filtroTipo}
        filtroPrioridade={filtroPrioridade}
        onFiltrarTipo={handleFiltrarTipo}
        onFiltrarPrioridade={handleFiltrarPrioridade}
      />

      <AlertsStats stats={stats} />

      <AlertsList
        alertas={alertas}
        onMarcarResolvido={handleMarcarResolvido}
        onVerDetalhes={handleVerDetalhes}
      />

      <AlertDetailModal
        alerta={alertaSelecionado}
        open={modalDetalhesAberto}
        onOpenChange={handleFecharDetalhes}
        onMarcarResolvido={handleMarcarResolvido}
        onAdiarAlerta={handleAdiarAlerta}
      />
    </div>
  );
}

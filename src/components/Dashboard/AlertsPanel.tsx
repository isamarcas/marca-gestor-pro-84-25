
import { Card, CardContent } from '@/components/ui/card';
import { AlertsPanelHeader } from './AlertsPanel/AlertsPanelHeader';
import { AlertsEmptyState } from './AlertsPanel/AlertsEmptyState';
import { AlertItem } from './AlertsPanel/AlertItem';
import { useAlertas } from './AlertsPanel/useAlertas';

export function AlertsPanel() {
  const { alertas, handleMarcarResolvido } = useAlertas();

  return (
    <Card className="relative overflow-hidden bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl shadow-orange-500/10">
      <AlertsPanelHeader alertasCount={alertas.length} />

      <CardContent className="p-8">
        <div className="space-y-6">
          {alertas.length === 0 ? (
            <AlertsEmptyState />
          ) : (
            alertas.map((alerta, index) => (
              <AlertItem
                key={alerta.id}
                alerta={alerta}
                index={index}
                onResolve={handleMarcarResolvido}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

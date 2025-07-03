
import { AlertTriangle } from 'lucide-react';

export function AlertsEmptyState() {
  return (
    <div className="text-center py-8">
      <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-600 font-medium">Nenhum alerta crítico</p>
      <p className="text-slate-400 text-sm">Todos os prazos estão em dia! 🎉</p>
    </div>
  );
}

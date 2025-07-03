
import { Clock } from 'lucide-react';

export function RecentActivityEmptyState() {
  return (
    <div className="text-center py-8">
      <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-600 font-medium">Nenhuma atividade recente</p>
      <p className="text-slate-400 text-sm">As atividades aparecerão aqui conforme ocorrerem</p>
    </div>
  );
}


import { ActivityItem } from './ActivityItem';
import { RecentActivityEmptyState } from './RecentActivityEmptyState';
import { AtividadeRecente } from '@/hooks/useAtividades/types';

interface ActivitiesListProps {
  atividades: AtividadeRecente[];
}

export function ActivitiesList({ atividades }: ActivitiesListProps) {
  if (atividades.length === 0) {
    return <RecentActivityEmptyState />;
  }

  return (
    <div className="space-y-6">
      {atividades.slice(0, 5).map((atividade, index) => (
        <ActivityItem
          key={atividade.id}
          atividade={atividade}
          index={index}
        />
      ))}
    </div>
  );
}

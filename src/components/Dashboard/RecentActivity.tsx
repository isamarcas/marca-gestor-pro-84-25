
import { Card, CardContent } from '@/components/ui/card';
import { useAtividades } from '@/hooks/useAtividades';
import { RecentActivityHeader } from './RecentActivity/RecentActivityHeader';
import { RecentActivityLoadingState } from './RecentActivity/RecentActivityLoadingState';
import { ActivitiesList } from './RecentActivity/ActivitiesList';

export function RecentActivity() {
  const { atividades, isLoading } = useAtividades();

  if (isLoading) {
    return <RecentActivityLoadingState />;
  }

  return (
    <Card className="relative overflow-hidden bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl shadow-blue-500/10">
      <RecentActivityHeader />
      <CardContent className="p-8">
        <ActivitiesList atividades={atividades} />
      </CardContent>
    </Card>
  );
}

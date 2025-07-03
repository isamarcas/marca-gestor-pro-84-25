
import { Card, CardContent } from '@/components/ui/card';
import { RecentActivityHeader } from './RecentActivityHeader';

export function RecentActivityLoadingState() {
  return (
    <Card className="relative overflow-hidden bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl shadow-blue-500/10">
      <RecentActivityHeader />
      <CardContent className="p-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Carregando atividades...</p>
        </div>
      </CardContent>
    </Card>
  );
}

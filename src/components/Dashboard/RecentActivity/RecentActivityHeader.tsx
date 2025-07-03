
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Sparkles } from 'lucide-react';

export function RecentActivityHeader() {
  return (
    <CardHeader className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white rounded-t-3xl border-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
      
      <CardTitle className="relative flex items-center gap-4 text-2xl font-black">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
          <Clock className="h-7 w-7 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            Atividades Recentes
            <Sparkles className="h-5 w-5 text-cyan-200 animate-pulse" />
          </div>
          <p className="text-sm font-normal text-blue-100 mt-1">Últimas movimentações do sistema</p>
        </div>
      </CardTitle>
    </CardHeader>
  );
}

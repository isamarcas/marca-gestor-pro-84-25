
import { AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface AlertsPanelHeaderProps {
  alertasCount: number;
}

export function AlertsPanelHeader({ alertasCount }: AlertsPanelHeaderProps) {
  return (
    <CardHeader className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white rounded-t-3xl border-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full transform -translate-x-16 -translate-y-16"></div>
      
      <CardTitle className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
            <AlertTriangle className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              Alertas Importantes
              <Shield className="h-5 w-5 text-orange-200 animate-pulse" />
            </div>
            <p className="text-sm font-normal text-orange-100 mt-1">
              {alertasCount > 0 
                ? `${alertasCount} alerta${alertasCount > 1 ? 's' : ''} crítico${alertasCount > 1 ? 's' : ''} encontrado${alertasCount > 1 ? 's' : ''}`
                : 'Todos os prazos estão em dia'
              }
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-md font-bold transition-all duration-300 hover:scale-105"
          onClick={() => window.location.href = '/alertas'}
        >
          Ver todos
        </Button>
      </CardTitle>
    </CardHeader>
  );
}

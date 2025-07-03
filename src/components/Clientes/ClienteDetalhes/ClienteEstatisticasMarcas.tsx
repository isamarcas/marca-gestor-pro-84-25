
import { Shield, TrendingUp } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteEstatisticasMarcasProps {
  cliente: Cliente;
}

export function ClienteEstatisticasMarcas({ cliente }: ClienteEstatisticasMarcasProps) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Estatísticas de Marcas</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200 hover:shadow-md transition-all duration-200">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-600">{cliente.totalMarcas || 0}</div>
            <div className="text-sm font-medium text-blue-700">Total de Marcas</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200 hover:shadow-md transition-all duration-200">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">{cliente.marcasAtivas || 0}</div>
            <div className="text-sm font-medium text-green-700">Marcas Ativas</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-2xl border border-yellow-200 hover:shadow-md transition-all duration-200">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-yellow-600">0</div>
            <div className="text-sm font-medium text-yellow-700">Em Análise</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border border-purple-200 hover:shadow-md transition-all duration-200">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-sm font-medium text-purple-700">Deferidas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

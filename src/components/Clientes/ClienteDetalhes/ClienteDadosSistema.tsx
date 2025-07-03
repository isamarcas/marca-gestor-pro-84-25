
import { Calendar, Globe, User, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Cliente } from "@/types";
import { formatDate, getOrigemInfo } from "./clienteDetalhesUtils";

interface ClienteDadosSistemaProps {
  cliente: Cliente;
}

export function ClienteDadosSistema({ cliente }: ClienteDadosSistemaProps) {
  const origemInfo = getOrigemInfo(cliente.origem);
  const OrigemIcon = origemInfo.icon === 'Globe' ? Globe : User;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <Database className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Informações do Sistema</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Data de Cadastro</label>
          <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-gray-50 px-4 py-3 rounded-xl border border-slate-100">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-slate-600" />
            </div>
            <p className="text-slate-900 font-medium text-base">{formatDate(cliente.createdAt)}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Última Atualização</label>
          <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-gray-50 px-4 py-3 rounded-xl border border-slate-100">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-slate-600" />
            </div>
            <p className="text-slate-900 font-medium text-base">{formatDate(cliente.updatedAt)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">ID do Cliente</label>
          <p className="text-slate-900 font-mono text-sm bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">{cliente.id}</p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Origem do Cadastro</label>
          <div className="flex items-center">
            <Badge className="bg-white border border-slate-200 text-slate-700 hover:shadow-md transition-all duration-200 text-base px-4 py-2">
              <OrigemIcon className="h-4 w-4 mr-2" />
              {origemInfo.label}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

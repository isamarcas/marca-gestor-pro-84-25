
import { UserCheck } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteDadosRepresentanteProps {
  cliente: Cliente;
}

export function ClienteDadosRepresentante({ cliente }: ClienteDadosRepresentanteProps) {
  const hasRepresentanteData = cliente.representanteLegal || cliente.nacionalidade || cliente.profissao || 
                              cliente.estadoCivil || cliente.rg || cliente.orgaoEmissor;

  if (!hasRepresentanteData) return null;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <UserCheck className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          {cliente.tipoCliente === 'pessoa_juridica' ? 'Representante Legal' : 'Informações Pessoais'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cliente.representanteLegal && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nome Completo</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.representanteLegal}</p>
          </div>
        )}

        {cliente.nacionalidade && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nacionalidade</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.nacionalidade}</p>
          </div>
        )}

        {cliente.profissao && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Profissão</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.profissao}</p>
          </div>
        )}

        {cliente.estadoCivil && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estado Civil</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed capitalize">{cliente.estadoCivil.replace('_', ' ')}</p>
          </div>
        )}

        {cliente.rg && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">RG</label>
            <p className="text-slate-900 font-mono text-base bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">{cliente.rg}</p>
          </div>
        )}

        {cliente.orgaoEmissor && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Órgão Emissor</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.orgaoEmissor}</p>
          </div>
        )}
      </div>
    </div>
  );
}

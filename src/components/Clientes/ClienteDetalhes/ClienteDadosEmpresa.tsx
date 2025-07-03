
import { Building } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteDadosEmpresaProps {
  cliente: Cliente;
}

export function ClienteDadosEmpresa({ cliente }: ClienteDadosEmpresaProps) {
  if (cliente.tipoCliente !== 'pessoa_juridica') return null;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <Building className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Dados da Empresa</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Razão Social</label>
          <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.razaoSocial || cliente.nome}</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">CNPJ</label>
          <p className="text-slate-900 font-mono text-base bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">{cliente.cpfCnpj}</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nome Fantasia</label>
          <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.nome}</p>
        </div>

        {cliente.segmentoAtuacao && (
          <div className="space-y-2 lg:col-span-3">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Segmento de Atuação</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2.5 rounded-lg border border-purple-100">{cliente.segmentoAtuacao}</p>
          </div>
        )}
      </div>
    </div>
  );
}

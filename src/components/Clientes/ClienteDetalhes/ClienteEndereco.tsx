
import { MapPin, Home } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteEnderecoProps {
  cliente: Cliente;
}

export function ClienteEndereco({ cliente }: ClienteEnderecoProps) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Endereço</h3>
      </div>
      
      {cliente.enderecoDetalhado ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rua/Avenida</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.enderecoDetalhado.rua}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Número</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.enderecoDetalhado.numero}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Bairro</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.enderecoDetalhado.bairro}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cidade</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.enderecoDetalhado.cidade}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</label>
            <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.enderecoDetalhado.estado}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">CEP</label>
            <p className="text-slate-900 font-mono text-base bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">{cliente.enderecoDetalhado.cep}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Endereço Completo</label>
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 rounded-xl border border-orange-100">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-slate-900 font-medium text-base">{cliente.endereco || 'Não informado'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

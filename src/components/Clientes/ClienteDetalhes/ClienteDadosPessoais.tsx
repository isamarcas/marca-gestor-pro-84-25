
import { User } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteDadosPessoaisProps {
  cliente: Cliente;
}

export function ClienteDadosPessoais({ cliente }: ClienteDadosPessoaisProps) {
  if (cliente.tipoCliente !== 'pessoa_fisica') return null;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <User className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nome Completo</label>
          <p className="text-slate-900 font-medium text-base leading-relaxed">{cliente.nome}</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">CPF</label>
          <p className="text-slate-900 font-mono text-base bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">{cliente.cpfCnpj}</p>
        </div>
      </div>
    </div>
  );
}

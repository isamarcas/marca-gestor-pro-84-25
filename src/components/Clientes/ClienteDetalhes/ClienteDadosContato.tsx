
import { Mail, Phone, MessageCircle } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteDadosContatoProps {
  cliente: Cliente;
}

export function ClienteDadosContato({ cliente }: ClienteDadosContatoProps) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Contato</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-100">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-slate-900 font-medium text-base">{cliente.email}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Telefone</label>
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-slate-900 font-medium text-base">{cliente.telefone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

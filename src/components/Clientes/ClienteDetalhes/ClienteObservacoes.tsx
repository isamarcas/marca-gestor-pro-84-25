
import { FileText, MessageSquare } from "lucide-react";
import type { Cliente } from "@/types";

interface ClienteObservacoesProps {
  cliente: Cliente;
}

export function ClienteObservacoes({ cliente }: ClienteObservacoesProps) {
  if (!cliente.observacoes) return null;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Observações</h3>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
            <FileText className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-slate-900 font-medium leading-relaxed text-base flex-1">{cliente.observacoes}</p>
        </div>
      </div>
    </div>
  );
}

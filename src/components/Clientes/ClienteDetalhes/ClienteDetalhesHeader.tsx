
import { User, Globe, Building, X } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Cliente } from "@/types";
import { getOrigemInfo, getTipoClienteInfo } from "./clienteDetalhesUtils";

interface ClienteDetalhesHeaderProps {
  cliente: Cliente;
}

export function ClienteDetalhesHeader({ cliente }: ClienteDetalhesHeaderProps) {
  const origemInfo = getOrigemInfo(cliente.origem);
  const tipoInfo = getTipoClienteInfo(cliente.tipoCliente);
  
  const OrigemIcon = origemInfo.icon === 'Globe' ? Globe : User;
  const TipoIcon = tipoInfo.icon === 'Building' ? Building : User;

  return (
    <DialogHeader className="relative px-0 py-0 border-b-0">
      <div className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative px-8 py-8">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Client info */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {cliente.nome}
                </h1>
                <p className="text-slate-600 font-medium">
                  {cliente.tipoCliente === 'pessoa_juridica' ? cliente.razaoSocial || cliente.nome : 'Cliente Pessoa Física'}
                </p>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-3">
              <Badge className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                <OrigemIcon className="h-3.5 w-3.5 mr-2" />
                {origemInfo.label}
              </Badge>
              <Badge className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                <TipoIcon className="h-3.5 w-3.5 mr-2" />
                {tipoInfo.label}
              </Badge>
            </div>
          </DialogTitle>
        </div>
      </div>
    </DialogHeader>
  );
}


import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Cliente } from "@/types";
import { ClienteDetalhesHeader } from "./ClienteDetalhes/ClienteDetalhesHeader";
import { ClienteDadosEmpresa } from "./ClienteDetalhes/ClienteDadosEmpresa";
import { ClienteDadosPessoais } from "./ClienteDetalhes/ClienteDadosPessoais";
import { ClienteDadosRepresentante } from "./ClienteDetalhes/ClienteDadosRepresentante";
import { ClienteDadosContato } from "./ClienteDetalhes/ClienteDadosContato";
import { ClienteEndereco } from "./ClienteDetalhes/ClienteEndereco";
import { ClienteObservacoes } from "./ClienteDetalhes/ClienteObservacoes";
import { ClienteEstatisticasMarcas } from "./ClienteDetalhes/ClienteEstatisticasMarcas";
import { ClienteDadosSistema } from "./ClienteDetalhes/ClienteDadosSistema";

interface ClienteDetalhesModalProps {
  cliente: Cliente;
  isOpen: boolean;
  onClose: () => void;
}

export function ClienteDetalhesModal({ cliente, isOpen, onClose }: ClienteDetalhesModalProps) {
  console.log('🔍 Cliente dados completos no modal:', cliente);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
        <ClienteDetalhesHeader cliente={cliente} />

        <ScrollArea className="max-h-[calc(95vh-180px)] px-8 pb-8">
          <div className="space-y-6">
            <ClienteDadosEmpresa cliente={cliente} />
            <ClienteDadosPessoais cliente={cliente} />
            <ClienteDadosRepresentante cliente={cliente} />
            <ClienteDadosContato cliente={cliente} />
            <ClienteEndereco cliente={cliente} />
            <ClienteObservacoes cliente={cliente} />
            <ClienteEstatisticasMarcas cliente={cliente} />
            <ClienteDadosSistema cliente={cliente} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

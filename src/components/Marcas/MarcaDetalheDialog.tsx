
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Marca } from "@/types";

type Props = {
  marca: Marca | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const statusLabels: Record<string, string> = {
  deferido: "Deferido",
  em_analise: "Em Análise",
  indeferido: "Indeferido",
  recurso: "Recurso",
  renovacao: "Renovação",
  oposicao: "Oposição",
};

const statusColors: Record<string, string> = {
  deferido: "bg-green-100 text-green-800",
  em_analise: "bg-blue-100 text-blue-800",
  indeferido: "bg-red-100 text-red-800",
  recurso: "bg-yellow-100 text-yellow-800",
  renovacao: "bg-purple-100 text-purple-800",
  oposicao: "bg-orange-100 text-orange-800",
};

export function MarcaDetalheDialog({ marca, open, onOpenChange }: Props) {
  if (!marca) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Marca</DialogTitle>
          <DialogDescription>
            Veja informações detalhadas da marca selecionada.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold">Nome:</span> {marca.nome}
          </div>
          <div>
            <span className="font-semibold">Nº Processo:</span> {marca.numeroProcesso}
          </div>
          <div>
            <span className="font-semibold">Titular:</span> {marca.titular}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <Badge className={statusColors[marca.status]}>{statusLabels[marca.status]}</Badge>
          </div>
          <div>
            <span className="font-semibold">Classe:</span> {marca.classe}
          </div>
          <div>
            <span className="font-semibold">Data Depósito:</span>{" "}
            {marca.dataDeposito ? format(marca.dataDeposito, "dd/MM/yyyy", { locale: ptBR }) : "--"}
          </div>
          <div>
            <span className="font-semibold">Próximo Prazo:</span>{" "}
            {marca.proximoPrazo ? format(marca.proximoPrazo, "dd/MM/yyyy", { locale: ptBR }) : "--"}
          </div>
          {marca.tipoMarca && (
            <div>
              <span className="font-semibold">Tipo:</span> {marca.tipoMarca.charAt(0).toUpperCase() + marca.tipoMarca.slice(1)}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="ghost">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

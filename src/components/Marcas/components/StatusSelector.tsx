
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const statusList = [
  { value: "deferido", label: "Deferido", color: "bg-green-100 text-green-800", requiresDeadline: false },
  { value: "em_analise", label: "Em Análise", color: "bg-yellow-100 text-yellow-800", requiresDeadline: false },
  { value: "indeferido", label: "Indeferido", color: "bg-red-100 text-red-800", requiresDeadline: false },
  { value: "recurso", label: "Recurso", color: "bg-orange-100 text-orange-800", requiresDeadline: true },
  { value: "renovacao", label: "Renovação", color: "bg-purple-100 text-purple-800", requiresDeadline: true },
  { value: "oposicao", label: "Oposição", color: "bg-blue-100 text-blue-800", requiresDeadline: true },
  { value: "nulidade", label: "Nulidade", color: "bg-red-100 text-red-800", requiresDeadline: true },
  { value: "caducidade", label: "Caducidade", color: "bg-gray-100 text-gray-800", requiresDeadline: true },
  { value: "exigencia_merito", label: "Exigência de Mérito", color: "bg-amber-100 text-amber-800", requiresDeadline: true },
];

interface StatusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Status <span className="text-red-500">*</span></Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          {statusList.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", status.color)}>
                  {status.label}
                </Badge>
                {status.requiresDeadline && (
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

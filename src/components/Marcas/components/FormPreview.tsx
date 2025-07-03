
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { statusList } from "./StatusSelector";

interface FormPreviewProps {
  form: {
    nome: string;
    numeroProcesso: string;
    titular: string;
    status: string;
    dataLimiteManifestacao: string;
  };
  requiresDeadline: boolean;
}

export function FormPreview({ form, requiresDeadline }: FormPreviewProps) {
  const statusSelecionado = statusList.find(s => s.value === form.status);

  if (!form.nome) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <p className="text-sm font-medium text-gray-700 mb-2">Preview da Marca</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{form.nome}</p>
          <p className="text-sm text-gray-600">{form.numeroProcesso}</p>
          <p className="text-xs text-gray-500">{form.titular}</p>
          {requiresDeadline && form.dataLimiteManifestacao && (
            <p className="text-xs text-orange-600 font-medium mt-1">
              📅 Prazo: {new Date(form.dataLimiteManifestacao).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
        {statusSelecionado && (
          <div className="flex items-center gap-2">
            <Badge className={statusSelecionado.color}>
              {statusSelecionado.label}
            </Badge>
            {requiresDeadline && (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

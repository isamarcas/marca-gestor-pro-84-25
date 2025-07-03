
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateFieldsSectionProps {
  form: {
    dataDeposito: string;
    proximoPrazo: string;
    dataLimiteManifestacao: string;
  };
  errors: Record<string, string>;
  requiresDeadline: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DateFieldsSection({ form, errors, requiresDeadline, onChange }: DateFieldsSectionProps) {
  return (
    <>
      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataDeposito">Data de Depósito <span className="text-red-500">*</span></Label>
          <Input
            id="dataDeposito"
            name="dataDeposito"
            type="date"
            value={form.dataDeposito}
            onChange={onChange}
            className={errors.dataDeposito ? "border-red-500" : ""}
          />
          {errors.dataDeposito && <p className="text-xs text-red-500">{errors.dataDeposito}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="proximoPrazo">Próximo Prazo <span className="text-red-500">*</span></Label>
          <Input
            id="proximoPrazo"
            name="proximoPrazo"
            type="date"
            value={form.proximoPrazo}
            onChange={onChange}
            className={errors.proximoPrazo ? "border-red-500" : ""}
          />
          {errors.proximoPrazo && <p className="text-xs text-red-500">{errors.proximoPrazo}</p>}
        </div>
      </div>

      {/* Conditional deadline field */}
      {requiresDeadline && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <Label className="text-orange-800 font-semibold">
              Data Limite para Manifestação <span className="text-red-500">*</span>
            </Label>
          </div>
          <Input
            id="dataLimiteManifestacao"
            name="dataLimiteManifestacao"
            type="date"
            value={form.dataLimiteManifestacao}
            onChange={onChange}
            className={cn(
              "bg-white",
              errors.dataLimiteManifestacao ? "border-red-500" : ""
            )}
            placeholder="Selecione a data limite"
          />
          {errors.dataLimiteManifestacao && (
            <p className="text-xs text-red-500 mt-1">{errors.dataLimiteManifestacao}</p>
          )}
          <p className="text-xs text-orange-600 mt-2">
            Este status requer uma data limite para manifestação. Um alerta será criado automaticamente para monitorar este prazo.
          </p>
        </div>
      )}
    </>
  );
}

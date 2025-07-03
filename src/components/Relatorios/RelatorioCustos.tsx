
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RelatorioCustos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Custos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Análise de Custos</p>
          <p className="text-gray-400 text-sm">
            Esta funcionalidade será implementada em breve com integração ao módulo financeiro
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

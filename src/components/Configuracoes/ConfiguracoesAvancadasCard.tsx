
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ConfiguracoesAvancadasCard() {
  const { toast } = useToast();

  return (
    <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">Configurações Avançadas</h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Acesse configurações avançadas do sistema, backup e integrações.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-900 w-full sm:w-auto"
              onClick={() => toast({ title: "Backup", description: "Funcionalidade de backup será implementada em breve" })}
            >
              <Database className="h-4 w-4 mr-2" />
              Backup
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-900 w-full sm:w-auto"
              onClick={() => toast({ title: "Integrações", description: "Funcionalidade de integrações será implementada em breve" })}
            >
              <Mail className="h-4 w-4 mr-2" />
              Integrações
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

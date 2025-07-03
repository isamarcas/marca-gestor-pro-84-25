
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SistemaCard() {
  const { toast } = useToast();

  const [configuracoesSistema, setConfiguracoesSistema] = useState({
    modoEscuro: false,
    idioma: 'pt-BR',
    backupAutomatico: true
  });

  const toggleConfiguracao = (tipo: keyof typeof configuracoesSistema) => {
    setConfiguracoesSistema(prev => {
      const newState = { ...prev, [tipo]: !prev[tipo] };
      toast({
        title: "Configuração atualizada", 
        description: `${tipo === 'modoEscuro' ? 'Modo Escuro' : 
                     tipo === 'backupAutomatico' ? 'Backup Automático' : 
                     'Configuração'} ${newState[tipo] ? 'ativado' : 'desativado'}`
      });
      return newState;
    });
  };

  const alterarIdioma = () => {
    toast({
      title: "Idioma",
      description: "Funcionalidade de alteração de idioma será implementada em breve"
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Sistema</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Modo Escuro</p>
            <p className="text-xs sm:text-sm text-gray-500">Interface com tema escuro</p>
          </div>
          <Switch 
            checked={configuracoesSistema.modoEscuro}
            onCheckedChange={() => toggleConfiguracao('modoEscuro')}
          />
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Idioma</p>
            <p className="text-xs sm:text-sm text-gray-500">Português (Brasil)</p>
          </div>
          <Button onClick={alterarIdioma} variant="outline" size="sm">
            Alterar
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Backup Automático</p>
            <p className="text-xs sm:text-sm text-gray-500">Backup diário dos dados</p>
          </div>
          <Switch 
            checked={configuracoesSistema.backupAutomatico}
            onCheckedChange={() => toggleConfiguracao('backupAutomatico')}
          />
        </div>
      </CardContent>
    </Card>
  );
}

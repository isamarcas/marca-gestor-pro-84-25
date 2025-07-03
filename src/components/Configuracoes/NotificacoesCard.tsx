
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NotificacoesCard() {
  const { toast } = useToast();

  const [notificacoes, setNotificacoes] = useState({
    alertasPrazos: true,
    relatoriosSemanais: false,
    atualizacoesSistema: true
  });

  const toggleNotificacao = (tipo: keyof typeof notificacoes) => {
    setNotificacoes(prev => {
      const newState = { ...prev, [tipo]: !prev[tipo] };
      toast({
        title: "Configuração atualizada",
        description: `${tipo === 'alertasPrazos' ? 'Alertas de Prazos' : 
                     tipo === 'relatoriosSemanais' ? 'Relatórios Semanais' : 
                     'Atualizações do Sistema'} ${newState[tipo] ? 'ativado' : 'desativado'}`
      });
      return newState;
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Notificações</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Alertas de Prazos</p>
            <p className="text-xs sm:text-sm text-gray-500">Receber alertas sobre prazos críticos</p>
          </div>
          <Switch 
            checked={notificacoes.alertasPrazos}
            onCheckedChange={() => toggleNotificacao('alertasPrazos')}
          />
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Relatórios Semanais</p>
            <p className="text-xs sm:text-sm text-gray-500">Resumo semanal por email</p>
          </div>
          <Switch 
            checked={notificacoes.relatoriosSemanais}
            onCheckedChange={() => toggleNotificacao('relatoriosSemanais')}
          />
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Atualizações do Sistema</p>
            <p className="text-xs sm:text-sm text-gray-500">Novidades e atualizações</p>
          </div>
          <Switch 
            checked={notificacoes.atualizacoesSistema}
            onCheckedChange={() => toggleNotificacao('atualizacoesSistema')}
          />
        </div>
      </CardContent>
    </Card>
  );
}

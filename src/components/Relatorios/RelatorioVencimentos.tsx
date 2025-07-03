
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Marca } from "@/types";
import { useClientes } from "@/hooks/useClientes";

interface RelatorioVencimentosProps {
  marcas: Marca[];
}

export function RelatorioVencimentos({ marcas }: RelatorioVencimentosProps) {
  const { clientes } = useClientes();
  const hoje = new Date();

  // Função para obter o nome do cliente pelo ID
  const getClienteNome = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };
  
  // Classificar marcas por prazo
  const marcasComPrazo = marcas.filter(marca => marca.proximoPrazo);
  
  const marcasVencendo = marcasComPrazo.filter(marca => {
    const prazo = new Date(marca.proximoPrazo!);
    const diasRestantes = differenceInDays(prazo, hoje);
    return diasRestantes >= 0 && diasRestantes <= 90;
  }).sort((a, b) => new Date(a.proximoPrazo!).getTime() - new Date(b.proximoPrazo!).getTime());

  const marcasVencidas = marcasComPrazo.filter(marca => {
    const prazo = new Date(marca.proximoPrazo!);
    return prazo < hoje;
  }).sort((a, b) => new Date(b.proximoPrazo!).getTime() - new Date(a.proximoPrazo!).getTime());

  const getUrgenciaColor = (diasRestantes: number) => {
    if (diasRestantes < 0) return 'text-red-600 bg-red-50';
    if (diasRestantes <= 15) return 'text-red-600 bg-red-50';
    if (diasRestantes <= 30) return 'text-orange-600 bg-orange-50';
    if (diasRestantes <= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getUrgenciaBadge = (diasRestantes: number) => {
    if (diasRestantes < 0) return <Badge className="bg-red-100 text-red-800">Vencido</Badge>;
    if (diasRestantes <= 15) return <Badge className="bg-red-100 text-red-800">Urgente</Badge>;
    if (diasRestantes <= 30) return <Badge className="bg-orange-100 text-orange-800">Crítico</Badge>;
    if (diasRestantes <= 60) return <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>;
    return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
  };

  const estatisticas = {
    vencidos: marcasVencidas.length,
    proximos15: marcasVencendo.filter(m => differenceInDays(new Date(m.proximoPrazo!), hoje) <= 15).length,
    proximos30: marcasVencendo.filter(m => {
      const dias = differenceInDays(new Date(m.proximoPrazo!), hoje);
      return dias > 15 && dias <= 30;
    }).length,
    proximos90: marcasVencendo.filter(m => {
      const dias = differenceInDays(new Date(m.proximoPrazo!), hoje);
      return dias > 30 && dias <= 90;
    }).length
  };

  return (
    <div className="space-y-8">
      {/* Estatísticas de Vencimento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-red-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {estatisticas.vencidos}
                </div>
                <p className="text-red-700 font-medium">Vencidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {estatisticas.proximos15}
                </div>
                <p className="text-orange-700 font-medium">Próximos 15 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {estatisticas.proximos30}
                </div>
                <p className="text-yellow-700 font-medium">Próximos 30 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {estatisticas.proximos90}
                </div>
                <p className="text-blue-700 font-medium">Próximos 90 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cronograma de Vencimentos */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            Cronograma de Prazos e Renovações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[...marcasVencidas, ...marcasVencendo].length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Nenhum prazo próximo</p>
              <p className="text-gray-400 text-sm">
                Todas as marcas estão com prazos em dia
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo de Prazo</TableHead>
                    <TableHead>Data Limite</TableHead>
                    <TableHead>Dias Restantes</TableHead>
                    <TableHead>Urgência</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...marcasVencidas, ...marcasVencendo].map((marca) => {
                    const diasRestantes = differenceInDays(new Date(marca.proximoPrazo!), hoje);
                    return (
                      <TableRow key={marca.id} className={`hover:bg-gray-50 ${getUrgenciaColor(diasRestantes)}`}>
                        <TableCell>
                          <div className="font-medium">{marca.nome}</div>
                          <div className="text-xs text-gray-500">Nº {marca.numeroProcesso}</div>
                        </TableCell>
                        <TableCell>{getClienteNome(marca.clienteId)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            Renovação
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={diasRestantes < 0 ? 'font-bold text-red-600' : 'font-medium'}>
                            {format(new Date(marca.proximoPrazo!), 'dd/MM/yyyy')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-bold ${
                            diasRestantes < 0 ? 'text-red-600' : 
                            diasRestantes <= 15 ? 'text-red-600' : 
                            diasRestantes <= 30 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {diasRestantes < 0 ? `${Math.abs(diasRestantes)} dias atraso` : `${diasRestantes} dias`}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getUrgenciaBadge(diasRestantes)}
                        </TableCell>
                        <TableCell>
                          <Badge className={marca.status === 'deferido' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {marca.status === 'deferido' ? 'Ativo' : 'Em processo'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

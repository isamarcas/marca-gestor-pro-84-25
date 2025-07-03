
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, Plus, Bell, CheckCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInDays, isBefore, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertaPrazo } from "@/types";

type Props = {
  marcaId: string;
  alertas: AlertaPrazo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdicionarAlerta: (alerta: Omit<AlertaPrazo, 'id' | 'createdAt'>) => void;
  onResolverAlerta: (alertaId: string) => void;
  onAdiarAlerta: (alertaId: string, novaData: Date) => void;
};

const tipoLabels = {
  renovacao: "Renovação",
  oposicao: "Oposição", 
  resposta_exigencia: "Resposta à Exigência",
  pagamento_taxa: "Pagamento de Taxa",
  outro: "Outro"
};

const prioridadeLabels = {
  baixa: "Baixa",
  media: "Média", 
  alta: "Alta",
  critica: "Crítica"
};

const prioridadeColors = {
  baixa: "bg-green-100 text-green-800",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-orange-100 text-orange-800",
  critica: "bg-red-100 text-red-800"
};

export function MonitoramentoPrazosDialog({ marcaId, alertas, open, onOpenChange, onAdicionarAlerta, onResolverAlerta, onAdiarAlerta }: Props) {
  const [novoAlerta, setNovoAlerta] = useState({
    tipo: 'outro' as keyof typeof tipoLabels,
    titulo: '',
    descricao: '',
    dataVencimento: '',
    diasAntecedencia: 30,
    prioridade: 'media' as keyof typeof prioridadeLabels,
    acaoNecessaria: '',
    responsavel: ''
  });

  const alertasAtivos = alertas.filter(a => a.status === 'ativo');
  const alertasVencendo = alertasAtivos.filter(a => {
    const diasRestantes = differenceInDays(a.dataVencimento, new Date());
    return diasRestantes <= a.diasAntecedencia && diasRestantes >= 0;
  });
  const alertasVencidos = alertasAtivos.filter(a => isBefore(a.dataVencimento, new Date()));

  const handleAdicionarAlerta = () => {
    if (novoAlerta.titulo && novoAlerta.dataVencimento) {
      onAdicionarAlerta({
        marcaId,
        tipo: novoAlerta.tipo,
        titulo: novoAlerta.titulo,
        descricao: novoAlerta.descricao,
        dataVencimento: new Date(novoAlerta.dataVencimento),
        diasAntecedencia: novoAlerta.diasAntecedencia,
        prioridade: novoAlerta.prioridade,
        acaoNecessaria: novoAlerta.acaoNecessaria,
        responsavel: novoAlerta.responsavel,
        status: 'ativo'
      });
      
      setNovoAlerta({
        tipo: 'outro',
        titulo: '',
        descricao: '',
        dataVencimento: '',
        diasAntecedencia: 30,
        prioridade: 'media',
        acaoNecessaria: '',
        responsavel: ''
      });
    }
  };

  const getDiasRestantes = (dataVencimento: Date) => {
    return differenceInDays(dataVencimento, new Date());
  };

  const getStatusPrazo = (alerta: AlertaPrazo) => {
    const diasRestantes = getDiasRestantes(alerta.dataVencimento);
    
    if (diasRestantes < 0) return { label: 'Vencido', color: 'bg-red-100 text-red-800' };
    if (diasRestantes === 0) return { label: 'Vence Hoje', color: 'bg-red-100 text-red-800' };
    if (diasRestantes <= 7) return { label: `${diasRestantes} dias`, color: 'bg-orange-100 text-orange-800' };
    if (diasRestantes <= 30) return { label: `${diasRestantes} dias`, color: 'bg-yellow-100 text-yellow-800' };
    return { label: `${diasRestantes} dias`, color: 'bg-green-100 text-green-800' };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Monitoramento de Prazos</DialogTitle>
          <DialogDescription>
            Gerencie prazos importantes e alertas da marca
          </DialogDescription>
        </DialogHeader>

        {/* Resumo de Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alertas Ativos</p>
                  <p className="text-2xl font-bold">{alertasAtivos.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vencendo Soon</p>
                  <p className="text-2xl font-bold text-orange-600">{alertasVencendo.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vencidos</p>
                  <p className="text-2xl font-bold text-red-600">{alertasVencidos.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Novo Alerta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adicionar Novo Alerta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <Select value={novoAlerta.tipo} onValueChange={(value) => setNovoAlerta({...novoAlerta, tipo: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(tipoLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  value={novoAlerta.titulo}
                  onChange={(e) => setNovoAlerta({...novoAlerta, titulo: e.target.value})}
                  placeholder="Título do alerta"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
                <Input
                  type="date"
                  value={novoAlerta.dataVencimento}
                  onChange={(e) => setNovoAlerta({...novoAlerta, dataVencimento: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prioridade</label>
                <Select value={novoAlerta.prioridade} onValueChange={(value) => setNovoAlerta({...novoAlerta, prioridade: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(prioridadeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Dias de Antecedência</label>
                <Input
                  type="number"
                  value={novoAlerta.diasAntecedencia}
                  onChange={(e) => setNovoAlerta({...novoAlerta, diasAntecedencia: parseInt(e.target.value)})}
                  min="1"
                  max="365"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Responsável</label>
                <Input
                  value={novoAlerta.responsavel}
                  onChange={(e) => setNovoAlerta({...novoAlerta, responsavel: e.target.value})}
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Input
                value={novoAlerta.descricao}
                onChange={(e) => setNovoAlerta({...novoAlerta, descricao: e.target.value})}
                placeholder="Descrição detalhada do alerta"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ação Necessária</label>
              <Input
                value={novoAlerta.acaoNecessaria}
                onChange={(e) => setNovoAlerta({...novoAlerta, acaoNecessaria: e.target.value})}
                placeholder="Descreva a ação que deve ser tomada"
              />
            </div>
            
            <Button onClick={handleAdicionarAlerta} disabled={!novoAlerta.titulo || !novoAlerta.dataVencimento}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Alerta
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            {alertasAtivos.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum alerta ativo</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertasAtivos.map((alerta) => {
                      const statusPrazo = getStatusPrazo(alerta);
                      return (
                        <TableRow key={alerta.id}>
                          <TableCell className="font-medium">{alerta.titulo}</TableCell>
                          <TableCell>{tipoLabels[alerta.tipo]}</TableCell>
                          <TableCell>
                            <Badge className={prioridadeColors[alerta.prioridade]}>
                              {prioridadeLabels[alerta.prioridade]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(alerta.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusPrazo.color}>
                              {statusPrazo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{alerta.responsavel || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => onResolverAlerta(alerta.id)}
                                title="Marcar como resolvido"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => onAdiarAlerta(alerta.id, addDays(alerta.dataVencimento, 30))}
                                title="Adiar por 30 dias"
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                            </div>
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
      </DialogContent>
    </Dialog>
  );
}

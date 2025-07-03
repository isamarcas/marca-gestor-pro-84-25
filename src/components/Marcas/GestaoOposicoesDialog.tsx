
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Plus, Eye, FileText, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Oposicao } from "@/types";

type Props = {
  marcaId: string;
  oposicoes: Oposicao[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdicionarOposicao: (oposicao: Omit<Oposicao, 'id'>) => void;
  onAtualizarStatus: (oposicaoId: string, novoStatus: Oposicao['status']) => void;
};

const statusLabels = {
  pendente: "Pendente",
  deferida: "Deferida",
  indeferida: "Indeferida",
  em_analise: "Em Análise"
};

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  deferida: "bg-red-100 text-red-800", 
  indeferida: "bg-green-100 text-green-800",
  em_analise: "bg-blue-100 text-blue-800"
};

export function GestaoOposicoesDialog({ marcaId, oposicoes, open, onOpenChange, onAdicionarOposicao, onAtualizarStatus }: Props) {
  const [novaOposicao, setNovaOposicao] = useState({
    numeroProcesso: '',
    oponente: '',
    dataOposicao: '',
    motivo: '',
    prazoResposta: '',
    observacoes: ''
  });

  const oposicoesAtivas = oposicoes.filter(o => o.status === 'pendente' || o.status === 'em_analise');
  const oposicoesVencendoPrazo = oposicoesAtivas.filter(o => {
    if (!o.prazoResposta) return false;
    const diasRestantes = differenceInDays(o.prazoResposta, new Date());
    return diasRestantes <= 15 && diasRestantes >= 0;
  });

  const handleAdicionarOposicao = () => {
    if (novaOposicao.numeroProcesso && novaOposicao.oponente && novaOposicao.dataOposicao) {
      onAdicionarOposicao({
        marcaId,
        numeroProcesso: novaOposicao.numeroProcesso,
        oponente: novaOposicao.oponente,
        dataOposicao: new Date(novaOposicao.dataOposicao),
        motivo: novaOposicao.motivo,
        status: 'pendente',
        prazoResposta: novaOposicao.prazoResposta ? new Date(novaOposicao.prazoResposta) : undefined,
        documentos: [],
        observacoes: novaOposicao.observacoes
      });
      
      setNovaOposicao({
        numeroProcesso: '',
        oponente: '',
        dataOposicao: '',
        motivo: '',
        prazoResposta: '',
        observacoes: ''
      });
    }
  };

  const getDiasRestantesPrazo = (prazoResposta?: Date) => {
    if (!prazoResposta) return null;
    return differenceInDays(prazoResposta, new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestão de Oposições</DialogTitle>
          <DialogDescription>
            Gerencie oposições e defesas relacionadas à marca
          </DialogDescription>
        </DialogHeader>

        {/* Resumo de Oposições */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Oposições</p>
                  <p className="text-2xl font-bold">{oposicoes.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ativas</p>
                  <p className="text-2xl font-bold text-orange-600">{oposicoesAtivas.length}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vencendo Prazo</p>
                  <p className="text-2xl font-bold text-red-600">{oposicoesVencendoPrazo.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Nova Oposição */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Registrar Nova Oposição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nº do Processo</label>
                <Input
                  value={novaOposicao.numeroProcesso}
                  onChange={(e) => setNovaOposicao({...novaOposicao, numeroProcesso: e.target.value})}
                  placeholder="Número do processo de oposição"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Oponente</label>
                <Input
                  value={novaOposicao.oponente}
                  onChange={(e) => setNovaOposicao({...novaOposicao, oponente: e.target.value})}
                  placeholder="Nome do oponente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data da Oposição</label>
                <Input
                  type="date"
                  value={novaOposicao.dataOposicao}
                  onChange={(e) => setNovaOposicao({...novaOposicao, dataOposicao: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prazo para Resposta</label>
                <Input
                  type="date"
                  value={novaOposicao.prazoResposta}
                  onChange={(e) => setNovaOposicao({...novaOposicao, prazoResposta: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Motivo da Oposição</label>
              <Input
                value={novaOposicao.motivo}
                onChange={(e) => setNovaOposicao({...novaOposicao, motivo: e.target.value})}
                placeholder="Descreva o motivo da oposição"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Observações</label>
              <Input
                value={novaOposicao.observacoes}
                onChange={(e) => setNovaOposicao({...novaOposicao, observacoes: e.target.value})}
                placeholder="Observações adicionais"
              />
            </div>
            
            <Button 
              onClick={handleAdicionarOposicao} 
              disabled={!novaOposicao.numeroProcesso || !novaOposicao.oponente || !novaOposicao.dataOposicao}
            >
              <Plus className="h-4 w-4 mr-2" />
              Registrar Oposição
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Oposições */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Oposições</CardTitle>
          </CardHeader>
          <CardContent>
            {oposicoes.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma oposição registrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº Processo</TableHead>
                      <TableHead>Oponente</TableHead>
                      <TableHead>Data Oposição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prazo Resposta</TableHead>
                      <TableHead>Dias Restantes</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oposicoes.map((oposicao) => {
                      const diasRestantes = getDiasRestantesPrazo(oposicao.prazoResposta);
                      return (
                        <TableRow key={oposicao.id}>
                          <TableCell className="font-mono text-sm">{oposicao.numeroProcesso}</TableCell>
                          <TableCell className="font-medium">{oposicao.oponente}</TableCell>
                          <TableCell>
                            {format(oposicao.dataOposicao, 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[oposicao.status]}>
                              {statusLabels[oposicao.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {oposicao.prazoResposta 
                              ? format(oposicao.prazoResposta, 'dd/MM/yyyy', { locale: ptBR })
                              : '-'
                            }
                          </TableCell>
                          <TableCell>
                            {diasRestantes !== null ? (
                              <Badge className={
                                diasRestantes < 0 
                                  ? "bg-red-100 text-red-800"
                                  : diasRestantes <= 15 
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                              }>
                                {diasRestantes < 0 ? 'Vencido' : `${diasRestantes} dias`}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" title="Ver detalhes">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Select 
                                value={oposicao.status} 
                                onValueChange={(value) => onAtualizarStatus(oposicao.id, value as Oposicao['status'])}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusLabels).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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

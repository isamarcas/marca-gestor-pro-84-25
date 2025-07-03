import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Activity, Plus, Settings, AlertTriangle, Clock, BarChart3, FileText, CheckCircle } from 'lucide-react';
import { useClientes } from '@/hooks/useClientes';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function GerenciarPortalDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
  const [tipoAtualizacao, setTipoAtualizacao] = useState<'prazos' | 'atividades' | 'estatisticas'>('prazos');
  
  // Estados para Prazos Críticos
  const [novoPrazo, setNovoPrazo] = useState({
    marca: '',
    prazo: '',
    tipo: '',
    urgencia: 'media' as 'alta' | 'media' | 'baixa'
  });

  // Estados para Atividades Recentes
  const [novaAtividade, setNovaAtividade] = useState({
    tipo: 'status' as 'status' | 'documento' | 'comunicacao',
    titulo: '',
    descricao: '',
    marca: ''
  });

  // Estados para Estatísticas
  const [estatisticas, setEstatisticas] = useState({
    totalMarcas: 0,
    emAnalise: 0,
    deferidas: 0,
    alertas: 0
  });

  const { clientes } = useClientes();
  const clienteInfo = clientes.find(c => c.id === clienteSelecionado);

  // Carregar estatísticas do cliente quando selecionado
  const carregarEstatisticas = (clienteId: string) => {
    try {
      const statsData = localStorage.getItem(`stats_${clienteId}`);
      if (statsData) {
        const stats = JSON.parse(statsData);
        setEstatisticas(stats);
      } else {
        // Valores padrão se não houver dados salvos
        setEstatisticas({
          totalMarcas: 0,
          emAnalise: 0,
          deferidas: 0,
          alertas: 0
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setEstatisticas({
        totalMarcas: 0,
        emAnalise: 0,
        deferidas: 0,
        alertas: 0
      });
    }
  };

  const handleClienteChange = (clienteId: string) => {
    setClienteSelecionado(clienteId);
    carregarEstatisticas(clienteId);
  };

  const handleSalvarEstatisticas = () => {
    if (!clienteSelecionado) {
      toast({
        title: "Selecione um cliente",
        description: "Você precisa selecionar um cliente antes de salvar as estatísticas.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Salvar estatísticas no localStorage
      localStorage.setItem(`stats_${clienteSelecionado}`, JSON.stringify(estatisticas));
      
      console.log('Estatísticas salvas para cliente', clienteSelecionado, ':', estatisticas);
      
      toast({
        title: "Estatísticas atualizadas!",
        description: `As estatísticas do portal foram atualizadas com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar estatísticas.",
        variant: "destructive",
      });
    }
  };

  const handleAdicionarPrazo = () => {
    if (!clienteSelecionado || !novoPrazo.marca || !novoPrazo.prazo || !novoPrazo.tipo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar o prazo crítico.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Carregar prazos existentes
      const prazosExistentes = JSON.parse(localStorage.getItem(`prazos_${clienteSelecionado}`) || '[]');
      
      // Criar novo prazo
      const novoPrazoObj = {
        id: Date.now().toString(),
        marca: novoPrazo.marca,
        prazo: novoPrazo.prazo,
        tipo: novoPrazo.tipo,
        urgencia: novoPrazo.urgencia
      };

      // Adicionar à lista
      const prazosAtualizados = [...prazosExistentes, novoPrazoObj];
      
      // Salvar no localStorage
      localStorage.setItem(`prazos_${clienteSelecionado}`, JSON.stringify(prazosAtualizados));
      
      console.log('Prazo adicionado:', novoPrazoObj);
      console.log('Prazos atualizados para cliente', clienteSelecionado, ':', prazosAtualizados);
      
      toast({
        title: "Prazo crítico adicionado!",
        description: `Novo prazo para a marca "${novoPrazo.marca}" foi adicionado ao portal do cliente.`,
      });

      // Reset do formulário
      setNovoPrazo({ marca: '', prazo: '', tipo: '', urgencia: 'media' });
    } catch (error) {
      console.error('Erro ao adicionar prazo:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar prazo crítico.",
        variant: "destructive",
      });
    }
  };

  const handleAdicionarAtividade = () => {
    if (!clienteSelecionado || !novaAtividade.titulo || !novaAtividade.descricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar a atividade.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Carregar atividades existentes
      const atividadesExistentes = JSON.parse(localStorage.getItem(`atividades_${clienteSelecionado}`) || '[]');
      
      // Criar nova atividade
      const novaAtividadeObj = {
        id: Date.now().toString(),
        tipo: novaAtividade.tipo,
        titulo: novaAtividade.titulo,
        descricao: novaAtividade.descricao,
        marca: novaAtividade.marca,
        data: new Date().toISOString()
      };

      // Adicionar à lista
      const atividadesAtualizadas = [...atividadesExistentes, novaAtividadeObj];
      
      // Salvar no localStorage
      localStorage.setItem(`atividades_${clienteSelecionado}`, JSON.stringify(atividadesAtualizadas));
      
      console.log('Atividade adicionada:', novaAtividadeObj);
      console.log('Atividades atualizadas para cliente', clienteSelecionado, ':', atividadesAtualizadas);
      
      toast({
        title: "Atividade adicionada!",
        description: `Nova atividade "${novaAtividade.titulo}" foi adicionada ao portal do cliente.`,
      });

      // Reset do formulário
      setNovaAtividade({ tipo: 'status', titulo: '', descricao: '', marca: '' });
    } catch (error) {
      console.error('Erro ao adicionar atividade:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar atividade.",
        variant: "destructive",
      });
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoAtividadeColor = (tipo: string) => {
    switch (tipo) {
      case 'status': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'documento': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'comunicacao': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Settings className="mr-2 h-4 w-4" />
          Gerenciar Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gerenciar Portal do Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seleção do Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Select value={clienteSelecionado} onValueChange={handleClienteChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {clienteInfo && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-blue-900">{clienteInfo.nome}</p>
                    <p className="text-sm text-blue-700">{clienteInfo.email}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {clienteInfo.totalMarcas} marcas
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {clienteInfo.marcasAtivas} ativas
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {clienteSelecionado && (
            <Tabs value={tipoAtualizacao} onValueChange={(value) => setTipoAtualizacao(value as 'prazos' | 'atividades' | 'estatisticas')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="estatisticas" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Estatísticas
                </TabsTrigger>
                <TabsTrigger value="prazos" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Prazos Críticos
                </TabsTrigger>
                <TabsTrigger value="atividades" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Atividades Recentes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="estatisticas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Editar Estatísticas do Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="totalMarcas">Total de Marcas</Label>
                        <Input
                          id="totalMarcas"
                          type="number"
                          min="0"
                          value={estatisticas.totalMarcas}
                          onChange={(e) => setEstatisticas(prev => ({ ...prev, totalMarcas: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emAnalise">Em Análise</Label>
                        <Input
                          id="emAnalise"
                          type="number"
                          min="0"
                          value={estatisticas.emAnalise}
                          onChange={(e) => setEstatisticas(prev => ({ ...prev, emAnalise: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deferidas">Deferidas</Label>
                        <Input
                          id="deferidas"
                          type="number"
                          min="0"
                          value={estatisticas.deferidas}
                          onChange={(e) => setEstatisticas(prev => ({ ...prev, deferidas: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alertas">Alertas</Label>
                        <Input
                          id="alertas"
                          type="number"
                          min="0"
                          value={estatisticas.alertas}
                          onChange={(e) => setEstatisticas(prev => ({ ...prev, alertas: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Preview das Estatísticas */}
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardContent className="p-4">
                        <p className="font-semibold text-blue-900 mb-3">Preview das Estatísticas</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-xs text-gray-600">Total</p>
                              <p className="font-bold text-blue-900">{estatisticas.totalMarcas}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <div>
                              <p className="text-xs text-gray-600">Em Análise</p>
                              <p className="font-bold text-orange-900">{estatisticas.emAnalise}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-xs text-gray-600">Deferidas</p>
                              <p className="font-bold text-green-900">{estatisticas.deferidas}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="text-xs text-gray-600">Alertas</p>
                              <p className="font-bold text-red-900">{estatisticas.alertas}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button onClick={handleSalvarEstatisticas} className="w-full">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Salvar Estatísticas
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prazos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Adicionar Prazo Crítico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="marca">Nome da Marca</Label>
                        <Input
                          id="marca"
                          value={novoPrazo.marca}
                          onChange={(e) => setNovoPrazo(prev => ({ ...prev, marca: e.target.value }))}
                          placeholder="Ex: TECHNOVATE"
                        />
                      </div>
                      <div>
                        <Label htmlFor="prazo">Data do Prazo</Label>
                        <Input
                          id="prazo"
                          type="date"
                          value={novoPrazo.prazo}
                          onChange={(e) => setNovoPrazo(prev => ({ ...prev, prazo: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipo">Tipo de Prazo</Label>
                        <Input
                          id="tipo"
                          value={novoPrazo.tipo}
                          onChange={(e) => setNovoPrazo(prev => ({ ...prev, tipo: e.target.value }))}
                          placeholder="Ex: Resposta à exigência INPI"
                        />
                      </div>
                      <div>
                        <Label htmlFor="urgencia">Nível de Urgência</Label>
                        <Select value={novoPrazo.urgencia} onValueChange={(value) => setNovoPrazo(prev => ({ ...prev, urgencia: value as 'alta' | 'media' | 'baixa' }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alta">Alta Prioridade</SelectItem>
                            <SelectItem value="media">Média Prioridade</SelectItem>
                            <SelectItem value="baixa">Baixa Prioridade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {novoPrazo.prazo && (
                      <Card className="border-blue-200 bg-blue-50/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-blue-900">Preview do Prazo</p>
                              <p className="text-sm text-blue-700">
                                {novoPrazo.marca || 'Nome da Marca'} - {novoPrazo.tipo || 'Tipo do prazo'}
                              </p>
                              <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                Vence em {format(new Date(novoPrazo.prazo), 'dd/MM/yyyy', { locale: ptBR })}
                              </p>
                            </div>
                            <Badge className={getUrgenciaColor(novoPrazo.urgencia)}>
                              {novoPrazo.urgencia.charAt(0).toUpperCase() + novoPrazo.urgencia.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button onClick={handleAdicionarPrazo} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Prazo Crítico
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="atividades" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Adicionar Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipoAtividade">Tipo de Atividade</Label>
                        <Select value={novaAtividade.tipo} onValueChange={(value) => setNovaAtividade(prev => ({ ...prev, tipo: value as 'status' | 'documento' | 'comunicacao' }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="status">Atualização de Status</SelectItem>
                            <SelectItem value="documento">Novo Documento</SelectItem>
                            <SelectItem value="comunicacao">Comunicação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="marcaAtividade">Marca (opcional)</Label>
                        <Input
                          id="marcaAtividade"
                          value={novaAtividade.marca}
                          onChange={(e) => setNovaAtividade(prev => ({ ...prev, marca: e.target.value }))}
                          placeholder="Ex: TECHNOVATE"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="titulo">Título da Atividade</Label>
                      <Input
                        id="titulo"
                        value={novaAtividade.titulo}
                        onChange={(e) => setNovaAtividade(prev => ({ ...prev, titulo: e.target.value }))}
                        placeholder="Ex: Status atualizado"
                      />
                    </div>

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={novaAtividade.descricao}
                        onChange={(e) => setNovaAtividade(prev => ({ ...prev, descricao: e.target.value }))}
                        placeholder="Ex: Marca deferida pelo INPI"
                        rows={3}
                      />
                    </div>

                    {novaAtividade.titulo && (
                      <Card className="border-green-200 bg-green-50/30">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Activity className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold text-green-900">{novaAtividade.titulo}</p>
                                <Badge className={getTipoAtividadeColor(novaAtividade.tipo)}>
                                  {novaAtividade.tipo === 'status' ? 'Status' : 
                                   novaAtividade.tipo === 'documento' ? 'Documento' : 'Comunicação'}
                                </Badge>
                              </div>
                              <p className="text-sm text-green-700 mt-1">
                                {novaAtividade.descricao || 'Descrição da atividade'}
                              </p>
                              {novaAtividade.marca && (
                                <p className="text-xs text-green-600 mt-1">
                                  Marca: {novaAtividade.marca}
                                </p>
                              )}
                              <p className="text-xs text-green-500 mt-2">
                                Adicionado agora
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button onClick={handleAdicionarAtividade} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Atividade
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

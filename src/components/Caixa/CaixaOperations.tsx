
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, FileText, Scale, Shield } from 'lucide-react';

interface CaixaOperationsProps {
  onRegistrar: (movimento: {
    descricao: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    formaPagamento: string;
    categoria?: string;
  }) => Promise<boolean>;
  isLoading: boolean;
}

export function CaixaOperations({ onRegistrar, isLoading }: CaixaOperationsProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (tipo: 'entrada' | 'saida') => {
    if (!descricao.trim() || !valor || !formaPagamento) return;

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) return;

    const sucesso = await onRegistrar({
      descricao: descricao.trim(),
      valor: valorNumerico,
      tipo,
      formaPagamento,
      categoria: categoria.trim() || undefined
    });

    if (sucesso) {
      setDescricao('');
      setValor('');
      setFormaPagamento('');
      setCategoria('');
    }
  };

  const categoriasEntrada = [
    'Registro de Marcas',
    'Registro de Patentes',
    'Renovações',
    'Consultas e Buscas',
    'Acompanhamento de Processos',
    'Oposições e Recursos',
    'Consultoria em PI',
    'Outros Serviços'
  ];

  const categoriasSaida = [
    'Taxas INPI',
    'Despesas Cartoriais',
    'Publicações',
    'Traduções',
    'Honorários Terceiros',
    'Material de Escritório',
    'Marketing e Publicidade',
    'Despesas Administrativas'
  ];

  const formasPagamento = [
    'PIX', 'Cartão de Crédito', 'Cartão de Débito', 
    'Transferência Bancária', 'Boleto', 'Dinheiro'
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          Nova Movimentação Financeira
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="entrada" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="entrada" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4" />
              Receita
            </TabsTrigger>
            <TabsTrigger value="saida" className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <TrendingDown className="h-4 w-4" />
              Despesa
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-sm font-semibold text-gray-700">
                  Valor (R$) *
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Forma de Pagamento *
                </Label>
                <Select value={formaPagamento} onValueChange={setFormaPagamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma" />
                  </SelectTrigger>
                  <SelectContent>
                    {formasPagamento.map((forma) => (
                      <SelectItem key={forma} value={forma}>
                        {forma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-sm font-semibold text-gray-700">
                Descrição *
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descreva a movimentação (ex: Taxa de registro marca classe 35...)"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <TabsContent value="entrada" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Categoria do Serviço
                </Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriasEntrada.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleSubmit('entrada')}
                disabled={isLoading || !descricao.trim() || !valor || !formaPagamento}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 text-lg font-semibold shadow-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Registrar Receita
              </Button>
            </TabsContent>

            <TabsContent value="saida" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Categoria da Despesa
                </Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriasSaida.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleSubmit('saida')}
                disabled={isLoading || !descricao.trim() || !valor || !formaPagamento}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-12 text-lg font-semibold shadow-lg"
              >
                <TrendingDown className="h-5 w-5 mr-2" />
                Registrar Despesa
              </Button>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

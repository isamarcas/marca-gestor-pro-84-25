
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, PieChart, Calculator } from "lucide-react";

export function RelatorioFinanceiro() {
  // Dados simulados - em um caso real, viriam de uma API
  const dadosFinanceiros = {
    receitaTotal: 125000,
    custosOperacionais: 45000,
    lucroLiquido: 80000,
    margemLucro: 64,
    taxasINPI: 25000,
    honorarios: 100000,
    roiMedio: 85
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="space-y-8">
      {/* Métricas Financeiras Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-green-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatarMoeda(dadosFinanceiros.receitaTotal)}
                </div>
                <p className="text-green-700 font-medium">Receita Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatarMoeda(dadosFinanceiros.lucroLiquido)}
                </div>
                <p className="text-blue-700 font-medium">Lucro Líquido</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {dadosFinanceiros.margemLucro}%
                </div>
                <p className="text-purple-700 font-medium">Margem de Lucro</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Calculator className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {dadosFinanceiros.roiMedio}%
                </div>
                <p className="text-orange-700 font-medium">ROI Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              Composição da Receita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Honorários Advocatícios</span>
                  <p className="text-sm text-gray-500">Serviços jurídicos especializados</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {formatarMoeda(dadosFinanceiros.honorarios)}
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {Math.round((dadosFinanceiros.honorarios / dadosFinanceiros.receitaTotal) * 100)}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Taxas INPI</span>
                  <p className="text-sm text-gray-500">Repasse de custos oficiais</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    {formatarMoeda(dadosFinanceiros.taxasINPI)}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {Math.round((dadosFinanceiros.taxasINPI / dadosFinanceiros.receitaTotal) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
              Análise de Custos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Custos Operacionais</span>
                  <p className="text-sm text-gray-500">Infraestrutura e pessoal</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">
                    {formatarMoeda(dadosFinanceiros.custosOperacionais)}
                  </div>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    {Math.round((dadosFinanceiros.custosOperacionais / dadosFinanceiros.receitaTotal) * 100)}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Eficiência Operacional</span>
                  <p className="text-sm text-gray-500">Custo por processo</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    85%
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Excelente
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projeções e Insights */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            Insights Financeiros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">Performance Positiva</h4>
              <p className="text-gray-600 text-sm mb-3">
                Margem de lucro acima da média do setor (64% vs 45%)
              </p>
              <Badge className="bg-green-100 text-green-800">+19% acima da média</Badge>
            </div>
            
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Oportunidade</h4>
              <p className="text-gray-600 text-sm mb-3">
                Potencial de crescimento através de novos serviços de PI
              </p>
              <Badge className="bg-blue-100 text-blue-800">Expansão recomendada</Badge>
            </div>
            
            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">Atenção</h4>
              <p className="text-gray-600 text-sm mb-3">
                Monitorar custos operacionais para manter margem
              </p>
              <Badge className="bg-orange-100 text-orange-800">Controle necessário</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

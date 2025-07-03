
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertTriangle, Eye } from "lucide-react";

export function RelatorioCompetitivo() {
  return (
    <div className="space-y-8">
      {/* Indicadores Competitivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-indigo-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">
                  47
                </div>
                <p className="text-indigo-700 font-medium">Concorrentes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  128
                </div>
                <p className="text-purple-700 font-medium">Marcas Monitoradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  12
                </div>
                <p className="text-orange-700 font-medium">Conflitos Potenciais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-teal-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">
                  85%
                </div>
                <p className="text-teal-700 font-medium">Posição de Mercado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Competitiva */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-indigo-50/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Target className="h-5 w-5 text-indigo-600" />
            </div>
            Inteligência Competitiva
            <Badge className="bg-purple-100 text-purple-800 ml-auto">Premium</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Vantagens Competitivas</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Taxa de aprovação 23% acima da média</li>
                  <li>• Tempo de processamento 40% menor</li>
                  <li>• Portfolio 3x mais diversificado</li>
                  <li>• Expertise em classes específicas</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">Oportunidades de Mercado</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Segmento tecnológico em crescimento</li>
                  <li>• Demanda por marcas internacionais</li>
                  <li>• Nichos especializados desatendidos</li>
                  <li>• Expansão para novos estados</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">Ameaças Identificadas</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Entrada de grandes escritórios</li>
                  <li>• Pressão competitiva em preços</li>
                  <li>• Automação de processos básicos</li>
                  <li>• Mudanças regulatórias do INPI</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">Alertas de Conflito</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• 3 marcas similares depositadas</li>
                  <li>• Concorrente ampliou portfolio</li>
                  <li>• Possível violação em análise</li>
                  <li>• Monitoramento de oposições</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benchmarking */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            Benchmarking Setorial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-green-600 mb-2">1º</div>
              <p className="font-medium text-gray-700">Posição Regional</p>
              <p className="text-sm text-gray-500">Taxa de aprovação</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-blue-600 mb-2">3º</div>
              <p className="font-medium text-gray-700">Volume de Processos</p>
              <p className="text-sm text-gray-500">Ranking estadual</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-purple-600 mb-2">2º</div>
              <p className="font-medium text-gray-700">Satisfação Cliente</p>
              <p className="text-sm text-gray-500">Pesquisa setorial</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

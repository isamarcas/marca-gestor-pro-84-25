
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, CheckCircle, AlertTriangle } from "lucide-react";

export function RelatorioCompliance() {
  return (
    <div className="space-y-8">
      {/* Indicadores de Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-green-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  98%
                </div>
                <p className="text-green-700 font-medium">Conformidade Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  245
                </div>
                <p className="text-blue-700 font-medium">Controles Ativos</p>
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
                  3
                </div>
                <p className="text-orange-700 font-medium">Não Conformidades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <FileText className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-600">
                  12
                </div>
                <p className="text-slate-700 font-medium">Auditorias Realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Áreas de Compliance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              Conformidade Regulatória
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">LGPD</span>
                  <p className="text-sm text-gray-500">Lei Geral de Proteção de Dados</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Conforme
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">OAB</span>
                  <p className="text-sm text-gray-500">Regulamentação advocatícia</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Conforme
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">INPI</span>
                  <p className="text-sm text-gray-500">Normas de propriedade intelectual</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Conforme
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              Controles Internos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Gestão de Documentos</span>
                  <p className="text-sm text-gray-500">Organização e backup</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Excelente
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Prazos Processuais</span>
                  <p className="text-sm text-gray-500">Monitoramento automático</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Ativo
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Segurança da Informação</span>
                  <p className="text-sm text-gray-500">Proteção de dados sensíveis</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  Revisar
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plano de Ação */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-slate-600" />
            </div>
            Plano de Ação e Melhorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-yellow-800">Ações Pendentes</h4>
                <Badge className="bg-yellow-100 text-yellow-800">3 itens</Badge>
              </div>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Atualização do manual de segurança da informação</li>
                <li>• Revisão trimestral dos controles de acesso</li>
                <li>• Treinamento da equipe em novas regulamentações</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-blue-800">Melhorias Implementadas</h4>
                <Badge className="bg-blue-100 text-blue-800">Último mês</Badge>
              </div>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Sistema de backup automatizado implementado</li>
                <li>• Processo de auditoria interna estruturado</li>
                <li>• Dashboard de compliance em tempo real</li>
                <li>• Política de retenção de documentos atualizada</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

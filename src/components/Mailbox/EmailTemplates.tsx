
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
}

const templates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Boas-vindas',
    subject: 'Bem-vindo(a) ao nosso sistema!',
    description: 'Template de boas-vindas para novos clientes',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Bem-vindo(a)!</h1>
        <p>Olá <strong>[NOME_CLIENTE]</strong>,</p>
        <p>É com grande prazer que damos as boas-vindas ao nosso sistema de gestão de marcas.</p>
        <p>Agora você pode acompanhar o andamento dos seus processos de marca de forma fácil e transparente.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>O que você pode fazer:</h3>
          <ul>
            <li>Acompanhar o status das suas marcas</li>
            <li>Visualizar prazos importantes</li>
            <li>Receber notificações automáticas</li>
            <li>Acessar documentos do processo</li>
          </ul>
        </div>
        <p>Se tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
        <p>Atenciosamente,<br><strong>Equipe de Suporte</strong></p>
      </div>
    `
  },
  {
    id: 'deadline_reminder',
    name: 'Lembrete de Prazo',
    subject: 'Prazo importante se aproximando - [NOME_MARCA]',
    description: 'Lembrete para prazos importantes',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #d97706; text-align: center;">⚠️ Prazo Importante</h1>
        <p>Olá <strong>[NOME_CLIENTE]</strong>,</p>
        <p>Este é um lembrete importante sobre um prazo que se aproxima para a sua marca <strong>[NOME_MARCA]</strong>.</p>
        <div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #92400e;">Detalhes do Prazo:</h3>
          <p><strong>Processo:</strong> [NUMERO_PROCESSO]</p>
          <p><strong>Prazo:</strong> [DATA_PRAZO]</p>
          <p><strong>Ação necessária:</strong> [ACAO_NECESSARIA]</p>
        </div>
        <p>Recomendamos que você tome as providências necessárias o quanto antes para evitar problemas com o seu processo.</p>
        <p>Se precisar de ajuda, nossa equipe está à disposição.</p>
        <p>Atenciosamente,<br><strong>Equipe Jurídica</strong></p>
      </div>
    `
  },
  {
    id: 'status_update',
    name: 'Atualização de Status',
    subject: 'Atualização no processo da marca [NOME_MARCA]',
    description: 'Notificação de mudança de status',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669; text-align: center;">📄 Atualização do Processo</h1>
        <p>Olá <strong>[NOME_CLIENTE]</strong>,</p>
        <p>Temos uma atualização importante sobre o processo da sua marca <strong>[NOME_MARCA]</strong>.</p>
        <div style="background: #d1fae5; border-left: 4px solid #059669; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #065f46;">Nova Atualização:</h3>
          <p><strong>Processo:</strong> [NUMERO_PROCESSO]</p>
          <p><strong>Status anterior:</strong> [STATUS_ANTERIOR]</p>
          <p><strong>Novo status:</strong> [NOVO_STATUS]</p>
          <p><strong>Data da atualização:</strong> [DATA_ATUALIZACAO]</p>
        </div>
        <p><strong>Descrição:</strong> [DESCRICAO_ATUALIZACAO]</p>
        <p>Você pode acompanhar todos os detalhes através do nosso portal do cliente.</p>
        <p>Atenciosamente,<br><strong>Equipe de Acompanhamento</strong></p>
      </div>
    `
  }
];

interface EmailTemplatesProps {
  onSelectTemplate: (template: EmailTemplate) => void;
}

export function EmailTemplates({ onSelectTemplate }: EmailTemplatesProps) {
  const { toast } = useToast();

  const handleUseTemplate = (template: EmailTemplate) => {
    console.log('Template selecionado:', template.name);
    onSelectTemplate(template);
    toast({
      title: "Template selecionado",
      description: `Template "${template.name}" carregado na composição de e-mail`
    });
  };

  const handleCopyTemplate = (template: EmailTemplate) => {
    navigator.clipboard.writeText(template.html);
    toast({
      title: "Template copiado",
      description: `Template "${template.name}" copiado para a área de transferência`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Templates de E-mail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Assunto:</strong> {template.subject}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1"
                >
                  Usar Template
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopyTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Variáveis disponíveis:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><code>[NOME_CLIENTE]</code> - Nome do cliente</p>
            <p><code>[NOME_MARCA]</code> - Nome da marca</p>
            <p><code>[NUMERO_PROCESSO]</code> - Número do processo</p>
            <p><code>[DATA_PRAZO]</code> - Data do prazo</p>
            <p><code>[STATUS_ANTERIOR]</code> - Status anterior</p>
            <p><code>[NOVO_STATUS]</code> - Novo status</p>
            <p><code>[ACAO_NECESSARIA]</code> - Ação necessária</p>
            <p><code>[DATA_ATUALIZACAO]</code> - Data da atualização</p>
            <p><code>[DESCRICAO_ATUALIZACAO]</code> - Descrição da atualização</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

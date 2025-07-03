import { PolicySection } from './PolicySection';

export function PolicyContent() {
  return (
    <div className="space-y-8">
      <PolicySection
        id="controlador"
        title="1. Controlador dos Dados"
        icon="🏢"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Esta Política de Privacidade descreve como o aplicativo ISA - Marcas & Patentes, 
              de titularidade do GRUPO ISA MARCAS & PATENTES, coleta, utiliza, armazena e protege 
              os dados pessoais dos usuários, em conformidade com a LGPD.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h5 className="font-medium text-blue-800 mb-3">📋 Informações da Empresa</h5>
              <div className="space-y-2 text-blue-700">
                <p><strong>Nome:</strong> GRUPO ISA MARCAS & PATENTES</p>
                <p><strong>CNPJ:</strong> 29.887.132/0001-69</p>
                <p><strong>E-mail:</strong> suporte@isamarcas.com.br</p>
                <p><strong>Endereço:</strong> Rua EF 15, Qd. 22, Lt. 08, Cs. 02, Residencial Eli Forte Extensão, CEP: 74371-076</p>
                <p><strong>Site:</strong> https://isamarcas.com.br</p>
              </div>
            </div>
          </div>
        }
      />

      <PolicySection
        id="coleta"
        title="2. Dados Coletados"
        icon="📊"
        content={
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Durante o uso do aplicativo, coletamos os seguintes dados:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">👤 Dados Fornecidos por Você</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Nome completo</li>
                    <li>• CPF/CNPJ</li>
                    <li>• E-mail</li>
                    <li>• Telefone</li>
                    <li>• Dados de marcas e patentes</li>
                    <li>• Documentos jurídicos para processos junto ao INPI</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">🔍 Dados Coletados Automaticamente</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Endereço IP</li>
                    <li>• Informações do dispositivo (modelo, sistema operacional, idioma)</li>
                    <li>• Dados de navegação para análise comportamental</li>
                    <li>• Cookies e analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <PolicySection
        id="finalidades"
        title="3. Finalidades do Tratamento de Dados"
        icon="⚙️"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Os dados coletados são utilizados para as seguintes finalidades:
            </p>
            <div className="grid gap-4">
              {[
                { icon: '🔐', title: 'Identificação e autenticação', desc: 'Autenticação do usuário no aplicativo' },
                { icon: '📋', title: 'Execução dos serviços', desc: 'Registro e acompanhamento de marcas e patentes junto ao INPI' },
                { icon: '📧', title: 'Comunicações relevantes', desc: 'Envio de notificações, lembretes de prazos e atualizações processuais' },
                { icon: '⚖️', title: 'Cumprimento legal', desc: 'Cumprimento de obrigações legais e regulatórias' },
                { icon: '🛡️', title: 'Segurança', desc: 'Segurança da informação e prevenção de fraudes' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-xl shadow-soft border border-gray-100">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <PolicySection
        id="compartilhamento"
        title="4. Compartilhamento de Dados"
        icon="🤝"
        content={
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h5 className="font-medium text-green-800 mb-2">✅ Política de Não Compartilhamento</h5>
              <p className="text-green-700 text-sm">
                O aplicativo não compartilha dados com terceiros para fins comerciais, publicitários ou promocionais. 
                O tratamento ocorre exclusivamente dentro da estrutura do GRUPO ISA MARCAS & PATENTES.
              </p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 font-medium">
                🔒 <strong>Proteção Total:</strong> Seus dados permanecem seguros e privados dentro da nossa infraestrutura.
              </p>
            </div>
          </div>
        }
      />

      <PolicySection
        id="terceiros"
        title="5. Uso de Tecnologias de Terceiros"
        icon="🔧"
        content={
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h5 className="font-medium text-red-800 mb-2">🚫 Não Utilizamos</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• SDKs de publicidade</li>
                  <li>• ID de publicidade</li>
                  <li>• Tracking para fins comerciais</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h5 className="font-medium text-green-800 mb-2">✅ Utilizamos Apenas</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Cookies essenciais</li>
                  <li>• Tecnologias de análise para estatísticas</li>
                  <li>• Ferramentas de melhoria da experiência</li>
                </ul>
              </div>
            </div>
          </div>
        }
      />

      <PolicySection
        id="seguranca"
        title="6. Armazenamento e Segurança"
        icon="🛡️"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Os dados são armazenados na infraestrutura do Supabase, em ambiente seguro:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'Criptografia', desc: 'Dados protegidos com criptografia avançada' },
                { icon: '🔐', title: 'Autenticação', desc: 'Controle rigoroso de acesso aos dados' },
                { icon: '💾', title: 'Backups Regulares', desc: 'Backups automáticos e seguros' },
                { icon: '🌐', title: 'Infraestrutura Supabase', desc: 'Ambiente confiável e certificado' },
                { icon: '🛡️', title: 'Monitoramento', desc: 'Vigilância contínua de segurança' },
                { icon: '✅', title: 'Conformidade', desc: 'Aderência às melhores práticas' },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h5 className="font-medium text-blue-800 mb-1">{item.title}</h5>
                  <p className="text-blue-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <PolicySection
        id="retencao"
        title="7. Prazos de Retenção"
        icon="⏰"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Os dados são mantidos pelos seguintes períodos, conforme a legislação brasileira:
            </p>
            <div className="space-y-3">
              {[
                { type: 'Dados cadastrais', periodo: 'Durante o vínculo + 5 anos', base: 'art. 27, CDC', color: 'blue' },
                { type: 'Dados de processos marcas/patentes', periodo: 'Até 10 anos após encerramento', base: 'art. 205, CC', color: 'green' },
                { type: 'Logs de acesso', periodo: 'Mínimo de 6 meses', base: 'art. 15, Marco Civil', color: 'purple' },
              ].map((item, index) => (
                <div key={index} className={`border-l-4 border-${item.color}-500 bg-${item.color}-50 p-4 rounded-r-lg`}>
                  <h5 className={`font-medium text-${item.color}-800 mb-1`}>📅 {item.type}</h5>
                  <p className={`text-${item.color}-700 text-sm mb-1`}><strong>Período:</strong> {item.periodo}</p>
                  <p className={`text-${item.color}-600 text-xs`}><strong>Base legal:</strong> {item.base}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ Após os prazos, os dados são eliminados de forma segura ou anonimizados, 
                salvo as exceções previstas no art. 16 da LGPD.
              </p>
            </div>
          </div>
        }
      />

      <PolicySection
        id="direitos"
        title="8. Direitos do Usuário"
        icon="👤"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Nos termos da LGPD, você tem os seguintes direitos sobre seus dados pessoais:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '✅', title: 'Confirmar existência', desc: 'Verificar se tratamos seus dados' },
                { icon: '👁️', title: 'Acessar dados', desc: 'Solicitar uma cópia dos seus dados' },
                { icon: '✏️', title: 'Corrigir dados', desc: 'Atualizar dados incompletos ou incorretos' },
                { icon: '🔒', title: 'Anonimização', desc: 'Solicitar anonimização dos dados' },
                { icon: '🗑️', title: 'Exclusão', desc: 'Solicitar bloqueio ou exclusão' },
                { icon: '🚫', title: 'Retirar consentimento', desc: 'Revogar autorização quando aplicável' },
              ].map((right, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-soft border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{right.icon}</span>
                    <h5 className="font-medium text-gray-800">{right.title}</h5>
                  </div>
                  <p className="text-gray-600 text-sm">{right.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h5 className="font-medium text-blue-800 mb-2">📞 Para exercer seus direitos:</h5>
              <div className="text-blue-700 text-sm space-y-1">
                <p><strong>E-mail:</strong> suporte@isamarcas.com.br</p>
                <p><strong>WhatsApp:</strong> (62) 98196-3738</p>
              </div>
            </div>
          </div>
        }
      />

      <PolicySection
        id="bases"
        title="9. Bases Legais"
        icon="⚖️"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              O tratamento de dados é realizado com base nas seguintes bases legais da LGPD:
            </p>
            <div className="grid gap-4">
              {[
                { icon: '✍️', title: 'Consentimento do titular', desc: 'Com sua autorização expressa para finalidades específicas' },
                { icon: '📋', title: 'Execução de contrato', desc: 'Para cumprir contratos ou procedimentos preliminares' },
                { icon: '⚖️', title: 'Cumprimento de obrigação legal', desc: 'Para atender exigências legais ou regulatórias' },
              ].map((base, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                  <div className="text-2xl">{base.icon}</div>
                  <div>
                    <h5 className="font-medium text-indigo-800 mb-1">{base.title}</h5>
                    <p className="text-indigo-700 text-sm">{base.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <PolicySection
        id="alteracoes"
        title="10. Alterações desta Política"
        icon="📝"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Esta Política poderá ser alterada a qualquer momento para refletir atualizações 
              legais ou operacionais. Recomendamos que você revise periodicamente o conteúdo desta página.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h5 className="font-medium text-orange-800 mb-2">🔔 Como você será notificado</h5>
              <p className="text-orange-700 text-sm">
                Quando houver alterações significativas, você será notificado através dos canais 
                de comunicação cadastrados em sua conta.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 font-medium">
                💡 <strong>Transferência Internacional:</strong> Atualmente, o app é destinado ao território brasileiro. 
                Caso haja expansão internacional, esta política será atualizada conforme as legislações aplicáveis (como GDPR).
              </p>
            </div>
          </div>
        }
      />

      <PolicySection
        id="contato"
        title="11. Contato"
        icon="📞"
        content={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato:
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">📧 E-mail</h5>
                  <p className="text-blue-700">suporte@isamarcas.com.br</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">📱 WhatsApp</h5>
                  <p className="text-blue-700">(62) 98196-3738</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">🌐 Site</h5>
                  <p className="text-blue-700">https://isamarcas.com.br</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">📍 Endereço</h5>
                  <p className="text-blue-700">Rua EF 15, Qd. 22, Lt. 08<br />Cs. 02, Residencial Eli Forte Extensão<br />CEP: 74371-076</p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
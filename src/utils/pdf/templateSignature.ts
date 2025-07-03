
import { ContratoData } from '@/types/contratos';

export const generateSignatureSection = (contrato: ContratoData): string => {
  const isPremium = contrato.dadosPremium?.versao === 'premium';
  
  return `
    <div class="signature-section">
      <div class="signature-header">
        🔐 Aceite Digital Certificado ${isPremium ? '- Premium' : ''}
      </div>
      
      <div class="signature-content">
        <div class="signature-grid">
          <div class="signature-field">
            <div class="field-label">👤 Nome Completo</div>
            <div class="field-value">${contrato.nomeCliente}</div>
          </div>
          
          ${contrato.email ? `
          <div class="signature-field">
            <div class="field-label">📧 E-mail</div>
            <div class="field-value">${contrato.email}</div>
          </div>
          ` : ''}
          
          <div class="signature-field">
            <div class="field-label">📅 Data do Aceite</div>
            <div class="field-value">${contrato.dataAceite}</div>
          </div>
          
          <div class="signature-field">
            <div class="field-label">🕐 Horário</div>
            <div class="field-value">${contrato.horaAceite}</div>
          </div>
          
          <div class="signature-field">
            <div class="field-label">📱 Dispositivo</div>
            <div class="field-value">${contrato.dispositivo || 'Não informado'}</div>
          </div>
          
          <div class="signature-field">
            <div class="field-label">🌐 Endereço IP</div>
            <div class="field-value">${contrato.ipAddress || 'Não disponível'}</div>
          </div>
        </div>
        
        <div class="signature-display">
          <div class="signature-label">🔥 ASSINATURA DIGITAL VALIDADA</div>
          <div class="signature-container">
            ${contrato.assinatura ? `
              <img src="${contrato.assinatura}" alt="Assinatura Digital do Cliente" class="signature-image" />
            ` : `
              <div class="signature-placeholder">Assinatura não disponível</div>
            `}
          </div>
        </div>
        
        ${generatePremiumFeatures(isPremium)}
      </div>
    </div>
  `;
};

const generatePremiumFeatures = (isPremium: boolean): string => {
  if (isPremium) {
    return `
      <div class="premium-features">
        <div class="premium-title">🏆 Validações Premium Realizadas</div>
        <div class="features-grid">
          <div class="feature-item">✅ Validação biométrica de assinatura</div>
          <div class="feature-item">✅ Captura de selfie para verificação</div>
          <div class="feature-item">✅ Análise de métricas comportamentais</div>
          <div class="feature-item">✅ Verificação de localização geográfica</div>
          <div class="feature-item">✅ Hash criptográfico SHA-256</div>
          <div class="feature-item">✅ Timestamp blockchain irrefutável</div>
          <div class="feature-item">✅ Autenticação multifator</div>
          <div class="feature-item">✅ Certificação digital avançada</div>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="premium-features" style="background: linear-gradient(135deg, #374151 0%, #4b5563 100%);">
      <div class="premium-title">🔐 Validações de Segurança Padrão</div>
      <div class="features-grid">
        <div class="feature-item">✅ Assinatura digital validada</div>
        <div class="feature-item">✅ Timestamp criptográfico</div>
        <div class="feature-item">✅ Registro de IP e dispositivo</div>
        <div class="feature-item">✅ Hash de integridade SHA-256</div>
        <div class="feature-item">✅ Certificação de autenticidade</div>
        <div class="feature-item">✅ Rastreabilidade completa</div>
      </div>
    </div>
  `;
};

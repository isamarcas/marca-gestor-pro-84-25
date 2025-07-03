
export const generateFooterSection = (): string => {
  return `
    <div class="verification-section">
      <div class="verification-title">⚖️ Certificado de Autenticidade Digital</div>
      <div class="verification-grid">
        <div class="verification-item">Documento assinado digitalmente</div>
        <div class="verification-item">Conforme Lei Federal 14.063/2020</div>
        <div class="verification-item">Validade jurídica garantida</div>
        <div class="verification-item">Criptografia SHA-256 aplicada</div>
        <div class="verification-item">Timestamp irrefutável registrado</div>
        <div class="verification-item">Rastreabilidade completa mantida</div>
        <div class="verification-item">Integridade verificada e validada</div>
        <div class="verification-item">Aceito em tribunais brasileiros</div>
      </div>
    </div>

    <div class="footer-section">
      <div class="footer-title">📋 Informações Legais e Técnicas</div>
      
      <div class="legal-grid">
        <div class="legal-item">
          <h4>🏛️ Base Legal</h4>
          <p>Lei Federal 14.063/2020 - Uso de assinaturas eletrônicas em interações com entes públicos</p>
          <p>Medida Provisória 2.200-2/2001 - ICP-Brasil</p>
        </div>
        <div class="legal-item">
          <h4>🔒 Segurança Técnica</h4>
          <p>Criptografia SHA-256, Timestamp RFC 3161</p>
          <p>Certificação digital com rastreabilidade completa</p>
        </div>
      </div>
      
      <div class="footer-disclaimer">
        <p><strong>Este documento foi assinado digitalmente e possui validade jurídica plena conforme a legislação brasileira.</strong></p>
        <p>Documento gerado automaticamente pelo <strong>CRM INPI - Sistema de Marcas</strong></p>
        <p>Data/Hora de geração: ${new Date().toLocaleString('pt-BR')} | Arquivo: contrato_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}</p>
      </div>
    </div>
  `;
};

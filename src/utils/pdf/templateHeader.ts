
import { ContratoData } from '@/types/contratos';

export const generateHeaderSection = (contrato: ContratoData): string => {
  return `
    <div class="document-id">
      ID: ${contrato.id} | ${new Date().toLocaleString('pt-BR')}
    </div>
    
    <div class="header-section">
      <div class="header-content">
        <h1 class="company-title">CRM INPI - Sistema de Marcas</h1>
        <h2 class="contract-title">Contrato de Prestação de Serviços</h2>
        <div class="contact-info">
          <span>📧 contato@crminpi.com.br</span>
          <span>📞 (11) 99999-9999</span>
          <span>🔒 Documento Certificado Digitalmente</span>
        </div>
      </div>
    </div>

    <div class="parties-section">
      <h3 class="section-title">Partes Contratantes</h3>
      <div class="party-grid">
        <div class="party-item">
          <div class="party-label">Contratante</div>
          <div class="party-name">${contrato.nomeCliente}</div>
        </div>
        <div class="party-item">
          <div class="party-label">Contratada</div>
          <div class="party-name">CRM INPI - Sistema de Marcas</div>
        </div>
      </div>
    </div>
  `;
};

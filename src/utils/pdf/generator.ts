
import { ContratoData } from '@/types/contratos';
import { pdfStyles } from './styles';
import { generateHeaderSection } from './templateHeader';
import { generateSignatureSection } from './templateSignature';
import { generateFooterSection } from './templateFooter';

export const gerarPDFContrato = (contrato: ContratoData): string => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Contrato Digital - ${contrato.nomeCliente}</title>
      <style>${pdfStyles}</style>
    </head>
    <body>
      <div class="document-container">
        ${generateHeaderSection(contrato)}

        <div class="contract-content">
          ${contrato.contratoTexto.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
        </div>

        ${generateSignatureSection(contrato)}
        ${generateFooterSection()}
      </div>
    </body>
    </html>
  `;

  return htmlContent;
};

export const downloadPDF = (htmlContent: string, filename: string) => {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

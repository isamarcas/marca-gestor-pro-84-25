
export const pdfStyles = `
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
  }

  .document-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .document-id {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    font-size: 12px;
    text-align: right;
    font-weight: 500;
  }

  .header-section {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    padding: 40px;
    text-align: center;
  }

  .company-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .contract-title {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 20px;
    opacity: 0.9;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 14px;
    flex-wrap: wrap;
  }

  .contact-info span {
    background: rgba(255,255,255,0.1);
    padding: 6px 12px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .parties-section {
    padding: 30px 40px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-title {
    color: #1e293b;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    text-align: center;
  }

  .party-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  .party-item {
    text-align: center;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .party-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #64748b;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .party-name {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }

  .contract-content {
    padding: 40px;
    font-size: 14px;
    line-height: 1.8;
    color: #374151;
    text-align: justify;
  }

  .contract-content p {
    margin-bottom: 16px;
  }

  .signature-section {
    margin-top: 40px;
    padding: 30px 40px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-top: 3px solid #3b82f6;
  }

  .signature-header {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 30px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .signature-content {
    display: grid;
    gap: 30px;
  }

  .signature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 30px;
  }

  .signature-field {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border-left: 4px solid #3b82f6;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .field-value {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
  }

  .signature-display {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
    border: 2px solid #3b82f6;
  }

  .signature-label {
    font-size: 16px;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .signature-container {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    padding: 20px;
  }

  .signature-image {
    max-width: 100%;
    max-height: 100px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background: white;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .signature-placeholder {
    color: #94a3b8;
    font-style: italic;
    font-size: 14px;
  }

  .premium-features {
    background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
    color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }

  .premium-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .feature-item {
    background: rgba(255,255,255,0.1);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    backdrop-filter: blur(10px);
  }

  .verification-section {
    margin-top: 40px;
    padding: 30px 40px;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: white;
  }

  .verification-title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .verification-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .verification-item {
    background: rgba(255,255,255,0.1);
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 13px;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .footer-section {
    background: #1f2937;
    color: #d1d5db;
    padding: 40px;
  }

  .footer-title {
    color: #f9fafb;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  .legal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .legal-item {
    background: #374151;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #10b981;
  }

  .legal-item h4 {
    color: #f9fafb;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .legal-item p {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .footer-disclaimer {
    text-align: center;
    padding: 20px;
    background: #111827;
    border-radius: 8px;
    border: 1px solid #374151;
  }

  .footer-disclaimer p {
    margin-bottom: 8px;
    font-size: 12px;
  }

  .footer-disclaimer strong {
    color: #10b981;
  }

  @media (max-width: 768px) {
    body {
      padding: 10px;
    }

    .header-section {
      padding: 30px 20px;
    }

    .company-title {
      font-size: 24px;
    }

    .contract-title {
      font-size: 18px;
    }

    .contact-info {
      flex-direction: column;
      gap: 10px;
    }

    .parties-section {
      padding: 20px;
    }

    .party-grid {
      grid-template-columns: 1fr;
    }

    .contract-content {
      padding: 20px;
    }

    .signature-section {
      padding: 20px;
    }

    .signature-grid {
      grid-template-columns: 1fr;
    }

    .verification-section {
      padding: 20px;
    }

    .footer-section {
      padding: 20px;
    }

    .legal-grid {
      grid-template-columns: 1fr;
    }
  }

  @media print {
    body {
      background: white;
      padding: 0;
    }

    .document-container {
      box-shadow: none;
      border-radius: 0;
    }

    .signature-section {
      page-break-inside: avoid;
    }

    .verification-section {
      page-break-inside: avoid;
    }
  }
`;

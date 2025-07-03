
import React from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
}

interface TemplateIndicatorProps {
  selectedTemplate?: EmailTemplate | null;
  isTemplateModified: boolean;
}

export function TemplateIndicator({ selectedTemplate, isTemplateModified }: TemplateIndicatorProps) {
  if (!selectedTemplate && !isTemplateModified) {
    return null;
  }

  return (
    <>
      {selectedTemplate && (
        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
          Template: {selectedTemplate.name}
        </span>
      )}
      {isTemplateModified && (
        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
          Mensagem modificada
        </span>
      )}
    </>
  );
}

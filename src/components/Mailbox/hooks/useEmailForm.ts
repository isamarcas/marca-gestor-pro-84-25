
import { useState, useEffect } from 'react';
import { EmailData } from '@/utils/email/types';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  description: string;
}

export function useEmailForm(selectedTemplate?: EmailTemplate | null) {
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    html: '',
    text: ''
  });
  
  const [isTemplateModified, setIsTemplateModified] = useState(false);
  const [originalTemplateContent, setOriginalTemplateContent] = useState('');

  useEffect(() => {
    if (selectedTemplate) {
      setEmailData(prev => ({
        ...prev,
        subject: selectedTemplate.subject,
        html: selectedTemplate.html,
        text: selectedTemplate.html
      }));
      
      setOriginalTemplateContent(selectedTemplate.html);
      setIsTemplateModified(false);
    }
  }, [selectedTemplate]);

  const handleMessageChange = (value: string) => {
    setEmailData(prev => ({ ...prev, html: value, text: value }));
    
    if (originalTemplateContent && value !== originalTemplateContent) {
      setIsTemplateModified(true);
    } else if (value === originalTemplateContent) {
      setIsTemplateModified(false);
    }
  };

  const resetForm = () => {
    setEmailData({
      to: '',
      subject: '',
      html: '',
      text: ''
    });
    setIsTemplateModified(false);
    setOriginalTemplateContent('');
  };

  return {
    emailData,
    setEmailData,
    isTemplateModified,
    handleMessageChange,
    resetForm
  };
}


import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const sections = [
  { id: 'controlador', title: 'Controlador dos Dados', icon: '🏢' },
  { id: 'coleta', title: 'Dados Coletados', icon: '📊' },
  { id: 'finalidades', title: 'Finalidades do Tratamento', icon: '⚙️' },
  { id: 'compartilhamento', title: 'Compartilhamento', icon: '🤝' },
  { id: 'terceiros', title: 'Tecnologias de Terceiros', icon: '🔧' },
  { id: 'seguranca', title: 'Armazenamento e Segurança', icon: '🛡️' },
  { id: 'retencao', title: 'Prazos de Retenção', icon: '⏰' },
  { id: 'direitos', title: 'Direitos do Usuário', icon: '👤' },
  { id: 'bases', title: 'Bases Legais', icon: '⚖️' },
  { id: 'alteracoes', title: 'Alterações da Política', icon: '📝' },
  { id: 'contato', title: 'Contato', icon: '📞' },
];

export function PolicyNavigation() {
  const [activeSection, setActiveSection] = useState('controlador');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-elegant border border-white/20">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Navegação</h3>
        
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="font-medium flex-1">{section.title}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
              }`} />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

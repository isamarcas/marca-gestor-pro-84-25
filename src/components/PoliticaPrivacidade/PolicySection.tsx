
import { ReactNode } from 'react';

interface PolicySectionProps {
  id: string;
  title: string;
  icon: string;
  content: ReactNode;
}

export function PolicySection({ id, title, icon, content }: PolicySectionProps) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-elegant border border-white/20 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <span className="text-2xl">{icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        
        <div className="prose prose-gray max-w-none">
          {content}
        </div>
      </div>
    </section>
  );
}

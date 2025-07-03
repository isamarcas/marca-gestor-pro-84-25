
import { PolicyHeader } from '@/components/PoliticaPrivacidade/PolicyHeader';
import { PolicyContent } from '@/components/PoliticaPrivacidade/PolicyContent';
import { PolicyNavigation } from '@/components/PoliticaPrivacidade/PolicyNavigation';
import { PolicyFooter } from '@/components/PoliticaPrivacidade/PolicyFooter';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.15)_1px,_transparent_0)] bg-[length:24px_24px] opacity-30"></div>
      
      <div className="relative z-10">
        <PolicyHeader />
        
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <PolicyNavigation />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PolicyContent />
            </div>
          </div>
        </div>
        
        <PolicyFooter />
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;

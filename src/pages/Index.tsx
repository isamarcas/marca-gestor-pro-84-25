
import { IndexHeader } from '@/components/Index/IndexHeader';
import { StatsSection } from '@/components/Index/StatsSection';
import { QuickActionsGrid } from '@/components/Index/QuickActionsGrid';
import { FeaturesHighlight } from '@/components/Index/FeaturesHighlight';
import { CallToAction } from '@/components/Index/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.15)_1px,_transparent_0)] bg-[length:24px_24px] opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <IndexHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 space-y-16 sm:space-y-20">
          <StatsSection />
          <QuickActionsGrid />
          <FeaturesHighlight />
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default Index;

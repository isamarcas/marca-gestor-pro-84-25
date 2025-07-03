
import React, { useState } from "react";
import { RelatoriosHero } from "@/components/Relatorios/RelatoriosHero";
import { RelatoriosNavigation } from "@/components/Relatorios/RelatoriosNavigation";
import { RelatoriosContent } from "@/components/Relatorios/RelatoriosContent";

export default function Relatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState('overview');

  const handleReportSelect = (reportId: string) => {
    setTipoRelatorio(reportId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <RelatoriosHero />

        {/* Navigation & Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="xl:col-span-1">
            <RelatoriosNavigation 
              selectedReport={tipoRelatorio}
              onReportSelect={handleReportSelect}
            />
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <RelatoriosContent 
              tipoRelatorio={tipoRelatorio}
              onTipoRelatorioChange={setTipoRelatorio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

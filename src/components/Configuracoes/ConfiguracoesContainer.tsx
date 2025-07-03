
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ConfiguracoesHeader } from './ConfiguracoesHeader';
import { ConfiguracoesSidebar } from './ConfiguracoesSidebar';
import { ConfiguracoesContent } from './ConfiguracoesContent';
import { configTabs } from './tabsConfig';

export function ConfiguracoesContainer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('perfil');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentTab = configTabs.find(tab => tab.id === activeTab);

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      toast({
        title: "✅ Configurações Salvas",
        description: "Todas as alterações foram aplicadas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao Salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentTab) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <ConfiguracoesHeader
        userName={user?.nome}
        hasUnsavedChanges={hasUnsavedChanges}
        isLoading={isLoading}
        onSaveAll={handleSaveAll}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1">
            <ConfiguracoesSidebar
              tabs={configTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <ConfiguracoesContent
              currentTab={currentTab}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

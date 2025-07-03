
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Loader2 } from 'lucide-react';

interface ConfiguracoesHeaderProps {
  userName?: string;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  onSaveAll: () => void;
}

export function ConfiguracoesHeader({ 
  userName, 
  hasUnsavedChanges, 
  isLoading, 
  onSaveAll 
}: ConfiguracoesHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              ⚙️ Configurações
            </h1>
            <p className="text-slate-600">
              Olá, {userName || 'Usuário'}! Gerencie suas preferências do sistema
            </p>
          </div>
          
          {hasUnsavedChanges && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-amber-700 font-medium">
                    Alterações não salvas
                  </span>
                  <Button
                    onClick={onSaveAll}
                    disabled={isLoading}
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Salvar Tudo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

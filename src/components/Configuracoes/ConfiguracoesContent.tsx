
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ConfigTab } from './types';

interface ConfiguracoesContentProps {
  currentTab: ConfigTab;
  activeTab: string;
}

export function ConfiguracoesContent({ currentTab, activeTab }: ConfiguracoesContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header da Seção */}
        <Card className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${currentTab.color} shadow-2xl`}>
                <currentTab.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  {currentTab.title}
                </h2>
                <p className="text-slate-600 font-medium">
                  {currentTab.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componente da Seção */}
        <currentTab.component />
      </motion.div>
    </AnimatePresence>
  );
}

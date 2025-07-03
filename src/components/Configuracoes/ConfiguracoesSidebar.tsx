
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { ConfigTab } from './types';

interface ConfiguracoesSidebarProps {
  tabs: ConfigTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ConfiguracoesSidebar({ tabs, activeTab, onTabChange }: ConfiguracoesSidebarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-8 space-y-3"
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                isActive 
                  ? `${tab.gradient} border-2 border-blue-200 shadow-xl` 
                  : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-slate-200/60'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive 
                      ? `bg-gradient-to-br ${tab.color} text-white shadow-lg` 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-sm ${isActive ? 'text-slate-600' : 'text-slate-500'} truncate`}>
                      {tab.description}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

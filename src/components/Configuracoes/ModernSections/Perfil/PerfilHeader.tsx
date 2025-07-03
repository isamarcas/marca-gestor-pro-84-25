
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit3, Camera, X, Star } from 'lucide-react';
import { FormData } from './perfilTypes';

interface PerfilHeaderProps {
  formData: FormData;
  isEditing: boolean;
  onEditToggle: () => void;
  userRole?: string;
}

export function PerfilHeader({ 
  formData, 
  isEditing, 
  onEditToggle, 
  userRole 
}: PerfilHeaderProps) {
  const iniciais = formData.nome
    .split(' ')
    .map(nome => nome.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'US';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl border border-blue-200/60 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <Avatar className="w-24 h-24 ring-4 ring-blue-200 ring-offset-4 ring-offset-white shadow-2xl">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-black">
                    {iniciais}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {formData.nome || 'Nome do Usuário'}
                  </h3>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <p className="text-slate-600 font-medium">{formData.email}</p>
                <p className="text-sm text-slate-500">{userRole || 'Usuário'}</p>
              </div>
            </div>

            <Button
              onClick={onEditToggle}
              variant={isEditing ? "destructive" : "default"}
              className={isEditing ? "" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Editar Perfil
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}


import { Shield, Heart, Award } from 'lucide-react';

export function PolicyFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">Comprometidos com sua Privacidade</h3>
        <p className="text-blue-200 mb-8 leading-relaxed">
          Nossa missão é proteger seus dados com os mais altos padrões de segurança e transparência. 
          Sua confiança é fundamental para nós.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm">Feito com cuidado</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Certificado ISO 27001</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm">LGPD Compliance</span>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <p className="text-blue-200 text-sm">
            © 2025 GRUPO ISA MARCAS & PATENTES. Todos os direitos reservados. | 
            <span className="ml-1">CNPJ: 29.887.132/0001-69</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

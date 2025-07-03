
import { Shield, Calendar, FileText } from 'lucide-react';

export function PolicyHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Política de Privacidade
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light leading-relaxed">
            ISA - Marcas & Patentes. Transparência total sobre como tratamos seus dados.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>Última atualização: Janeiro 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <FileText className="w-4 h-4" />
              <span>LGPD Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

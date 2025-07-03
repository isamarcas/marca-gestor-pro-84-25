
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Smartphone,
  Mail,
  Clock,
  Zap
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function SegurancaSection() {
  const { toast } = useToast();
  
  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    atual: false,
    nova: false,
    confirmar: false
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionsAtivas, setSessionsAtivas] = useState([
    {
      id: 1,
      device: 'Chrome - Windows',
      location: 'São Paulo, BR',
      lastActive: '2 minutos atrás',
      current: true
    },
    {
      id: 2,
      device: 'Safari - iPhone',
      location: 'São Paulo, BR',
      lastActive: '1 hora atrás',
      current: false
    }
  ]);

  // Validação de força da senha
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;
    
    return {
      score,
      checks,
      strength: score < 2 ? 'Fraca' : score < 4 ? 'Média' : 'Forte',
      color: score < 2 ? 'text-red-600' : score < 4 ? 'text-yellow-600' : 'text-green-600',
      bgColor: score < 2 ? 'bg-red-100' : score < 4 ? 'bg-yellow-100' : 'bg-green-100',
      progress: (score / 5) * 100
    };
  };

  const passwordStrength = getPasswordStrength(senhas.novaSenha);

  const handleAlterarSenha = () => {
    // Validações
    if (!senhas.senhaAtual) {
      toast({
        title: "❌ Erro",
        description: "Senha atual é obrigatória",
        variant: "destructive"
      });
      return;
    }

    if (!senhas.novaSenha) {
      toast({
        title: "❌ Erro",
        description: "Nova senha é obrigatória",
        variant: "destructive"
      });
      return;
    }

    if (senhas.novaSenha !== senhas.confirmarSenha) {
      toast({
        title: "❌ Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (passwordStrength.score < 3) {
      toast({
        title: "❌ Senha Fraca",
        description: "Use uma senha mais forte para maior segurança",
        variant: "destructive"
      });
      return;
    }

    // Sucesso
    setSenhas({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    toast({
      title: "🔒 Senha Alterada",
      description: "Sua senha foi atualizada com sucesso!",
    });
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const encerrarSessao = (sessionId: number) => {
    setSessionsAtivas(prev => prev.filter(s => s.id !== sessionId));
    toast({
      title: "🚪 Sessão Encerrada",
      description: "Sessão foi encerrada com sucesso",
    });
  };

  return (
    <div className="space-y-6">
      {/* Cards de Status de Segurança */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nível de Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">Forte</p>
                  <p className="text-sm text-slate-600 font-medium">Nível de Segurança</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 2FA Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`${twoFactorEnabled 
            ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' 
            : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'
          } shadow-xl`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  twoFactorEnabled 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                }`}>
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {twoFactorEnabled ? 'Ativo' : 'Inativo'}
                  </p>
                  <p className="text-sm text-slate-600 font-medium">Autenticação 2FA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sessões Ativas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{sessionsAtivas.length}</p>
                  <p className="text-sm text-slate-600 font-medium">Sessões Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alteração de Senha */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-red-600" />
              Alterar Senha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Senha Atual */}
            <div className="space-y-2">
              <Label htmlFor="senha-atual" className="text-sm font-semibold text-slate-700">
                Senha Atual
              </Label>
              <div className="relative">
                <Input
                  id="senha-atual"
                  type={showPasswords.atual ? 'text' : 'password'}
                  value={senhas.senhaAtual}
                  onChange={(e) => setSenhas(prev => ({ ...prev, senhaAtual: e.target.value }))}
                  className="pr-12 border-slate-300 focus:border-red-500"
                  placeholder="Digite sua senha atual"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('atual')}
                >
                  {showPasswords.atual ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
            </div>

            {/* Nova Senha */}
            <div className="space-y-2">
              <Label htmlFor="nova-senha" className="text-sm font-semibold text-slate-700">
                Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="nova-senha"
                  type={showPasswords.nova ? 'text' : 'password'}
                  value={senhas.novaSenha}
                  onChange={(e) => setSenhas(prev => ({ ...prev, novaSenha: e.target.value }))}
                  className="pr-12 border-slate-300 focus:border-red-500"
                  placeholder="Digite sua nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('nova')}
                >
                  {showPasswords.nova ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>

              {/* Medidor de Força da Senha */}
              {senhas.novaSenha && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 mt-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Força da senha:</span>
                    <Badge className={`${passwordStrength.bgColor} ${passwordStrength.color} border-0`}>
                      {passwordStrength.strength}
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={passwordStrength.progress} 
                    className="h-2"
                  />

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(passwordStrength.checks).map(([key, valid]) => (
                      <div key={key} className={`flex items-center gap-1 ${valid ? 'text-green-600' : 'text-slate-400'}`}>
                        {valid ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        <span>
                          {key === 'length' && '8+ caracteres'}
                          {key === 'lowercase' && 'Minúsculas'}
                          {key === 'uppercase' && 'Maiúsculas'}
                          {key === 'numbers' && 'Números'}
                          {key === 'special' && 'Especiais'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmar-senha" className="text-sm font-semibold text-slate-700">
                Confirmar Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmar-senha"
                  type={showPasswords.confirmar ? 'text' : 'password'}
                  value={senhas.confirmarSenha}
                  onChange={(e) => setSenhas(prev => ({ ...prev, confirmarSenha: e.target.value }))}
                  className="pr-12 border-slate-300 focus:border-red-500"
                  placeholder="Confirme sua nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirmar')}
                >
                  {showPasswords.confirmar ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>

              {/* Indicador de Correspondência */}
              {senhas.confirmarSenha && (
                <div className={`flex items-center gap-2 text-sm ${
                  senhas.novaSenha === senhas.confirmarSenha 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {senhas.novaSenha === senhas.confirmarSenha ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {senhas.novaSenha === senhas.confirmarSenha 
                    ? 'Senhas coincidem' 
                    : 'Senhas não coincidem'
                  }
                </div>
              )}
            </div>

            <Button
              onClick={handleAlterarSenha}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Autenticação em Dois Fatores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-blue-600" />
              Autenticação em Dois Fatores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  twoFactorEnabled 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                }`}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {twoFactorEnabled ? 'Proteção Ativada' : 'Proteção Adicional'}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {twoFactorEnabled 
                      ? 'Sua conta está protegida com 2FA' 
                      : 'Adicione uma camada extra de segurança'
                    }
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  toast({
                    title: twoFactorEnabled ? "🔓 2FA Desativado" : "🔒 2FA Ativado",
                    description: twoFactorEnabled 
                      ? "Autenticação em dois fatores foi desativada" 
                      : "Autenticação em dois fatores foi ativada",
                  });
                }}
                className={`${twoFactorEnabled 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                } text-white`}
              >
                {twoFactorEnabled ? 'Desativar' : 'Ativar'} 2FA
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sessões Ativas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-purple-600" />
              Sessões Ativas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessionsAtivas.map((session) => (
              <div 
                key={session.id}
                className={`p-4 rounded-xl border ${
                  session.current 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      session.current 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-400 text-white'
                    }`}>
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">
                          {session.device}
                        </h4>
                        {session.current && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Atual
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      onClick={() => encerrarSessao(session.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Encerrar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

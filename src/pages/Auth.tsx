
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { ShieldCheck, LogIn, UserPlus, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { CadastroClienteStepForm } from '@/components/Auth/CadastroClienteStepForm';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validação de entrada em tempo real
  const validateInput = (value: string, type: 'email' | 'password'): boolean => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) && value.length <= 254;
    }
    if (type === 'password') {
      return value.length >= 6 && value.length <= 128;
    }
    return false;
  };

  // Sanitizar entrada
  const sanitizeInput = (input: string): string => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '');
  };

  const handleInputChange = (value: string, type: 'email' | 'password') => {
    const sanitized = sanitizeInput(value);
    
    if (type === 'email') {
      setEmail(sanitized);
    } else {
      setPassword(sanitized);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações de entrada
    if (!validateInput(email, 'email')) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    if (!validateInput(password, 'password')) {
      toast({
        title: "Senha inválida",
        description: "A senha deve ter entre 6 e 128 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema!",
        });

        // Limpar dados do formulário
        setEmail('');
        setPassword('');
        
        navigate(result.redirectTo || '/');
      } else {
        toast({
          title: "Erro no login",
          description: result.message || "Credenciais inválidas.",
          variant: "destructive",
        });
        
        // Limpar senha por segurança
        setPassword('');
      }
    } catch (error: any) {
      toast({
        title: "Erro na autenticação",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
      
      // Limpar dados sensíveis
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-slate-200/30 to-slate-300/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-slate-300/30 to-slate-400/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand Section */}
        <div className="text-center mb-6 sm:mb-8 animate-scale-in">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg border border-white/20">
            <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Isa Marcas
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Sparkles className="h-3 w-3 text-slate-500" />
              <p className="text-xs font-medium">Sistema Seguro de Gestão</p>
              <Sparkles className="h-3 w-3 text-slate-500" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm h-auto">
            <TabsTrigger 
              value="login" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
              Entrar
            </TabsTrigger>
            <TabsTrigger 
              value="cadastro" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
              Cadastrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="animate-scale-in">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm border border-white/40">
              <CardHeader className="text-center pb-3 sm:pb-4 space-y-2 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Acesso Seguro
                </CardTitle>
                <CardDescription className="text-slate-600 text-xs sm:text-sm">
                  Entre com suas credenciais verificadas
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <Mail className="h-3 w-3 text-slate-600" />
                      Email
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => handleInputChange(e.target.value, 'email')}
                        className="h-9 sm:h-10 pl-3 pr-3 bg-white/95 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 rounded-lg transition-all duration-200 text-xs sm:text-sm placeholder:text-slate-400"
                        required
                        autoComplete="email"
                        maxLength={254}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <Lock className="h-3 w-3 text-slate-600" />
                      Senha
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => handleInputChange(e.target.value, 'password')}
                        className="h-9 sm:h-10 pl-3 pr-10 bg-white/95 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 rounded-lg transition-all duration-200 text-xs sm:text-sm placeholder:text-slate-400"
                        required
                        autoComplete="current-password"
                        maxLength={128}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-2 px-4 sm:px-6 pb-4 sm:pb-6">
                  {/* Login Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-9 sm:h-10 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold transition-all duration-200 rounded-lg shadow-sm hover:shadow-md text-xs sm:text-sm" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm">Verificando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Entrar</span>
                      </div>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="bg-slate-50 rounded-lg p-2 sm:p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 text-center space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="font-semibold text-slate-800 text-xs">Sistema Protegido</p>
                      </div>
                      <p className="text-slate-600 text-xs">
                        Conexão criptografada e autenticação segura
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="cadastro" className="animate-scale-in">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm border border-white/40">
              <CardHeader className="text-center pb-3 sm:pb-4 space-y-2 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Criar Conta Segura
                </CardTitle>
                <CardDescription className="text-slate-600 text-xs sm:text-sm">
                  Cadastre-se com proteção avançada
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <CadastroClienteStepForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

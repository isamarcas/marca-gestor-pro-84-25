
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function UsuarioConectadoCard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Usuário Conectado</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg border">
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">{user?.nome || 'Usuário'}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-blue-600 font-medium capitalize">
              Role: {user?.role || 'N/A'}
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

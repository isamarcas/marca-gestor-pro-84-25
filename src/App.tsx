
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { AppRoutes } from '@/components/Routes/AppRoutes';
import { AppLoading } from '@/components/Loading/AppLoading';
import { useAuth } from '@/hooks/useAuth';

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

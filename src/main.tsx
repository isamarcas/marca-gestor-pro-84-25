
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/hooks/useAuth'
import App from './App.tsx'
import './index.css'

// Add error boundary for better debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial; color: red;"><h1>Erro: Elemento root não found</h1><p>Verifique se o index.html está correto.</p></div>';
} else {
  console.log('✅ Root element found, starting React app...');
  
  try {
    createRoot(rootElement).render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    console.log('✅ React app initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing React app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; font-family: Arial; color: red;"><h1>Erro na inicialização</h1><p>Verifique o console para mais detalhes.</p></div>';
  }
}

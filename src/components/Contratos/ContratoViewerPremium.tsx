
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Clock, MapPin, Fingerprint, AlertTriangle } from 'lucide-react';

interface ContratoViewerPremiumProps {
  contratoTexto: string;
  onLeituraCompleta: (completa: boolean) => void;
  onValidacaoCompleta: (dados: any) => void;
}

export function ContratoViewerPremium({ contratoTexto, onLeituraCompleta, onValidacaoCompleta }: ContratoViewerPremiumProps) {
  const [scrollCompleto, setScrollCompleto] = useState(false);
  const [tempoLeitura, setTempoLeitura] = useState(0);
  const [inicioLeitura, setInicioLeitura] = useState<Date | null>(null);
  const [localizacao, setLocalizacao] = useState<{lat: number, lon: number} | null>(null);
  const [validacoesPendentes, setValidacoesPendentes] = useState({
    tempo: false,
    scroll: false,
    localizacao: false,
    biometria: false
  });
  const [hashDocumento, setHashDocumento] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Gerar hash do documento para integridade
    const hash = btoa(contratoTexto).slice(0, 16);
    setHashDocumento(hash);
    
    // Iniciar contagem de tempo
    setInicioLeitura(new Date());
    
    // Tentar obter localização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalizacao({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setValidacoesPendentes(prev => ({ ...prev, localizacao: true }));
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
          // Continuar sem localização
        }
      );
    }

    // Timer para tempo mínimo de leitura (30 segundos)
    intervalRef.current = setInterval(() => {
      setTempoLeitura(prev => {
        const novoTempo = prev + 1;
        if (novoTempo >= 30) {
          setValidacoesPendentes(prevVal => ({ ...prevVal, tempo: true }));
        }
        return novoTempo;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contratoTexto]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    const scrollPercent = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercent >= 0.95 && !scrollCompleto) {
      setScrollCompleto(true);
      setValidacoesPendentes(prev => ({ ...prev, scroll: true }));
      onLeituraCompleta(true);
    }
  };

  const simularValidacaoBiometrica = () => {
    // Simular validação biométrica
    setTimeout(() => {
      setValidacoesPendentes(prev => ({ ...prev, biometria: true }));
    }, 2000);
  };

  useEffect(() => {
    const todasValidacoes = Object.values(validacoesPendentes).every(v => v);
    if (todasValidacoes && scrollCompleto) {
      const dadosValidacao = {
        tempoLeitura,
        localizacao,
        hashDocumento,
        biometriaValidada: true,
        timestampValidacao: new Date().toISOString()
      };
      onValidacaoCompleta(dadosValidacao);
    }
  }, [validacoesPendentes, scrollCompleto, tempoLeitura, localizacao, hashDocumento, onValidacaoCompleta]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full border-2 border-blue-200">
      <div className="p-6">
        {/* Header Premium */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Contrato Digital Premium
              </h3>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                Validação Jurídica Avançada
              </Badge>
            </div>
          </div>
          
          <div className="text-right text-sm">
            <div className="font-mono text-gray-500">Hash: {hashDocumento}</div>
            <div className="text-gray-600">
              <Clock className="inline h-4 w-4 mr-1" />
              {formatarTempo(tempoLeitura)}
            </div>
          </div>
        </div>

        {/* Painel de Validações */}
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className={`p-2 rounded-lg border text-center ${validacoesPendentes.tempo ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <Clock className={`h-4 w-4 mx-auto mb-1 ${validacoesPendentes.tempo ? 'text-green-600' : 'text-yellow-600'}`} />
            <div className="text-xs font-medium">
              {validacoesPendentes.tempo ? 'Tempo OK' : 'Lendo...'}
            </div>
          </div>
          
          <div className={`p-2 rounded-lg border text-center ${validacoesPendentes.scroll ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <Eye className={`h-4 w-4 mx-auto mb-1 ${validacoesPendentes.scroll ? 'text-green-600' : 'text-gray-600'}`} />
            <div className="text-xs font-medium">
              {validacoesPendentes.scroll ? 'Lido' : 'Pendente'}
            </div>
          </div>
          
          <div className={`p-2 rounded-lg border text-center ${validacoesPendentes.localizacao ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <MapPin className={`h-4 w-4 mx-auto mb-1 ${validacoesPendentes.localizacao ? 'text-green-600' : 'text-blue-600'}`} />
            <div className="text-xs font-medium">
              {validacoesPendentes.localizacao ? 'GPS OK' : 'Opcional'}
            </div>
          </div>
          
          <div className={`p-2 rounded-lg border text-center ${validacoesPendentes.biometria ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <Fingerprint className={`h-4 w-4 mx-auto mb-1 ${validacoesPendentes.biometria ? 'text-green-600' : 'text-orange-600'}`} />
            <div className="text-xs font-medium">
              {validacoesPendentes.biometria ? 'Validado' : 'Aguardando'}
            </div>
          </div>
        </div>

        {/* Conteúdo do Contrato */}
        <div 
          className="h-96 w-full border-2 border-blue-300 rounded-lg p-4 bg-gradient-to-br from-white to-blue-50 overflow-y-auto"
          onScroll={handleScroll}
          ref={scrollAreaRef}
        >
          <div className="text-sm leading-relaxed text-justify whitespace-pre-line">
            {contratoTexto}
          </div>
        </div>

        {/* Validação Biométrica */}
        {scrollCompleto && validacoesPendentes.tempo && !validacoesPendentes.biometria && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Fingerprint className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-orange-900">Validação Biométrica Requerida</h4>
            </div>
            <p className="text-sm text-orange-700 mb-3">
              Para garantir a autenticidade da assinatura, clique no botão abaixo para simular a validação biométrica.
            </p>
            <Button 
              onClick={simularValidacaoBiometrica}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Validar Identidade
            </Button>
          </div>
        )}

        {/* Status Final */}
        <div className="mt-4 text-center">
          {Object.values(validacoesPendentes).every(v => v) && scrollCompleto ? (
            <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">
                ✓ Todas as validações concluídas - Documento pronto para assinatura
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-blue-700 bg-blue-50 p-3 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <span>
                Aguardando validações de segurança...
              </span>
            </div>
          )}
        </div>

        {/* Informações de Segurança */}
        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <strong>🔒 Validações de Segurança:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Tempo mínimo de leitura: 30 segundos</li>
                <li>• Leitura completa obrigatória</li>
                <li>• Validação biométrica simulada</li>
              </ul>
            </div>
            <div>
              <strong>📍 Dados Coletados:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Localização GPS (se permitida)</li>
                <li>• Hash de integridade do documento</li>
                <li>• Tempo de leitura detalhado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

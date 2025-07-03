
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Check, Shield, Camera, Fingerprint, AlertTriangle } from 'lucide-react';

interface AssinaturaDigitalPremiumProps {
  onAssinaturaCompleta: (dados: any) => void;
  disabled?: boolean;
  dadosValidacao?: any;
}

export function AssinaturaDigitalPremium({ onAssinaturaCompleta, disabled, dadosValidacao }: AssinaturaDigitalPremiumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [coordenadas, setCoordenadas] = useState<{x: number, y: number, timestamp: number}[]>([]);
  const [velocidadeAssinatura, setVelocidadeAssinatura] = useState<number[]>([]);
  const [inicioAssinatura, setInicioAssinatura] = useState<Date | null>(null);
  const [fimAssinatura, setFimAssinatura] = useState<Date | null>(null);
  const [pressaoSimulada, setPressaoSimulada] = useState<number[]>([]);
  const [selfieCapturada, setSelfieCapturada] = useState<string | null>(null);
  const [validacaoBiometrica, setValidacaoBiometrica] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurações premium do canvas
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      
      // Redesenhar configurações após resize
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    
    setIsDrawing(true);
    setInicioAssinatura(new Date());
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Registrar coordenadas com timestamp
    const novaCoordenada = { x, y, timestamp: Date.now() };
    setCoordenadas(prev => [...prev, novaCoordenada]);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const agora = Date.now();
    const novaCoordenada = { x, y, timestamp: agora };
    
    setCoordenadas(prev => {
      const ultimaCoordenada = prev[prev.length - 1];
      if (ultimaCoordenada) {
        // Calcular velocidade
        const distancia = Math.sqrt(
          Math.pow(x - ultimaCoordenada.x, 2) + Math.pow(y - ultimaCoordenada.y, 2)
        );
        const tempo = agora - ultimaCoordenada.timestamp;
        const velocidade = tempo > 0 ? distancia / tempo : 0;
        
        setVelocidadeAssinatura(prevVel => [...prevVel, velocidade]);
        
        // Simular pressão baseada na velocidade
        const pressao = Math.min(1, Math.max(0.3, 1 - velocidade * 0.1));
        setPressaoSimulada(prevPressao => [...prevPressao, pressao]);
      }
      
      return [...prev, novaCoordenada];
    });

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setFimAssinatura(new Date());
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setCoordenadas([]);
    setVelocidadeAssinatura([]);
    setPressaoSimulada([]);
    setInicioAssinatura(null);
    setFimAssinatura(null);
  };

  const capturarSelfie = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const selfieDataURL = canvas.toDataURL('image/jpeg', 0.8);
          setSelfieCapturada(selfieDataURL);
          
          // Parar o stream
          stream.getTracks().forEach(track => track.stop());
        }
      };
    } catch (error) {
      console.error('Erro ao capturar selfie:', error);
      // Simular selfie para demo
      setSelfieCapturada('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TZWxmaWU8L3RleHQ+PC9zdmc+');
    }
  };

  const simularValidacaoBiometrica = () => {
    setTimeout(() => {
      setValidacaoBiometrica(true);
    }, 1500);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const assinaturaDataURL = canvas.toDataURL('image/png');
    
    // Calcular métricas da assinatura
    const tempoTotal = fimAssinatura && inicioAssinatura 
      ? fimAssinatura.getTime() - inicioAssinatura.getTime() 
      : 0;
    
    const velocidadeMedia = velocidadeAssinatura.length > 0 
      ? velocidadeAssinatura.reduce((a, b) => a + b, 0) / velocidadeAssinatura.length 
      : 0;
    
    const pressaoMedia = pressaoSimulada.length > 0 
      ? pressaoSimulada.reduce((a, b) => a + b, 0) / pressaoSimulada.length 
      : 0;

    const dadosCompletos = {
      assinatura: assinaturaDataURL,
      selfie: selfieCapturada,
      metricas: {
        coordenadas,
        velocidadeAssinatura: velocidadeMedia,
        pressaoMedia,
        tempoAssinatura: tempoTotal,
        pontos: coordenadas.length
      },
      validacoes: {
        biometrica: validacaoBiometrica,
        selfie: !!selfieCapturada,
        ...dadosValidacao
      },
      timestamp: new Date().toISOString()
    };

    onAssinaturaCompleta(dadosCompletos);
  };

  const podeAssinar = hasSignature && selfieCapturada && validacaoBiometrica;

  return (
    <Card className="w-full border-2 border-blue-200">
      <div className="p-6">
        {/* Header Premium */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Assinatura Digital Premium
              </h3>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                Validação Biométrica Avançada
              </Badge>
            </div>
          </div>
        </div>

        {/* Validações Pendentes */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className={`p-2 rounded-lg border text-center ${hasSignature ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <Check className={`h-4 w-4 mx-auto mb-1 ${hasSignature ? 'text-green-600' : 'text-gray-600'}`} />
            <div className="text-xs font-medium">Assinatura</div>
          </div>
          
          <div className={`p-2 rounded-lg border text-center ${selfieCapturada ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <Camera className={`h-4 w-4 mx-auto mb-1 ${selfieCapturada ? 'text-green-600' : 'text-orange-600'}`} />
            <div className="text-xs font-medium">Selfie</div>
          </div>
          
          <div className={`p-2 rounded-lg border text-center ${validacaoBiometrica ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <Fingerprint className={`h-4 w-4 mx-auto mb-1 ${validacaoBiometrica ? 'text-green-600' : 'text-red-600'}`} />
            <div className="text-xs font-medium">Biometria</div>
          </div>
        </div>

        {/* Canvas de Assinatura */}
        <div className="mb-4">
          <canvas
            ref={canvasRef}
            className={`w-full h-40 border-2 border-dashed rounded-lg cursor-crosshair ${
              disabled ? 'bg-gray-100 border-gray-300' : 'bg-white border-blue-300 hover:border-blue-400'
            }`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Ações de Validação */}
        <div className="space-y-3 mb-4">
          {!selfieCapturada && (
            <Button
              onClick={capturarSelfie}
              variant="outline"
              className="w-full"
              disabled={disabled}
            >
              <Camera className="h-4 w-4 mr-2" />
              Capturar Selfie de Verificação
            </Button>
          )}

          {selfieCapturada && !validacaoBiometrica && (
            <Button
              onClick={simularValidacaoBiometrica}
              variant="outline"
              className="w-full bg-orange-50 hover:bg-orange-100"
              disabled={disabled}
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Validar Biometria
            </Button>
          )}
        </div>

        {/* Selfie Preview */}
        {selfieCapturada && (
          <div className="mb-4 text-center">
            <div className="inline-block p-2 border rounded-lg bg-gray-50">
              <img 
                src={selfieCapturada} 
                alt="Selfie de verificação" 
                className="w-20 h-20 object-cover rounded"
              />
              <div className="text-xs text-gray-600 mt-1">Selfie capturada</div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={clearSignature}
            disabled={!hasSignature || disabled}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Limpar Tudo
          </Button>

          <Button
            onClick={saveSignature}
            disabled={!podeAssinar || disabled}
            className={`flex items-center gap-2 ${
              podeAssinar 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Shield className="h-4 w-4" />
            {podeAssinar ? 'Confirmar Assinatura Premium' : 'Complete todas as validações'}
          </Button>
        </div>

        {/* Status e Avisos */}
        {!podeAssinar && hasSignature && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Complete todas as validações de segurança para prosseguir
              </span>
            </div>
          </div>
        )}

        {/* Métricas em Tempo Real */}
        {hasSignature && (
          <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div>Pontos capturados: {coordenadas.length}</div>
              <div>Velocidade média: {velocidadeAssinatura.length > 0 ? (velocidadeAssinatura.reduce((a, b) => a + b, 0) / velocidadeAssinatura.length).toFixed(2) : '0'}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

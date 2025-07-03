
import { useEffect, useCallback } from 'react';
import { useMarcas } from '@/hooks/useMarcas';

export function useAlertasAutomaticos() {
  const { marcas } = useMarcas();

  const verificarECriarAlertas = useCallback(() => {
    const hoje = new Date();
    const alertasExistentes = JSON.parse(localStorage.getItem('alertas') || '[]');
    const novosAlertas = [];

    marcas.forEach(marca => {
      // Verifica se a marca tem data limite de manifestação
      if (marca.dataLimiteManifestacao) {
        const dataLimite = new Date(marca.dataLimiteManifestacao);
        const diasRestantes = Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

        // Criar alerta se estiver próximo do vencimento (30 dias ou menos) e não existir alerta ativo
        if (diasRestantes <= 30 && diasRestantes >= 0) {
          const alertaExiste = alertasExistentes.some((alerta: any) => 
            alerta.marcaId === marca.id && 
            alerta.status === 'ativo' && 
            alerta.tipo === 'prazo'
          );

          if (!alertaExiste) {
            const prioridade = diasRestantes <= 7 ? 'alta' : 
                             diasRestantes <= 15 ? 'alta' : 'media';

            const novoAlerta = {
              id: Math.random().toString(36).slice(2, 10),
              marcaId: marca.id,
              marca: marca.nome,
              tipo: 'prazo',
              titulo: `${marca.statusDetalhado} - ${marca.nome}`,
              descricao: `Prazo para manifestação vence em ${diasRestantes} dias`,
              prazo: dataLimite.toISOString(),
              prioridade,
              status: 'ativo',
              createdAt: hoje.toISOString(),
              cliente: marca.titular
            };

            novosAlertas.push(novoAlerta);
          }
        }
      }

      // Verifica próximo prazo geral da marca
      if (marca.proximoPrazo) {
        const proximoPrazo = new Date(marca.proximoPrazo);
        const diasRestantes = Math.ceil((proximoPrazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

        if (diasRestantes <= 15 && diasRestantes >= 0) {
          const alertaExiste = alertasExistentes.some((alerta: any) => 
            alerta.marcaId === marca.id && 
            alerta.status === 'ativo' && 
            alerta.tipo === 'renovacao'
          );

          if (!alertaExiste) {
            const prioridade = diasRestantes <= 7 ? 'alta' : 'media';

            const novoAlerta = {
              id: Math.random().toString(36).slice(2, 10),
              marcaId: marca.id,
              marca: marca.nome,
              tipo: 'renovacao',
              titulo: `Próximo prazo - ${marca.nome}`,
              descricao: `Próximo prazo vence em ${diasRestantes} dias`,
              prazo: proximoPrazo.toISOString(),
              prioridade,
              status: 'ativo',
              createdAt: hoje.toISOString(),
              cliente: marca.titular
            };

            novosAlertas.push(novoAlerta);
          }
        }
      }
    });

    // Salvar novos alertas se existirem
    if (novosAlertas.length > 0) {
      const todosAlertas = [...alertasExistentes, ...novosAlertas];
      localStorage.setItem('alertas', JSON.stringify(todosAlertas));
      console.log('Alertas automáticos criados:', novosAlertas);
    }

    // Limpar alertas vencidos (mais de 30 dias após o prazo)
    const alertasAtualizados = alertasExistentes.filter((alerta: any) => {
      const dataVencimento = new Date(alerta.prazo);
      const diasAposVencimento = Math.ceil((hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24));
      return diasAposVencimento <= 30;
    });

    if (alertasAtualizados.length !== alertasExistentes.length) {
      localStorage.setItem('alertas', JSON.stringify(alertasAtualizados));
    }

  }, [marcas]);

  useEffect(() => {
    // Verificar alertas quando o componente monta e quando marcas mudam
    verificarECriarAlertas();

    // Configurar verificação periódica (a cada hora)
    const interval = setInterval(verificarECriarAlertas, 3600000);

    return () => clearInterval(interval);
  }, [verificarECriarAlertas]);

  return { verificarECriarAlertas };
}

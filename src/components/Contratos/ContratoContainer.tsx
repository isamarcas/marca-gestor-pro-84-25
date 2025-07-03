
import { VersionSelector } from '@/components/Contratos/VersionSelector';
import { ContratoSuccessPage } from '@/components/Contratos/ContratoSuccessPage';
import { ContratoHeader } from '@/components/Contratos/ContratoHeader';
import { ContratoSteps } from '@/components/Contratos/ContratoSteps';
import { ContratoForm } from '@/components/Contratos/ContratoForm';
import { useContratoManager, contratoTexto } from '@/components/Contratos';
import { useContratos } from '@/hooks/useContratos';

export function ContratoContainer() {
  const {
    versao,
    step,
    nomeCliente,
    emailCliente,
    leituraCompleta,
    contratoFinalizado,
    dadosValidacaoPremium,
    handleMudarVersao,
    handleVoltarParaSelecao,
    handleProximoStep,
    handleValidacaoPremiumCompleta,
    handleAssinaturaCompleta,
    setNomeCliente,
    setEmailCliente,
    setLeituraCompleta
  } = useContratoManager();

  const { isLoading } = useContratos();

  if (step === 'finalizado' && contratoFinalizado) {
    return <ContratoSuccessPage contratoFinalizado={contratoFinalizado} />;
  }

  return (
    <>
      <ContratoHeader 
        step={step}
        versao={versao}
        onVoltarParaSelecao={handleVoltarParaSelecao}
      />

      {step === 'versao' && (
        <VersionSelector
          versaoAtual={versao}
          onMudarVersao={handleMudarVersao}
        />
      )}

      {step !== 'versao' && step !== 'finalizado' && (
        <>
          <ContratoSteps currentStep={step} versao={versao} />
          <ContratoForm
            step={step as 'dados' | 'contrato' | 'assinatura'}
            versao={versao}
            nomeCliente={nomeCliente}
            emailCliente={emailCliente}
            leituraCompleta={leituraCompleta}
            contratoTexto={contratoTexto.replace('[Nome do Cliente]', nomeCliente)}
            dadosValidacaoPremium={dadosValidacaoPremium}
            isLoading={isLoading}
            onNomeChange={setNomeCliente}
            onEmailChange={setEmailCliente}
            onLeituraCompleta={setLeituraCompleta}
            onProximoStep={handleProximoStep}
            onValidacaoPremiumCompleta={handleValidacaoPremiumCompleta}
            onAssinaturaCompleta={handleAssinaturaCompleta}
          />
        </>
      )}
    </>
  );
}

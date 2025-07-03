
// Função para gerar SHA256
export const gerarSHA256 = async (texto: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('Erro ao gerar SHA256:', error);
    return 'hash-error-' + Date.now();
  }
};

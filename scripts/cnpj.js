function limparCnpj(cnpj) {
  const digitos = cnpj.replace(/\D/g, '');
  if (digitos.length !== 14) throw new Error(`CNPJ deve ter 14 dígitos: ${digitos}`);
  return digitos;
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

async function buscarCnpj(cnpj) {
  const resposta = await fetch(`https://open.cnpja.com/office/${cnpj}`);
  if (resposta.status === 429) {
    throw new Error('CNPJá: limite de consultas atingido, tente novamente em alguns instantes');
  }
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(`CNPJá: ${dados.message || resposta.status}`);
  return dados;
}

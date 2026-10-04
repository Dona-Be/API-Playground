function limparCep(cep) {
  const digitos = cep.replace(/\D/g, '');
  if (digitos.length !== 8) throw new Error(`CEP deve ter 8 dígitos: ${digitos}`);
  return digitos;
}

async function buscarCep(cepInformado) {
  const cep = limparCep(cepInformado);
  const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const dados = await resposta.json();
  if (dados.name === 'CepPromiseError') throw new Error(`CEP não encontrado: ${cep}`);
  if (!resposta.ok) throw new Error(`BrasilAPI: ${dados.message || resposta.status}`);
  return dados;
}

async function localizarCep(cep) {
  const dados = await buscarCep(cep);
  const { latitude, longitude } = dados.location?.coordinates ?? {};
  if (!latitude || !longitude) throw new Error(`CEP sem coordenadas disponíveis: ${dados.cep}`);
  return {
    cep: dados.cep,
    endereco: dados.street,
    cidade: dados.city,
    lat: latitude,
    lon: longitude
  };
}

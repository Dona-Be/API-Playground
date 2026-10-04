const NATUREZAS_SEM_FINS_LUCRATIVOS = [3069, 3999];

const PREFIXOS_DE_CNAE_DE_CARIDADE = ['8610', '8690', '87', '88', '9430'];

function cnaeIndicaCaridade(cnae) {
  return PREFIXOS_DE_CNAE_DE_CARIDADE.some((prefixo) => String(cnae).startsWith(prefixo));
}

function decidirVeredito({ ativa, semFinsLucrativos, atividadeDeCaridade }) {
  if (!ativa) return 'INATIVA';
  if (semFinsLucrativos && atividadeDeCaridade) return 'PROVAVELMENTE CARIDADE';
  if (semFinsLucrativos) return 'SEM FINS LUCRATIVOS (atividade não indica caridade)';
  return 'IMPROVÁVEL';
}

function descreverCriterio(atendido, criterio, valor) {
  return `${atendido ? 'OK' : 'NÃO'} - ${criterio}: ${valor}`;
}

function classificarCaridade(estabelecimento) {
  const situacao = estabelecimento.status.text;
  const natureza = estabelecimento.company.nature;
  const atividadePrincipal = estabelecimento.mainActivity;

  const ativa = situacao.toUpperCase() === 'ATIVA';
  const semFinsLucrativos = NATUREZAS_SEM_FINS_LUCRATIVOS.includes(natureza.id);
  const atividadeDeCaridade = cnaeIndicaCaridade(atividadePrincipal.id);

  return {
    veredito: decidirVeredito({ ativa, semFinsLucrativos, atividadeDeCaridade }),
    motivos: [
      descreverCriterio(ativa, 'situação cadastral', situacao),
      descreverCriterio(semFinsLucrativos, 'natureza jurídica sem fins lucrativos', natureza.text),
      descreverCriterio(atividadeDeCaridade, 'atividade principal típica de caridade', atividadePrincipal.text)
    ]
  };
}

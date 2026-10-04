function valorDoCampo(id) {
  return document.getElementById(id).value.trim();
}

function preencherCampo(id, valor) {
  document.getElementById(id).value = valor;
}

function aoClicar(id, acao) {
  document.getElementById(id).addEventListener('click', acao);
}

function criarBotao(rotulo, acao) {
  const botao = document.createElement('button');
  botao.textContent = rotulo;
  botao.addEventListener('click', acao);
  return botao;
}

async function consultarCep() {
  try {
    exibirJson('saida-cep', await buscarCep(valorDoCampo('cep')));
  } catch (erro) {
    exibirErro('saida-cep', erro);
  }
}

async function calcularRota() {
  try {
    const origem = valorDoCampo('coordenadas-origem');
    const destino = valorDoCampo('coordenadas-destino');
    exibirJson('saida-rota', await buscarRota(origem, destino));
  } catch (erro) {
    exibirErro('saida-rota', erro);
  }
}

async function calcularDistancia() {
  try {
    exibirTexto('saida-distancia', 'Buscando CEPs (BrasilAPI)...');
    const origem = await localizarCep(valorDoCampo('cep-origem'));
    const destino = await localizarCep(valorDoCampo('cep-destino'));

    exibirTexto('saida-distancia', 'Calculando rota (OSRM)...');
    const { routes } = await buscarRota(formatarLonLat(origem), formatarLonLat(destino));
    const rota = routes[0];

    exibirJson('saida-distancia', {
      origem,
      destino,
      distancia_km: (rota.distance / 1000).toFixed(2),
      duracao_min: (rota.duration / 60).toFixed(1)
    });
  } catch (erro) {
    exibirErro('saida-distancia', erro);
  }
}

async function consultarCnpj(cnpjInformado) {
  exibirTexto('saida-caridade', '');
  try {
    const cnpj = limparCnpj(cnpjInformado);
    preencherCampo('cnpj', formatarCnpj(cnpj));
    exibirTexto('saida-cnpj', 'Consultando CNPJá...');

    const estabelecimento = await buscarCnpj(cnpj);
    const { veredito, motivos } = classificarCaridade(estabelecimento);
    exibirTexto('saida-caridade', `${veredito}\n\n${motivos.join('\n')}`);
    exibirJson('saida-cnpj', estabelecimento);
  } catch (erro) {
    exibirTexto('saida-caridade', '');
    exibirErro('saida-cnpj', erro);
  }
}

function criarBotaoDeCopiar(texto) {
  let temporizador;
  const botao = criarBotao('Copiar', async () => {
    try {
      await navigator.clipboard.writeText(texto);
      botao.textContent = 'Copiado!';
    } catch {
      botao.textContent = 'Não copiado';
    }
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { botao.textContent = 'Copiar'; }, 1500);
  });
  return botao;
}

function criarLinhaDeInstituicao({ nome, cnpj }) {
  const cnpjFormatado = formatarCnpj(cnpj);
  const linha = document.createElement('div');
  linha.append(
    `${nome} - ${cnpjFormatado} `,
    criarBotaoDeCopiar(cnpjFormatado),
    ' ',
    criarBotao('Consultar na CNPJá', () => consultarCnpj(cnpj))
  );
  return linha;
}

function listarInstituicoes(instituicoes) {
  document.getElementById('instituicoes').append(...instituicoes.map(criarLinhaDeInstituicao));
}

listarInstituicoes(INSTITUICOES_DE_EXEMPLO);
aoClicar('consultar-cep', consultarCep);
aoClicar('calcular-rota', calcularRota);
aoClicar('calcular-distancia', calcularDistancia);
aoClicar('consultar-cnpj', () => consultarCnpj(valorDoCampo('cnpj')));

function exibirTexto(idDaSaida, texto) {
  document.getElementById(idDaSaida).textContent = texto;
}

function exibirJson(idDaSaida, dados) {
  exibirTexto(idDaSaida, JSON.stringify(dados, null, 2));
}

function exibirErro(idDaSaida, erro) {
  exibirTexto(idDaSaida, `Erro: ${erro.message}`);
}

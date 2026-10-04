function formatarLonLat({ lat, lon }) {
  return `${lon},${lat}`;
}

async function buscarRota(origemLonLat, destinoLonLat) {
  const resposta = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${origemLonLat};${destinoLonLat}?overview=false`
  );
  const dados = await resposta.json();
  if (dados.code !== 'Ok') throw new Error(`OSRM: ${dados.code}`);
  return dados;
}

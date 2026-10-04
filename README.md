# API-Playground

Repositório local destinado a guardar demonstrações do funcionamento das APIs públicas e externas testadas antes de serem usadas no projeto.

## APIs testadas

- **[BrasilAPI - CEP v2](https://brasilapi.com.br/docs)** - consulta endereço e coordenadas (latitude/longitude) a partir de um CEP, em uma única chamada.
  ```
  GET https://brasilapi.com.br/api/cep/v2/01310200
  ```

- **[OSRM](https://project-osrm.org)** - cálculo de rota entre dois pontos (servidor de demonstração público).
  ```
  GET https://router.project-osrm.org/route/v1/driving/-46.633309,-23.550520;-46.625290,-23.533773?overview=false
  ```

- **[CNPJá](https://cnpja.com/api/open)** - dados cadastrais de um CNPJ. Tem CORS liberado, então funciona direto do navegador.
  ```
  GET https://open.cnpja.com/office/67185694000150
  ```
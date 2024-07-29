<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Esta documentação descreve os endpoints disponíveis na API Chuck Norris Facts, implementada usando o framework NestJS. A API fornece informações sobre piadas de Chuck Norris, incluindo categorias e piadas aleatórias baseadas em texto livre ou categorias específicas.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

### 1. Obter Categorias
GET /chuck-norris-fact/categories
Retorna uma lista de todas as categorias de piadas disponíveis.
* Exemplo de Requisição:
```bash
GET /chuck-norris-fact/categories
```
* Exemplo de Resposta:
```json
{
  "categories": ["animal", "career", "celebrity", "dev", "explicit", "fashion", "food", "history", "money", "movie", "music", "political", "religion", "science", "sport", "travel"]
}
```
### 2. Obter Piada Aleatória por Texto Livre
GET /chuck-norris-fact/free-text
Retorna uma piada aleatória baseada em uma pesquisa de texto livre.

Parâmetros de Query: query (string) - O texto para a pesquisa.
* Exemplo de Requisição:
```bash
GET /chuck-norris-fact/free-text?query=funny
```
* Exemplo de Resposta:
```json
{
  "data": {
    "id": "RANDOM_JOKE_ID",
    "value": "A funny Chuck Norris joke.",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "url": "https://api.chucknorris.io/jokes/RANDOM_JOKE_ID"
  }
}
```

### 3. Obter Piada Aleatória por Categoria
GET /chuck-norris-fact/random
Retorna uma piada aleatória de uma categoria específica.

Parâmetros de Query: category (string) - A categoria para a piada aleatória. (Opcional)
* Exemplo de Requisição:
```GET /chuck-norris-fact/random?category=animal```
* Exemplo de Resposta:
```json
{
  "data": {
    "id": "RANDOM_JOKE_ID",
    "value": "A Chuck Norris joke about animals.",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "url": "https://api.chucknorris.io/jokes/RANDOM_JOKE_ID"
  }
}
```

- Author - [Mateus dos Santos](https://www.linkedin.com/in/mateus-dos-santos/)
- Website - [Chuck Norris App](https://chuck-norris-client.vercel.app/)

## License

Nest is [MIT licensed](LICENSE).

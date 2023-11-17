# Serverest Cypress API Test

[![cypress](https://img.shields.io/badge/cypress-8.3.1-brightgreen)](https://www.cypress.io/)
[![@bahmutov/cy-api](https://img.shields.io/badge/cypress-api-brightgreen)](https://github.com/bahmutov/cy-api)
[![typescript](https://img.shields.io/badge/typescript-5.2.2-blue)](https://www.typescriptlang.org/)
[![@types/node](https://img.shields.io/badge/@types/node-20.9.0-blue)](https://nodejs.org/en/)
[![mochawesome](https://img.shields.io/badge/mochawesome-4.3.0-orange)](https://www.npmjs.com/package/mochawesome)
[![mochawesome-merge](https://img.shields.io/badge/mochawesome--merge-4.3.0-orange)](https://www.npmjs.com/package/mochawesome-merge)
[![mochawesome-report-generator](https://img.shields.io/badge/mochawesome--report--generator-6.2.0-orange)](https://www.npmjs.com/package/mochawesome-report-generator)
[![cypress-mochawesome-reporter](https://img.shields.io/badge/cypress--mochawesome--reporter-3.6.0-orange)](https://www.npmjs.com/package/cypress-mochawesome-reporter)

Este projeto é destinado a testes de API usando Cypress. Ele utiliza várias dependências e comandos personalizados para facilitar os testes de API realizados na API REST gratuita [https://serverest.dev/](https://serverest.dev/).

## Pré-requisitos

- Node.js instalado em sua máquina.
- Conhecimento básico em JS/TS, Cypress e API.

## Dependências

Este projeto utiliza várias dependências, incluindo:

- [cypress](https://www.cypress.io/): Para automação de testes de interface do usuário.
- [@bahmutov/cy-api](https://github.com/bahmutov/cy-api): Para facilitar os testes de API com Cypress.
- [typescript](https://www.npmjs.com/package/typescript) e
  [@types/node](https://www.npmjs.com/package/@types/node/v/18.11.18): Para suporte a TypeScript.
- [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters), [mochawesome](https://www.npmjs.com/package/mochawesome), [mochawesome-merge](https://www.npmjs.com/package/mochawesome-merge), [mochawesome-report-generator](https://www.npmjs.com/package/mochawesome-report-generator), [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter): Para gerar relatórios de testes.

## Configuração

Para configurar o projeto, clone o repositório e instale as dependências:

```bash
git clone https://github.com/ricardovac/cypress-serverest.git
cd cypress-serverest
npm install
```

## Execução dos testes

Para executar os testes, você pode usar os seguintes comandos:

- Para abrir o Cypress:

```bash
npm run cy:open
```

- Para executar os testes e gerar o relatório:

```bash
npm run cy:run
```

- Para gerar o relatório de testes:

```bash
npm run report:merge
npm run report:generate
```

## Testes

Os testes estão implementados usando comandos personalizados do Cypress para facilitar a criação, atualização, obtenção e exclusão de produtos, bem como a adição de produtos ao carrinho. Aqui está um exemplo de um teste para criar um produto:

```ts
Cypress.Commands.add("createProduct", (product, token) => {
  cy.log("**createProduct**").api({
    method: "POST",
    url: "/produtos",
    headers: {
      Authorization: token,
    },
    body: {
      nome: product.nome,
      preco: product.preco,
      descricao: product.descricao,
      quantidade: product.quantidade,
    },
    failOnStatusCode: false,
  });
});
```

```ts
describe("CRUD - Produto", () => {
  it("Deve cadastrar um produto com sucesso", () => {
    cy.createProduct(produto, Cypress.env("token")).then((res: Response) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      expect(res.body._id).to.not.be.null;

      productId = res.body._id;
    });
  });
});
```

# Ver os Relatórios

O workflow do GitHub está configurado para gerar os relatórios de testes e publicá-los no GitHub Pages. Você pode acessar os relatórios na URL abaixo:

## [https://ricardovac.github.io/cypress-serverest/](https://ricardovac.github.io/cypress-serverest/)

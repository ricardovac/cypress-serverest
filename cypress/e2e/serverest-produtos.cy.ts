import { Product } from "../support/commands";
import { faker } from "@faker-js/faker";

const Produto: Product = {
  nome: faker.commerce.productName(),
  preco: Number(faker.commerce.price()),
  descricao: faker.commerce.productDescription(),
  quantidade: Math.floor(Math.random() * 100),
};

before(() => {
  cy.login();
});

describe("CRUD - Produto", () => {
  it("Deve cadastrar produto com sucesso", () => {
    cy.createProduct(Produto, Cypress.env("token")).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.not.be.null;
      cy.log(JSON.stringify(response.body));
    });
  });

  it("Deve listar produto pelo Id", () => {});

  it("Deve editar produto", () => {});

  it("Deve excluir produto", () => {});
});

describe("Functional Test - Produto", () => {
  it("Não deve cadastrar um produto com nome já utilizado", () => {});

  it("Não deve excluir um produto que faz parte de um carrinho", () => {});

  it("Caso não seja encontrado usuário com o ID informado deve ser realizado novo cadastro ao invés de alteração", () => {});
});

import { Product } from "../support/commands";
import { faker } from "@faker-js/faker";

let produto: Product = {
  nome: faker.commerce.productName(),
  preco: Number(faker.commerce.price()),
  descricao: faker.commerce.productDescription(),
  quantidade: Math.floor(Math.random() * 100),
};

before(() => {
  cy.generateToken();
});

let productId: string;

describe("CRUD - Produto", () => {
  it("Deve cadastrar produto com sucesso", () => {
    cy.createProduct(produto, Cypress.env("token")).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.not.be.null;

      productId = response.body._id;
    });
  });

  it("Deve listar produto pelo Id", () => {
    cy.getProduct(productId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nome).to.eq(produto.nome);
      expect(response.body.preco).to.eq(produto.preco);
      expect(response.body.descricao).to.eq(produto.descricao);
      expect(response.body.quantidade).to.eq(produto.quantidade);
    });
  });

  it("Deve editar produto", () => {
    cy.updateProduct(Cypress.env("token"), productId, {
      nome: faker.commerce.productName(),
      preco: Number(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 100),
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Deve excluir produto", () => {});
});

describe("Functional Test - Produto", () => {
  it("Não deve cadastrar um produto com nome já utilizado", () => {});

  it("Não deve excluir um produto que faz parte de um carrinho", () => {});

  it("Caso não seja encontrado usuário com o ID informado deve ser realizado novo cadastro ao invés de alteração", () => {});
});

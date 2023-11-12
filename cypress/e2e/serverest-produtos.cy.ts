import { Product } from "../support/commands";
import { faker } from "@faker-js/faker";

let produto: Product = {
  nome: faker.commerce.productName(),
  preco: Number(faker.commerce.price()),
  descricao: faker.commerce.productDescription(),
  quantidade: Math.floor(Math.random() * 100),
};
let productId: string;

before(() => cy.generateToken());

describe("CRUD - Produto", () => {
  it("Deve cadastrar um produto com sucesso", () => {
    cy.createProduct(produto, Cypress.env("token")).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      expect(res.body._id).to.not.be.null;

      productId = res.body._id;
    });
  });

  it("Deve listar um produto pelo Id", () => {
    cy.getProduct(productId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.nome).to.eq(produto.nome);
      expect(res.body.preco).to.eq(produto.preco);
      expect(res.body.descricao).to.eq(produto.descricao);
      expect(res.body.quantidade).to.eq(produto.quantidade);
    });
  });

  it("Deve editar um produto", () => {
    cy.updateProduct(Cypress.env("token"), productId, {
      nome: faker.commerce.productName(),
      preco: Number(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 100),
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Deve excluir um produto", () => {
    cy.deleteProduct(Cypress.env("token"), productId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro excluído com sucesso");
    });
  });
});

describe("Functional Test - Produto", () => {
  it("Não deve cadastrar um produto com nome já utilizado", () => {});

  it("Não deve excluir um produto que faz parte de um carrinho", () => {});

  it("Caso não seja encontrado usuário com o ID informado deve ser realizado novo cadastro ao invés de alteração", () => {});
});

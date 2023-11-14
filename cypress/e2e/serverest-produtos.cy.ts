import { faker } from "@faker-js/faker";
import { GenericStaticResponse } from "cypress/types/net-stubbing";
import { Product, ProductResponse } from "../support/commands";

type Response = GenericStaticResponse<unknown, ProductResponse> & {
  status: number;
};

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
    cy.createProduct(produto, Cypress.env("token")).then((res: Response) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      expect(res.body._id).to.not.be.null;

      productId = res.body._id;
    });
  });

  it("Deve listar todos os produtos", () => {
    cy.getProducts().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.produtos).to.be.an("array");
      expect(res.body.produtos[0]).to.have.all.keys(
        "_id",
        "nome",
        "preco",
        "descricao",
        "quantidade"
      );
    });
  });

  it("Deve listar um produto pelo Id", () => {
    cy.getProduct(productId).then((res: Response) => {
      expect(res.status).to.eq(200);
      expect(res.body.nome).to.eq(produto.nome);
      expect(res.body.preco).to.eq(produto.preco);
      expect(res.body.descricao).to.eq(produto.descricao);
      expect(res.body.quantidade).to.eq(produto.quantidade);
    });
  });

  it("Deve editar um produto", () => {
    cy.updateProduct(productId, Cypress.env("token"), {
      nome: faker.commerce.productName(),
      preco: Number(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 100),
    }).then((res: Response) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Deve excluir um produto", () => {
    cy.deleteProduct(productId, Cypress.env("token")).then((res: Response) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro excluído com sucesso");
    });
  });
});

describe("Functional Test - Produto", () => {
  before(() => {
    cy.createProduct(produto, Cypress.env("token")).then((res: Response) => {
      productId = res.body._id;
      cy.addToCart(productId, 1, Cypress.env("token"));
    });
  });

  it("Não deve cadastrar um produto com nome já utilizado", () => {
    cy.createProduct(produto, Cypress.env("token")).then((res: Response) =>
      expect(res.body.message).to.eq("Já existe produto com esse nome")
    );
  });

  it("Não deve excluir um produto que faz parte de um carrinho", () => {
    cy.deleteProduct(productId, Cypress.env("token")).then((res: Response) =>
      expect(res.body.message).to.eq(
        "Não é permitido excluir produto que faz parte de carrinho"
      )
    );
  });

  it("Caso não seja encontrado o ID do produto deve ser realizado novo cadastro ao invés de alteração", () => {
    cy.updateProduct("60f0b4b2f0a0a7001d78b4b2", Cypress.env("token"), {
      nome: faker.commerce.productName(),
      preco: Number(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 100),
    }).then((res: Response) => {
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
    });
  });
});

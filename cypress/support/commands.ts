export type Product = {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

export type ProductResponse = {
  _id: string;
  message: string;
} & Product;

Cypress.Commands.add("generateToken", () => {
  cy.api({
    log: false,
    method: "POST",
    url: "/login",
    body: {
      email: "fulano@qa.com",
      password: "teste",
    },
  }).then((response) => {
    const responseBody = response.body as { authorization: string };
    Cypress.env("token", responseBody.authorization);
  });
});

Cypress.Commands.add("createProduct", (product: Product, token: string) => {
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

Cypress.Commands.add("getProduct", (productId: string) =>
  cy.log("**getProduct**").api({
    method: "GET",
    url: `/produtos/${productId}`,
    failOnStatusCode: false,
  })
);

Cypress.Commands.add(
  "updateProduct",
  (productId: string, token: string, body: Product) =>
    cy.log("**updateProduct**").api({
      method: "PUT",
      url: `/produtos/${productId}`,
      headers: {
        Authorization: token,
      },
      body,
      failOnStatusCode: false,
    })
);

Cypress.Commands.add("deleteProduct", (productId: string, token: string) =>
  cy.log("**deleteProduct**").api({
    method: "DELETE",
    url: `/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  })
);

Cypress.Commands.add(
  "addToCart",
  (productId: string, quantity: number, token: string) => {
    // Evitar erro de usuário já possui um carrinho
    cy.api({
      log: false,
      method: "DELETE",
      url: `/carrinhos/concluir-compra`,
      headers: {
        Authorization: token,
      },
    });

    cy.log("**addToCart**").api({
      method: "POST",
      url: "/carrinhos",
      headers: {
        Authorization: token,
      },
      body: {
        produtos: [
          {
            idProduto: productId,
            quantidade: quantity,
          },
        ],
      },
      failOnStatusCode: false,
    });
  }
);

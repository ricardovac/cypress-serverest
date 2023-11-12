export type Product = {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

Cypress.Commands.add("generateToken", () => {
  cy.api({
    failOnStatusCode: false,
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
    failOnStatusCode: false,
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
  });
});

Cypress.Commands.add("getProduct", (productId: string) =>
  cy.log("**getProduct**").api({
    method: "GET",
    url: `/produtos/${productId}`,
    failOnStatusCode: false,
  }),
);

Cypress.Commands.add(
  "updateProduct",
  (token: string, productId: string, body: Product) =>
    cy.log("**updateProduct**").api({
      method: "PUT",
      url: `/produtos/${productId}`,
      headers: {
        Authorization: token,
      },
      body,
      failOnStatusCode: false,
    }),
);

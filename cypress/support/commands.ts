export type Product = {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

Cypress.Commands.add("login", () => {
  cy.log("**login**")
    .api({
      failOnStatusCode: false,
      log: false,
      method: "POST",
      url: "/login",
      body: {
        email: "fulano@qa.com",
        password: "teste",
      },
    })
    .then((response) =>
      cy.wrap(response.body.authorization, { log: false }).as("token"),
    );
});

Cypress.Commands.add("createProduct", (product: Product) => {
  cy.login().then((token) => {
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
});

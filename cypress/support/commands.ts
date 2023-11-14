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

Cypress.Commands.add("getProducts", () =>
  cy.log("**getProducts**").api({
    method: "GET",
    url: "/produtos",
  })
);

Cypress.Commands.add("getProduct", (productId) =>
  cy.log("**getProduct**").api({
    method: "GET",
    url: `/produtos/${productId}`,
  })
);

Cypress.Commands.add("updateProduct", (productId, token, body) =>
  cy.log("**updateProduct**").api({
    method: "PUT",
    url: `/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    body,
  })
);

Cypress.Commands.add("deleteProduct", (productId, token) =>
  cy.log("**deleteProduct**").api({
    method: "DELETE",
    url: `/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  })
);

Cypress.Commands.add("addToCart", (productId, quantity, token) => {
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
  });
});

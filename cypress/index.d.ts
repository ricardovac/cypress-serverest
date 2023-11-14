/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from "./support/commands";

/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** Cria um produto na API Rest com o token informado
       * cy.createProduct(token)
       * cy.createProduct(token, { nome: "Logitech", descricao: "Mouse", preco:  100, quantidade:  10 })
       */
      createProduct(product: Product, token: string): Chainable<any>;
      /** Retorna um produto da API Rest com o token informado
       * cy.getProduct(productId, token)
       */
      getProduct(productId: string): Chainable<any>;
      /** Realiza login na API Rest
       * cy.login()
       */
      generateToken(): Chainable<any>;
      /** Atualiza um produto na API Rest com o token informado
       * cy.updateProduct(token, productId, { nome: "Logitech", descricao: "Mouse", preco:  100, quantidade:  10 })
       */
      updateProduct(
        productId: string,
        token: string,
        body: Product,
      ): Chainable<any>;
      /** Exclui um produto na API Rest com o token informado
       * cy.deleteProduct(token, productId)
       */
      deleteProduct(productId: string, token: string): Chainable<any>;
      /** Adiciona um produto ao carrinho
       * cy.addToCart(productId)
       */
      addToCart(productId: string, quantity: number, token: string): Chainable<any>;
    }
  }
}

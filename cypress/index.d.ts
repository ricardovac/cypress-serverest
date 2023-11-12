/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from "./support/commands";

/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** Cria um produto na API Rest com o token informado
       * ```js
       * cy.createProduct(token)
       * cy.createProduct(token, { nome: "Logitech", descricao: "Mouse", preco:  100, quantidade:  10 })
       * ```
       */
      createProduct(product: Product, token: string): Chainable<any>;
      login(): Chainable<Promise<T>>;
    }
  }
}

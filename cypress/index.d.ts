import { Product } from "./support/commands";

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      createProduct(product: Product, token: string): Chainable<any>;

      getProduct(productId: string): Chainable<any>;

      generateToken(): Chainable<any>;

      updateProduct(
        productId: string,
        token: string,
        body: Product
      ): Chainable<any>;

      deleteProduct(productId: string, token: string): Chainable<any>;

      addToCart(
        productId: string,
        quantity: number,
        token: string
      ): Chainable<any>;
    }
  }
}

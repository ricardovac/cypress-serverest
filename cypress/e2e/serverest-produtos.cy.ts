import { Product } from "../support/commands";
import { commerce, random } from "faker-br";

const Produto: Product = {
  nome: commerce.productName(),
  preco: commerce.price(),
  descricao: commerce.productDescription(),
  quantidade: random.number(),
};

describe("Crud - Produto", () => {
  it("Deve cadastrar produto com sucesso", () => {});

  it("Deve listar produto pelo Id", () => {});

  it("Deve editar produto", () => {});

  it("Deve excluir produto", () => {});
});

describe("Functional Test - Produto", () => {
  it("Não deve cadastrar um produto com nome já utilizado", () => {});

  it("Não deve excluir um produto que faz parte de um carrinho", () => {});

  it("Caso não seja encontrado usuário com o ID informado deve ser realizado novo cadastro ao invés de alteração", () => {});
});

import Product from "../../../domain/product/entity/product-a";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "product", 100);

// mock ProductRepositoryInterface
const mockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = mockProductRepository();

    const usecase = new FindProductUseCase(productRepository);

    const input = { id: "123" };
    const output = {
      id: "123",
      name: "product",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});

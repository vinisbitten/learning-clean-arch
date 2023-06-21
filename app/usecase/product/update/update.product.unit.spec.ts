import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product", 1);

const input = {
  id: product.id,
  type: "a",
  name: "product updated",
  price: 2,
};

const mockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = mockProductRepository();

    const usecase = new UpdateProductUseCase(productRepository);

    const output = {
      id: product.id,
      name: "product updated",
      price: 2,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});

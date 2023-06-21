import CreateProductUseCase from "./create.product.usecase";

const mockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test create product use case", () => {
  it("should create a type A product", async () => {
    const productRepository = mockProductRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "product",
      price: 100,
    };

    const output = {
      id: expect.any(String),
      name: "product",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should create a type B product", async () => {
    const productRepository = mockProductRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "b",
      name: "product",
      price: 100,
    };

    const output = {
      id: expect.any(String),
      name: "product",
      price: 200,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});

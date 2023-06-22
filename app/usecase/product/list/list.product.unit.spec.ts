import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "product1", 100);
const product2 = ProductFactory.create("b", "product2", 200);

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test list product use case", () => {
  it("should list all products", async () => {
    const productRepository = MockProductRepository();

    const usecase = new ListProductUseCase(productRepository);

    const output = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    };

    const result = await usecase.execute({});

    expect(result).toStrictEqual(output);
  });
});

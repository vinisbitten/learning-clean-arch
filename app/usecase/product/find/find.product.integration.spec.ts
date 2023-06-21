import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product-a";
import ProductModel from "../../../infrastructure/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const product = new Product("123", "product", 100);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

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

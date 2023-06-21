import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const product = ProductFactory.create("a", "product", 100);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      type: "a",
      name: "new product",
      price: 200,
    };

    const output = {
      id: product.id,
      name: "new product",
      price: 200,
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});

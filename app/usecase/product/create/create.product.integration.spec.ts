import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

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

  it("should create a type A product", async () => {
    const productRepository = new ProductRepository();

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

    expect(result).toStrictEqual(output);
  });

  it("should create a type B product", async () => {
    const productRepository = new ProductRepository();

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

    expect(result).toStrictEqual(output);
  });
});

import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list customer use case", () => {
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

  it("should list products", async () => {
    const product1 = ProductFactory.create("a", "product1", 100);
    const product2 = ProductFactory.create("b", "product2", 200);

    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);

    const result = await usecase.execute({});

    expect(result.products).toHaveLength(2);
    expect(result.products).toContainEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price,
    });
    expect(result.products).toContainEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price,
    });
  });
});

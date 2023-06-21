import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/database/sequelize/model/customer.model";
import CreateCustomerUsecase from "./create.customer.usecase";

describe("Test create customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const usecase = new CreateCustomerUsecase(customerRepository);

    const input = {
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 100,
        city: "New York",
        state: "NY",
        zip: "10001",
      },
    };
    
    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        state: input.address.state,
        zip: input.address.zip,
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});

import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/database/sequelize/model/customer.model";
import ListCustomerUsecase from "./list.customer.usecase";

describe("Test list customer use case", () => {
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

  it("should list customers", async () => {
    const customer1 = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Main Street", 100, "New York", "NY", "10001")
    );
    const customer2 = CustomerFactory.createWithAddress(
      "Mary Beth",
      new Address("Palm Tree Street", 200, "Los Angeles", "CA", "90001")
    );

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const usecase = new ListCustomerUsecase(customerRepository);

    const result = await usecase.execute({});

    expect(result.customers).toHaveLength(2);
    expect(result.customers).toContainEqual({
      id: customer1.id,
      name: customer1.name,
      address: {
        street: customer1.address.street,
        number: customer1.address.number,
        city: customer1.address.city,
        state: customer1.address.state,
        zip: customer1.address.zip,
      },
    });
    expect(result.customers).toContainEqual({
      id: customer2.id,
      name: customer2.name,
      address: {
        street: customer2.address.street,
        number: customer2.address.number,
        city: customer2.address.city,
        state: customer2.address.state,
        zip: customer2.address.zip,
      },
    });
  });
});

import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/database/sequelize/model/customer.model";
import UpdateCustomerUsecase from "./update.customer.usecase";

describe("Test update customer use case", () => {
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

  it("should update a customer", async () => {
    const costumer = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Main Street", 100, "New York", "NY", "10001")
    );

    const customerRepository = new CustomerRepository();
    await customerRepository.create(costumer);

    const usecase = new UpdateCustomerUsecase(customerRepository);

    costumer.changeAddress(
      new Address("Palm Tree Avenue", 200, "Los Angeles", "CA", "90001")
    );

    const input = {
      id: costumer.id,
      name: costumer.name,
      address: {
        street: costumer.address.street,
        number: costumer.address.number,
        city: costumer.address.city,
        state: costumer.address.state,
        zip: costumer.address.zip,
      },
    };

    const result = await usecase.execute(input);
    const found = await customerRepository.find(costumer.id);

    expect(result.id).toEqual(found.id);
    expect(result.name).toEqual(found.name);
    expect(result.address).toStrictEqual({
      street: found.address.street,
      number: found.address.number,
      city: found.address.city,
      state: found.address.state,
      zip: found.address.zip,
    });
  });
});

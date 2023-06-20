import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/database/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";
describe("Test find customer use case", () => {
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

  it("should find a customer", async () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("Main Street", 100, "New York", "NY", "10001");
    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const usecase = new FindCustomerUsecase(customerRepository);

    const input = { id: "123" };
    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 100,
        city: "New York",
        state: "NY",
        zip: "10001",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});

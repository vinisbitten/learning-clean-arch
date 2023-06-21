import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("street1", 1, "city1", "state1", "zip1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Mary",
  new Address("street2", 2, "city2", "state2", "zip2")
);

const mockCustomerRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test list customer use case", () => {
  it("should list all customers", async () => {
    const customerRepository = mockCustomerRepository();

    const usecase = new ListCustomerUsecase(customerRepository);

    const output = {
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            state: customer1.address.state,
            zip: customer1.address.zip,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            state: customer2.address.state,
            zip: customer2.address.zip,
          },
        },
      ],
    };

    const result = await usecase.execute({});

    expect(result).toStrictEqual(output);
  });
});

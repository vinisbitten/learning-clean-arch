import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Main Street", 100, "New York", "NY", "10001")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "New Street",
    number: 200,
    city: "Newark",
    state: "NJ",
    zip: "20002",
  },
};

const mockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = mockCustomerRepository();

    const usecase = new UpdateCustomerUsecase(customerRepository);

    const output = {
      id: input.id,
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

    expect(result).toEqual(output);
  });
});

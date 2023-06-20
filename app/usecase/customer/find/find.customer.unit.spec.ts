import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Main Street", 100, "New York", "NY", "10001");
customer.changeAddress(address);

// mock CustomerRepositoryInterface
const mockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = mockCustomerRepository();

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

  it("should throw an error when customer is not found", async () => {
    const customerRepository = mockCustomerRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUsecase(customerRepository);

    const input = { id: "123" };

    await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
  });
});

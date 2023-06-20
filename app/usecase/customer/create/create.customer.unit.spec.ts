import CreateCustomerUsecase from "./create.customer.usecase";

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

const mockCustomerRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = mockCustomerRepository();

    const usecase = new CreateCustomerUsecase(customerRepository);

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

    expect(result).toEqual(output);
  });

  it("should throw an error when name is empty", async () => {
    const customerRepository = mockCustomerRepository();

    const usecase = new CreateCustomerUsecase(customerRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when address is invalid", async () => {
    const customerRepository = mockCustomerRepository();

    const usecase = new CreateCustomerUsecase(customerRepository);

    input.address.street = "";

    await expect(usecase.execute(input)).rejects.toThrow("Street is required");
  });
});

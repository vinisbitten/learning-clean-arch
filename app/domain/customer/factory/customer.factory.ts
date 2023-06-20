import Customer from "../entity/customer";
import Address from "../value-object/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }

  public static createWithId(id: string, name: string): Customer {
    return new Customer(id, name);
  }

  public static createWithIdAndAddress(
    id: string,
    name: string,
    address: Address
  ): Customer {
    const customer = new Customer(id, name);
    customer.changeAddress(address);
    return customer;
  }
}

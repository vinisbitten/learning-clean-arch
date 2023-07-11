import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDTO): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map((customer) => ({
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              state: customer.address.state,
              zip: customer.address.zip,
            },
          },
        })),
      },
      xmlOption
    );
  }
}

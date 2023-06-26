import CustomerYupValidator from "../../@shared/validator/customer.yup.validator";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}

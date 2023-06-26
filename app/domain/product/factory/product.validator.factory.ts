import ProductYupValidator from "../../@shared/validator/product.yup.validator";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import AbstractProduct from "../entity/product.abstract";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<AbstractProduct> {
    return new ProductYupValidator();
  }
}

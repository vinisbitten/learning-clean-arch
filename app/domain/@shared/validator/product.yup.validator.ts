import * as yup from "yup";
import AbstractProduct from "../../product/entity/product.abstract";
import ValidatorInterface from "./validator.interface";

export default class ProductYupValidator
  implements ValidatorInterface<AbstractProduct>
{
  validate(entity: AbstractProduct): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("id is required"),
          name: yup.string().required("name is required"),
          price: yup.number().moreThan(0, "price must be greater than 0"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}

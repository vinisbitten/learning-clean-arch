import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default abstract class AbstractProduct
  extends Entity
  implements ProductInterface
{
  protected _name: string;
  protected _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  protected validate(): void {
    ProductValidatorFactory.create().validate(this);
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  abstract get price(): number;
}

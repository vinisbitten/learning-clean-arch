import AbstractProduct from "./product.abstract";

export default class ProductA extends AbstractProduct {
  get price(): number {
    return this._price;
  }
}

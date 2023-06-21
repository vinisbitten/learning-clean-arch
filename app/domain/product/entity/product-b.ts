import AbstractProduct from "./product.abstract";

export default class ProductB extends AbstractProduct {
  get price(): number {
    return this._price * 2;
  }
}

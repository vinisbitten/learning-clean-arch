import { v4 as uuid } from "uuid";
import ProductA from "../entity/product-a";
import ProductB from "../entity/product-b";
import AbstractProduct from "../entity/product.abstract";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): AbstractProduct {
    switch (type) {
      case "a":
        return new ProductA(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}

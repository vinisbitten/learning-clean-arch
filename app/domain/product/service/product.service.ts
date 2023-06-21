import AbstractProduct from "../entity/product.abstract";

export default class ProductService {
  static increasePrice(
    products: AbstractProduct[],
    percentage: number
  ): AbstractProduct[] {
    products.forEach((product) => {
      switch (product.constructor.name) {
        case "ProductA":
          product.changePrice((product.price * (percentage + 100)) / 100);
          break;
        case "ProductB":
          product.changePrice(((product.price / 2) * (percentage + 100)) / 100);
          break;
        default:
          throw new Error("This type of product is not supported");
      }
    });
    return products;
  }
}

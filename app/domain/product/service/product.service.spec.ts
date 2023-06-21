import ProductA from "../entity/product-a";
import ProductB from "../entity/product-b";
import ProductService from "./product.service";

describe("Product unit test", () => {
  it("should change the prices of all products", () => {
    let product1 = new ProductA("123", "Product 1", 100);
    let product2 = new ProductA("456", "Product 2", 200);
    let product3 = new ProductA("789", "Product 3", 300);

    let product4 = new ProductB("123", "Product 1", 100);
    let product5 = new ProductB("456", "Product 2", 200);
    let product6 = new ProductB("789", "Product 3", 300);

    let products = [product1, product2, product3, product4, product5, product6];

    ProductService.increasePrice(products, 10);

    expect(products[0].price).toBe(110);
    expect(products[1].price).toBe(220);
    expect(products[2].price).toBe(330);

    expect(products[3].price).toBe(220);
    expect(products[4].price).toBe(440);
    expect(products[5].price).toBe(660);
  });
});

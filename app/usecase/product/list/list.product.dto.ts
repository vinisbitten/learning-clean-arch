export interface InputListProductDTO {}

type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDTO {
  products: Product[];
}

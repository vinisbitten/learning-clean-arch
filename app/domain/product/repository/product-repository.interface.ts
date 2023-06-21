import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../entity/product-a";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}

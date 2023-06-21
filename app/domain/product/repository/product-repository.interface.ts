import RepositoryInterface from "../../@shared/repository/repository-interface";
import AbstractProduct from "../entity/product.abstract";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<AbstractProduct> {}

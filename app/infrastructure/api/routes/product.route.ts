import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const createProductDTO = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(createProductDTO);
    res.status(201);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const listProductDTO = {};

    const output = await usecase.execute(listProductDTO);
    res.status(200);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());
  try {
    const findProductDTO = {
      id: req.params.id,
    };

    const output = await usecase.execute(findProductDTO);
    res.status(200);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());
  try {
    const updateProductDTO = {
      id: req.params.id,
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(updateProductDTO);
    res.status(200);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

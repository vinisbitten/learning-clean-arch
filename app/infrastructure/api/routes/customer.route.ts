import express, { Request, Response } from "express";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUsecase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "../../../usecase/customer/find/find.customer.usecase";
import UpdateCustomerUsecase from "../../../usecase/customer/update/update.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const createCustomerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
      },
    };

    const output = await usecase.execute(createCustomerDTO);
    res.status(201);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUsecase(new CustomerRepository());
  try {
    const listCustomerDTO = {};

    const output = await usecase.execute(listCustomerDTO);
    res.status(200);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindCustomerUsecase(new CustomerRepository());
  try {
    const findCustomerDTO = {
      id: req.params.id,
    };

    const output = await usecase.execute(findCustomerDTO);
    res.status(200);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.put("/:id", async (req: Request, res: Response) => {
    const usecase = new UpdateCustomerUsecase(new CustomerRepository());
    try {
        const updateCustomerDTO = {
            id: req.params.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                state: req.body.address.state,
                zip: req.body.address.zip,
            },
        };

        const output = await usecase.execute(updateCustomerDTO);
        res.status(200);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

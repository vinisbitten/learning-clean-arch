import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

async function setDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setDB();

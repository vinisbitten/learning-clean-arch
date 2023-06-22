import request from "supertest";
import { app, sequelize } from "../express";

describe("End to end test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
  });

  it("should find a product", async () => {
    const respProduct = await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });
    expect(respProduct.status).toBe(201);

    const response = await request(app).get(`/product/${respProduct.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: respProduct.body.id,
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const respProduct = await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });
    expect(respProduct.status).toBe(201);

    const response = await request(app)
      .put(`/product/${respProduct.body.id}`)
      .send({
        name: "Product 2",
        price: 200,
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: respProduct.body.id,
      name: "Product 2",
      price: 200,
    });
  });

  it("should list all products", async () => {
    const respProduct1 = await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });

    const respProduct2 = await request(app).post("/product").send({
      type: "b",
      name: "Product 2",
      price: 200,
    });

    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products).toContainEqual({
      id: respProduct1.body.id,
      name: "Product 1",
      price: 100,
    });
    expect(response.body.products).toContainEqual({
      id: respProduct2.body.id,
      name: "Product 2",
      price: 400,
    });
  });
});

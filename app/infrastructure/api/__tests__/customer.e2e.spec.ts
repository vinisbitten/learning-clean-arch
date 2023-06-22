import request from "supertest";
import { app, sequelize } from "../express";

describe("End to end test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          state: "NY",
          zip: "12345",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: "John",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        state: "NY",
        zip: "12345",
      },
    });
  });

  it("should not create a customer with invalid data", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });

  it("should find a customer", async () => {
    const respCustomer = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          state: "NY",
          zip: "12345",
        },
      });
    expect(respCustomer.status).toBe(201);

    const response = await request(app)
      .get(`/customer/${respCustomer.body.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: respCustomer.body.id,
      name: "John",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        state: "NY",
        zip: "12345",
      },
    });
  });

  it("should update a customer", async () => {
    const respCustomer = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          state: "NY",
          zip: "12345",
        },
      });
    expect(respCustomer.status).toBe(201);

    const response = await request(app)
      .put(`/customer/${respCustomer.body.id}`)
      .send({
        name: "Mary",
        address: {
          street: "Another Street",
          number: 456,
          city: "Atlanta",
          state: "GA",
          zip: "67890",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: respCustomer.body.id,
      name: "Mary",
      address: {
        street: "Another Street",
        number: 456,
        city: "Atlanta",
        state: "GA",
        zip: "67890",
      },
    });
  });

  it("should list all customers", async () => {
    const respCustomer1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          state: "NY",
          zip: "12345",
        },
      });
    expect(respCustomer1.status).toBe(201);

    const respCustomer2 = await request(app)
      .post("/customer")
      .send({
        name: "Mary",
        address: {
          street: "Another Street",
          number: 456,
          city: "Atlanta",
          state: "GA",
          zip: "67890",
        },
      });
    expect(respCustomer2.status).toBe(201);

    const response = await request(app).get("/customer").send();

    expect(response.status).toBe(200);
    expect(response.body.customers).toHaveLength(2);
    expect(response.body.customers).toContainEqual({
      id: respCustomer1.body.id,
      name: "John",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        state: "NY",
        zip: "12345",
      },
    });
    expect(response.body.customers).toContainEqual({
      id: respCustomer2.body.id,
      name: "Mary",
      address: {
        street: "Another Street",
        number: 456,
        city: "Atlanta",
        state: "GA",
        zip: "67890",
      },
    });
  });
});

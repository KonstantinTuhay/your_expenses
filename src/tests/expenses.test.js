import supertest from "supertest";
import { app } from "../app.mjs";

const request = supertest(app);

describe("GET /api/expenses/getYears", () => {
  it("должен вернуть 401, если не авторизован", async () => {
    const res = await request.get("/api/expenses/getYears");
    expect(res.status).toBe(401);
  });

  it("должен вернуть 200 и массив строк (лет)", async () => {
    const res = await request
      .get("/api/expenses/getYears")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.forEach((item) => expect(typeof item).toBe("string")));
  });
});

describe("GET /api/expenses/getExpenses", () => {
  it("должен вернуть 400, если не переданы параметры", async () => {
    const res = await request
      .get("/api/expenses/getExpenses")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      );

    expect(res.status).toBe(400);
  });

  it("должен вернуть 401, если не авторизован", async () => {
    const res = await request.get("/api/expenses/getExpenses");
    expect(res.status).toBe(401);
  });

  it("должен вернуть 200, если переданы параметры", async () => {
    const allData = {
      year: 2025,
      month: "Сентябрь",
    };
    const res = await request
      .get("/api/expenses/getExpenses")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      )
      .query(allData);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /api/expenses/addExpense", () => {
  it("должен вернуть 400, если не переданы параметры", async () => {
    const res = await request
      .post("/api/expenses/addExpense")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      );

    expect(res.status).toBe(400);
  });

  it("должен вернуть 401, если не авторизован", async () => {
    const res = await request.post("/api/expenses/addExpense");
    expect(res.status).toBe(401);
  });

  it("должен вернуть 200, если переданы параметры", async () => {
    const allData = {
      dateExpnese: "25.09.2025",
      expenseCategory: "Еда",
      description: "Йогурт",
      price: "1200",
    };
    const res = await request
      .post("/api/expenses/addExpense")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      )
      .send(allData);

    expect(res.status).toBe(200);
  });
});

describe("DELETE /api/expenses/deleteExpense", () => {
  it("должен вернуть 400, если не переданы параметры", async () => {
    const res = await request
      .delete("/api/expenses/deleteExpense")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      );

    expect(res.status).toBe(400);
  });

  it("должен вернуть 401, если не авторизован", async () => {
    const res = await request.delete("/api/expenses/deleteExpense");
    expect(res.status).toBe(401);
  });

  it("должен вернуть 200, если переданы параметры", async () => {
    const allData = {
      id: "123",
      year: "2025",
      month: "Сентябрь",
      date: "25.09",
    };
    const res = await request
      .delete("/api/expenses/deleteExpense")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVT0FSdm5scmxhUUFkSzl3MDZCZkQiLCJpYXQiOjE3NTk1MTUxMDUsImV4cCI6MTc2MDExOTkwNX0.opjgTVmzWSRuYXldw6tGKcxvFnaI1A_IxJ3sVTBw8Es`
      )
      .query(allData);

    expect(res.status).toBe(200);
  });
});

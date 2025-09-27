import request from "supertest";
import app from "../src/server.mjs";

describe("GET /api/expenses/getExpenses", () => {
  it("должен вернуть 400, если не переданы параметры", async () => {
    const res = await request(app).get("/api/expenses/getExpenses");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("должен вернуть 200 и массив расходов, если переданы параметры", async () => {
    const res = await request(app)
      .get("/api/expenses/getExpenses")
      .query({ year: 2025, month: 9 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

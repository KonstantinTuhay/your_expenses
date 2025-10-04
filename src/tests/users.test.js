import { request } from "./setupTest.js";

describe("POST /api/login", () => {
  //   it("должен вернуть 401, если не переданы верно данные", async () => {
  //     const allData = {
  //       email: "tuhai@mail.ru",
  //       password: "12345",
  //     };

  //     const res = await request.post("/api/login").send(allData); // без body
  //     expect(res.status).toBe(401); // или 401, если сервер так возвращает
  //   });

  it("должен вернуть 200 и токен", async () => {
    const allData = {
      email: "tuhai-k@mail.ru",
      password: "12345",
    };

    const res = await request.post("/api/login").send(allData);

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });
});
